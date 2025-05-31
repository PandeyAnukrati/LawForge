import { generateTextService } from "../services/geminiService.js";


export const generateTextController = async (req, res) => {
    console.log("generateTextController called");
    console.log("Request body received:", req.body);
  
    try {
      const prompt = req.body.prompt;
      console.log("Extracted prompt:", prompt);
  
      if (!prompt) {
        console.warn("No prompt found in request body");
        return res.status(400).json({ error: "Prompt is required in request body" });
      }
  
      console.log("Calling generateTextService...");
      const text = await generateTextService(prompt);
      console.log("Received response from generateTextService");
  
      res.status(200).json({ text });
    } catch (error) {
      console.error("Gemini Controller Error:", error);
      res.status(500).json({ error: "Failed to generate content from Gemini AI" });
    }
  };
  