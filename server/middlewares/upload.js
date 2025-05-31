import multer from 'multer';
import path from 'path';

// Save file temporarily before uploading to Cloudinary
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // make sure this folder exists or create dynamically
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Filter file types if needed (optional)
const fileFilter = (req, file, cb) => {
  // accept all for now, or check mimetype
  cb(null, true);
};

const upload = multer({ storage, fileFilter });

export default upload;
