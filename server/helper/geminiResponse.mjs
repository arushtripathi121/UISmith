import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';
dotenv.config();
const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);

async function geminiResponse(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
}

export default geminiResponse;