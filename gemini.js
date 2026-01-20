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

/** * CRITICAL 2026 UPDATE: 
 * We specify 'google-ai' to use the Gemini Developer API (Free Tier).
 * If you leave this blank, it may default to Vertex AI which requires billing.
 */
const ai = getAI(app, { backend: "google-ai" });

// Use the 2026 Standard Model (High speed, 1,000 free daily requests)
const model = getGenerativeModel(ai, { 
  model: "gemini-3-flash-preview" 
});

export async function askZelvora(userPrompt) {
  try {
    const result = await model.generateContent(userPrompt);
    return result.response.text();
  } catch (error) {
    console.error("Zelvora Error:", error);
    // 2026 common error: Check if the model has been retired (March 2026)
    return "I'm having trouble connecting. Please try again in a moment.";
  }
}
