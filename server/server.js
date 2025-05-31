import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan'; 
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import geminiRoute from "./routes/geminiRoute.js";
import documentRoutes from './routes/documentRoutes.js';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;


app.use(cors({
  origin: 'http://localhost:7001',
  credentials: true
}));

app.use(express.json());


app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')));


app.use('/api/auth', authRoutes);
app.use("/api/gemini", geminiRoute);
app.use('/api/documents', documentRoutes);


(async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
})();


const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
});
const Item = mongoose.model('Item', itemSchema);

app.get('/', (req, res) => {
  res.send('Hello from ES6 Express + MongoDB server!');
});

app.post('/items', async (req, res) => {
  try {
    const newItem = new Item({ name: req.body.name });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
