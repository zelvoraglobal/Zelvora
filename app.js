// 1. The "Speaker" (Text-to-Speech)
function speakNow(textToSay) {
  // Cancel any previous speech so they don't overlap
  window.speechSynthesis.cancel(); 
  
  const utterance = new SpeechSynthesisUtterance(textToSay);
  utterance.lang = 'en-IN'; // Professional Indian-English accent
  utterance.rate = 0.9;      // Slightly slower for better learning
  utterance.pitch = 1.0;
  
  window.speechSynthesis.speak(utterance);
}

// 2. The AI & Speaker Bridge
export async function askAndSpeak(userInput) {
  const outputDiv = document.getElementById("chat-output");
  
  try {
    // Show "thinking" status
    outputDiv.innerText = "Zelvora is thinking...";

    // 1. Get response from Gemini (using your existing function)
    const response = await askZelvora(userInput); 
    
    // 2. Update the screen
    outputDiv.innerHTML = `<b>Zelvora:</b> ${response}`;
    
    // 3. Start speaking
    speakNow(response);
    
  } catch (error) {
    console.error("Speech/AI Error:", error);
    outputDiv.innerText = "Sorry, I couldn't speak right now.";
  }
}

// 3. THE CRITICAL "BRIDGE" 
// This allows your HTML button <button onclick="askAndSpeak(...)"> to find the code
window.askAndSpeak = askAndSpeak;
