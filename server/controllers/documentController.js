import Document from '../models/Document.js';
import cloudinary from '../config/cloudinary.js';
import axios from 'axios';
import textract from 'textract';
import mammoth from 'mammoth';
import { extractTextFromPDF } from '../services/pdfService.js';
// import pdfjsLib from 'pdfjs-dist/legacy/build/pdf.js';

import fs from 'fs';
import path from 'path';




// Upload controller ...
export const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'documents',
      resource_type: 'auto',
    });

    const document = new Document({ fileUrl: result.secure_url });
    await document.save();

    return res.status(201).json({
      message: 'File uploaded successfully',
      document,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

export const extractTextFromUpload = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = path.resolve(file.path);
    const fileExtension = path.extname(file.originalname).toLowerCase();
    let extractedText = '';

    console.log(`Extracting text from ${file.originalname} (${file.mimetype}, ${file.size} bytes)`);

    try {
      if (fileExtension === '.pdf') {
        const dataBuffer = fs.readFileSync(filePath);
        extractedText = await extractTextFromPDF(dataBuffer);
      } else if (fileExtension === '.docx' || fileExtension === '.doc') {
        const result = await mammoth.extractRawText({ path: filePath });
        extractedText = result.value;
      } else if (fileExtension === '.txt') {
        extractedText = fs.readFileSync(filePath, 'utf8');
      } else {
        // Fallback to textract for other formats
        extractedText = await new Promise((resolve, reject) => {
          textract.fromFileWithPath(filePath, (err, text) => {
            if (err) reject(err);
            else resolve(text);
          });
        });
      }
    } catch (innerError) {
      console.error(`Error during ${fileExtension} extraction:`, innerError);
      throw new Error(`Extraction failed for ${fileExtension}: ${innerError.message}`);
    }


    return res.status(200).json({ message: 'Text extracted successfully', text: extractedText });
  } catch (error) {
    console.error('Text extraction error:', error);
    return res.status(500).json({ error: error.message || 'Failed to extract text from the document' });
  } finally {
    // Cleanup: always attempt to delete the temp file
    if (req.file && req.file.path && fs.existsSync(req.file.path)) {
      try {
        fs.unlinkSync(req.file.path);
        console.log(`Deleted temp file: ${req.file.path}`);
      } catch (cleanupError) {
        console.error('Error deleting temp file:', cleanupError);
      }
    }
  }
};



