// 2026 Standard: Using the new Google GenAI SDK via esm.run
import { GoogleGenAI } from "https://esm.run/@google/genai";

// 1. Initialize with your Restricted API Key
const API_KEY = " "; 
const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function askZelvora(prompt) {
  try {
    // 2. Using Gemini 3 Flash (Released Dec 2025)
    // Optimized for speed, reasoning, and Indian English accents
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      systemInstruction: "You are the Zelvora Coach. You are a professional, encouraging expert in English fluency and Indian academic success. Keep responses under 3 sentences for natural voice playback.",
      contents: [{ role: "user", parts: [{ text: prompt }] }]
    });

    return response.text;
  } catch (error) {
    // 3. 2026 Error Handling
    if (error.message.includes("429")) {
      return "Zelvora is currently resting. Please wait 60 seconds.";
    }
    if (error.message.includes("403")) {
      return "Security Error: Please check your Google Cloud domain restrictions.";
    }
    console.error("Zelvora API Error:", error);
    return "I'm having trouble connecting. Please check your internet.";
  }
}
