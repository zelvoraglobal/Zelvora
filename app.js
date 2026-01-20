// Step A: Import the Speaker logic (if in a separate file) or keep it here
function speakNow(textToSay) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(textToSay);
  
  utterance.lang = 'en-IN'; // Use an English-Indian accent for your users
  utterance.rate = 0.9;      // Speak a little slower so students can learn
  
  synth.speak(utterance);
}

// Step B: The main function that connects Gemini to the Speaker
export async function askAndSpeak(userInput) {
  // 1. Ask Gemini (The Brain)
  const response = await askZelvora(userInput, "english"); 
  
  // 2. Show the text on the screen so the user can read it
  document.getElementById("output").innerText = response;
  
  // 3. IMMEDIATELY send that same text to the speaker
  speakNow(response);
}
