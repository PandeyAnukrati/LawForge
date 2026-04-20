import Document from '../models/Document.js';
import cloudinary from '../config/cloudinary.js';
import axios from 'axios';
import textract from 'textract';
import pdf from 'pdf-parse/lib/pdf-parse.js';
import mammoth from 'mammoth';
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

    if (fileExtension === '.pdf') {
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdf(dataBuffer);
      extractedText = data.text;
    } else if (fileExtension === '.docx' || fileExtension === '.doc') {
      const result = await mammoth.extractRawText({ path: filePath });
      extractedText = result.value;
    } else {
      // Fallback to textract for other formats
      extractedText = await new Promise((resolve, reject) => {
        textract.fromFileWithPath(filePath, (err, text) => {
          if (err) reject(err);
          else resolve(text);
        });
      });
    }

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath); // delete temp file
    }

    return res.status(200).json({ message: 'Text extracted successfully', text: extractedText });
  } catch (error) {
    console.error('Text extraction error:', error);
    return res.status(500).json({ error: 'Failed to extract text from the document' });
  }
};



