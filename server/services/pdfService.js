import fs from 'fs';
import pdf from 'pdf-parse/lib/pdf-parse.js';
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Sleep helper for retry backoff
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Retry wrapper - retries an async function with exponential backoff
 * @param {Function} fn - async function to retry
 * @param {number} maxRetries - max number of retries
 * @param {string} label - descriptive label for logging
 * @returns {Promise<any>}
 */
async function withRetry(fn, maxRetries = 3, label = 'operation') {
    let lastError;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error;
            const isRetryable = error.message?.includes('500') ||
                error.message?.includes('503') ||
                error.message?.includes('429') ||
                error.message?.includes('DEADLINE_EXCEEDED') ||
                error.message?.includes('UNAVAILABLE') ||
                error.message?.includes('fetch') ||
                error.message?.includes('network') ||
                error.message?.includes('ECONNRESET');

            if (attempt < maxRetries && isRetryable) {
                const delay = Math.min(1000 * Math.pow(2, attempt - 1), 8000);
                console.warn(`[${label}] Attempt ${attempt}/${maxRetries} failed: ${error.message}. Retrying in ${delay}ms...`);
                await sleep(delay);
            } else if (!isRetryable) {
                // Non-retryable error, bail immediately
                throw error;
            }
        }
    }
    throw lastError;
}

/**
 * Attempt local text extraction using pdf-parse
 * @param {Buffer} dataBuffer
 * @returns {Promise<string|null>} extracted text or null if insufficient
 */
async function tryLocalExtraction(dataBuffer) {
    try {
        console.log('[PDF] Attempting local pdf-parse extraction...');
        const data = await pdf(dataBuffer);

        if (data && data.text && data.text.trim().length > 50) {
            console.log(`[PDF] Local extraction successful (${data.text.trim().length} chars).`);
            return data.text.trim();
        }

        console.warn(`[PDF] Local extraction returned insufficient text (${data?.text?.trim()?.length || 0} chars).`);
        return null;
    } catch (error) {
        console.error('[PDF] Local pdf-parse failed:', error.message);
        return null;
    }
}

/**
 * Extract text from PDF using Gemini AI vision/multimodal capabilities
 * @param {Buffer} dataBuffer
 * @returns {Promise<string>}
 */
async function extractWithGemini(dataBuffer) {
    console.log('[PDF] Attempting Gemini AI extraction...');

    // Check buffer size - Gemini has limits on inline data (~20MB)
    const sizeMB = dataBuffer.length / (1024 * 1024);
    if (sizeMB > 15) {
        throw new Error(`PDF is too large for AI extraction (${sizeMB.toFixed(1)}MB). Maximum is ~15MB.`);
    }

    return withRetry(async () => {
        const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

        const result = await model.generateContent([
            "Extract ALL text content from this PDF document. Return ONLY the raw extracted text, preserving the original structure and formatting as much as possible. Do not add any commentary, headers, or explanations - just the document text.",
            {
                inlineData: {
                    data: dataBuffer.toString("base64"),
                    mimeType: "application/pdf"
                }
            }
        ]);

        const response = await result.response;
        const aiText = response.text();

        if (!aiText || aiText.trim().length < 10) {
            throw new Error('Gemini returned empty or insufficient text');
        }

        console.log(`[PDF] Gemini AI extraction successful (${aiText.trim().length} chars).`);
        return aiText.trim();
    }, 3, 'Gemini-PDF-Extract');
}

/**
 * Robustly extract text from a PDF buffer.
 * Strategy:
 *   1. Try local pdf-parse first (fast, free, no API calls)
 *   2. If local fails or returns insufficient text, fallback to Gemini AI with retries
 *   3. If both fail, throw a descriptive error
 * 
 * @param {Buffer} dataBuffer 
 * @returns {Promise<string>}
 */
export async function extractTextFromPDF(dataBuffer) {
    if (!dataBuffer || dataBuffer.length === 0) {
        throw new Error('Empty PDF buffer received. Please upload a valid PDF file.');
    }

    console.log(`[PDF] Starting extraction (buffer size: ${(dataBuffer.length / 1024).toFixed(1)}KB)...`);

    // Strategy 1: Local extraction (fast path)
    const localText = await tryLocalExtraction(dataBuffer);
    if (localText) {
        return localText;
    }

    // Strategy 2: Gemini AI extraction (with retries)
    try {
        const aiText = await extractWithGemini(dataBuffer);
        return aiText;
    } catch (aiError) {
        console.error('[PDF] Gemini AI extraction failed after retries:', aiError.message);
    }

    throw new Error(
        'Failed to extract text from this PDF. The document may be a scanned image, '
        + 'password-protected, or in an unsupported format. Please try uploading a different file '
        + 'or a text-based PDF.'
    );
}
