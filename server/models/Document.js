import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  fileUrl: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Document = mongoose.model('Document', documentSchema);

export default Document;
