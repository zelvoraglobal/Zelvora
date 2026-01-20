/**
 * gemini.js - Zelvora Global Education & Coaching
 * Version: 2026.01.14 (Firebase AI Logic SDK v12.8.0)
 * Target: Spoken English, Training, and Professional Education
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getAI, getGenerativeModel } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-ai.js";

// 1. Firebase Configuration (Safe for GitHub)
const firebaseConfig = {
  apiKey: "AIza...", // Paste your actual API Key here
  authDomain: "zelvora-global.firebaseapp.com",
  projectId: "zelvora-global",
  appId: "1:..." // Paste your actual App ID here
};

// 2. Initialize the Firebase-to-Gemini Bridge
const app = initializeApp(firebaseConfig);

// 3. Force the FREE "Gemini Developer API" Backend
// This ensures you stay on the Spark (Free) plan with 1,000 requests/day
const ai = getAI(app, { backend: "google-ai" });

// 4. Configure the Education & Coaching Model
const model = getGenerativeModel(ai, {
  model: "gemini-3-flash-preview", // 2026 stable high-speed model
  systemInstruction: `
    You are Zelvora, a professional and patient Spoken English & Education Coach. 
    Your goal is to help users improve their fluency, grammar, and professional confidence.
    
    RULES:
    - BE ENCOURAGING: Use positive reinforcement for every response.
    - BE EDUCATIONAL: If the user makes a grammar or spelling mistake, provide a "Gentle Correction" at the end of your message.
    - BE INTERACTIVE: Always end your response with a follow-up question to keep the student talking.
    - TONE: Professional, warm, and expert. Avoid long paragraphs; keep responses concise.
  `
});

// 5. The Main AI Logic Function
export async function askZelvora(userPrompt) {
  try {
    // Generate content based on the user's input
    const result = await model.generateContent(userPrompt);
    const responseText = result.response.text();
    
    return responseText;
  } catch (error) {
    console.error("Zelvora Connection Error:", error);
    
    // Friendly error message for students
    return "I'm having a little trouble connecting to the classroom. Please check your internet and try again!";
  }
}

// 6. EXPOSE TO GLOBAL WINDOW (The "Magic Key")
// This allows your index.html and browser console to see the function.
window.askZelvora = askZelvora;
