import express from "express";
import { generateTextController } from "../controllers/geminiController.js";

const router = express.Router();

router.post("/generate-text", generateTextController);

export default router;