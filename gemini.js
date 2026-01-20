// 2026 Browser-compatible import
import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

const API_KEY = "AIzaSyDpueYhA7kc3ciwCet51GJv3_qBf4GtEAo"; 
const genAI = new GoogleGenerativeAI(API_KEY);

export async function askZelvora(prompt) {
  try {
    // UPDATED: Using Gemini 3 Flash for PhD-level English reasoning at lightning speed
    const model = genAI.getGenerativeModel({ 
      model: "gemini-3-flash",
      systemInstruction: "You are the Zelvora Coach. You are a professional, encouraging expert in English fluency and Indian academic success. Keep responses under 3 sentences for natural voice playback."
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    if (error.message.includes("429")) {
      return "Zelvora is currently resting. Please wait 60 seconds.";
    }
    console.error("Zelvora API Error:", error);
    return "I'm having trouble connecting. Please check your internet.";
  }
}
