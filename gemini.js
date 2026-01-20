import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * ZELVORA AI BRAIN (2026 EDITION)
 * 1. Replace the placeholder below with the API key you just restricted.
 * 2. This file is called by your index.html to process speech and text.
 */
const API_KEY = "PASTE_YOUR_RESTRICTED_KEY_HERE"; 
const genAI = new GoogleGenerativeAI(API_KEY);

export async function askZelvora(prompt) {
  try {
    // We use gemini-2.0-flash for near-instant "Voice-to-Voice" latency
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash",
      systemInstruction: "You are the Zelvora Coach. You are professional, encouraging, and an expert in English fluency and Indian academic success. Keep responses under 3 sentences to ensure they sound natural when spoken aloud."
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return text;
  } catch (error) {
    // Check if the error is a Rate Limit (429) - common on the free tier
    if (error.message.includes("429")) {
      return "I'm a bit busy right now! Please wait 60 seconds and ask me again.";
    }
    console.error("Zelvora API Error:", error);
    return "I'm having trouble connecting right now. Please check your internet or try again.";
  }
}
