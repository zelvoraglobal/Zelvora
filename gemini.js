import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getAI, getGenerativeModel } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-ai.js";

const firebaseConfig = {
  apiKey: "AIza...", // 🔹 Replace with your real Key
  authDomain: "zelvora-global.firebaseapp.com",
  projectId: "zelvora-global",
  appId: "1:..." // 🔹 Replace with your real ID
};

const app = initializeApp(firebaseConfig);
const ai = getAI(app, { backend: "google-ai" });
const model = getGenerativeModel(ai, {
  model: "gemini-3-flash-preview",
  systemInstruction: "You are Zelvora, a professional mentor. Keep answers helpful and brief."
});

export async function askZelvora(prompt) {
  const result = await model.generateContent(prompt);
  return result.response.text();
}

window.askZelvora = askZelvora; // Expose to global window
