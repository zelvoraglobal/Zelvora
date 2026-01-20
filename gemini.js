import { GoogleGenerativeAI } from "@google/generative-ai";

// 1. Setup the API with your Key (Uses the one you saved in GitHub Secrets)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 2. Pre-configure the 3 Models for Zelvora's different features
const models = {
  // 1,000 Daily Requests - Best for quick English corrections
  english: genAI.getGenerativeModel({ 
    model: "gemini-2.5-flash-lite",
    systemInstruction: "You are the Zelvora Fluency Coach. Focus on English grammar and MTI (Mother Tongue Influence) reduction for Indian speakers. Keep responses short and conversational."
  }),

  // 500 Daily Requests - Best for reading PDFs and Academic Coaching
  academic: genAI.getGenerativeModel({ 
    model: "gemini-2.5-flash",
    systemInstruction: "You are the Zelvora Academic Tutor. You excel at explaining complex subjects from textbooks and summarizing long chapters into study notes."
  }),

  // 100 Daily Requests - Best for competitive exam logic (UPSC, JEE, etc.)
  specialist: genAI.getGenerativeModel({ 
    model: "gemini-2.5-pro",
    systemInstruction: "You are the Zelvora Specialist. Use high-level reasoning to solve complex math, coding, or competitive exam questions step-by-step."
  })
};

// 3. The "Brain" Router - This function decides which model to use
export async function askZelvora(userInput, type = "english") {
  try {
    const selectedModel = models[type] || models.english;
    
    // Check for "Busy" signal (RPM limit protection)
    const result = await selectedModel.generateContent(userInput);
    const response = await result.response;
    
    return response.text();
    
  } catch (error) {
    if (error.message.includes("429")) {
      return "⚠️ Zelvora is a bit busy (Free Tier limit). Please wait 60 seconds and try again!";
    }
    return "❌ Connection error. Please check your internet.";
  }
}
