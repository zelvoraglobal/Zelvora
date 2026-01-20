// gemini.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getAI, getGenerativeModel } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-ai.js";

// 1. Paste your PUBLIC Firebase Config here (from Firebase Console Settings)
const firebaseConfig = {
  apiKey: "AIza...", 
  authDomain: "zelvora-global.firebaseapp.com",
  projectId: "zelvora-global",
  appId: "1:..."
};

// 2. Initialize the Secure Tunnel
const app = initializeApp(firebaseConfig);
const ai = getAI(app);

// 3. Setup Gemini 3 Flash (The 2026 Speed King)
const model = getGenerativeModel(ai, { 
  model: "gemini-3-flash-preview" 
});

export async function askZelvora(prompt) {
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Zelvora Connection Error:", error);
    return "I'm having trouble connecting to my brain. Please check your internet or Firebase setup.";
  }
}
