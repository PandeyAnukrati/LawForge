import express from 'express';
import { uploadDocument, extractTextFromUpload } from '../controllers/documentController.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

// Single file upload, field name 'file'
router.post('/upload', upload.single('file'), uploadDocument);
router.post('/extract-text', upload.single('file'), extractTextFromUpload);

router.get('/test', (req, res) => {
  res.send('Documents route working!');
});

export default router;
