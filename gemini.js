// gemini.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getAI, getGenerativeModel } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-ai.js";

const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "zelvora-global.firebaseapp.com",
  projectId: "zelvora-global",
  appId: "1:..."
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Force FREE Gemini Developer API (no billing)
const ai = getAI(app, { backend: "google-ai" });

// Use free, fast model
const model = getGenerativeModel(ai, {
  model: "gemini-3-flash-preview"
});

// 🔥 THIS IS THE CRITICAL LINE 🔥
window.askZelvora = async function (userPrompt) {
  try {
    const result = await model.generateContent(userPrompt);
    return result.response.text();
  } catch (error) {
    console.error("Zelvora Error:", error);
    return "AI connection failed. Please try again.";
  }
};
