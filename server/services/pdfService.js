import fs from 'fs';
import pdf from 'pdf-parse/lib/pdf-parse.js';
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Robustly extract text from a PDF buffer.
 * Tries local parsing first, then fallbacks to Gemini AI if needed.
 * @param {Buffer} dataBuffer 
 * @returns {Promise<string>}
 */
export async function extractTextFromPDF(dataBuffer) {
    try {
        console.log('Attempting local PDF extraction...');
        const data = await pdf(dataBuffer);
        
        if (data && data.text && data.text.trim().length > 10) {
            console.log('Local PDF extraction successful.');
            return data.text;
        }
        
        console.warn('Local extraction returned very little or no text. Falling back to Gemini AI...');
    } catch (error) {
        console.error('Local PDF extraction failed:', error.message);
        console.log('Falling back to Gemini AI for text extraction...');
    }

    // Fallback to Gemini AI for OCR/Text extraction
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" }); // Use the requested preview version
        
        const result = await model.generateContent([
            "Extract all text from this PDF document as accurately as possible. Return just the extracted text.",
            {
                inlineData: {
                    data: dataBuffer.toString("base64"),
                    mimeType: "application/pdf"
                }
            }
        ]);

        const response = await result.response;
        const aiText = response.text();
        
        if (aiText) {
            console.log('Gemini AI PDF extraction successful.');
            return aiText;
        }
    } catch (aiError) {
        console.error('Gemini AI extraction failed:', aiError.message);
    }

    throw new Error('Failed to extract text using both local parser and Gemini AI.');
}
