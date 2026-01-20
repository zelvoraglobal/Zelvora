// voice.js - The "Mouth" of Zelvora
export function zelvoraSpeak(text) {
  // 1. Check if the browser/phone supports speech
  if ('speechSynthesis' in window) {
    const synth = window.speechSynthesis;
    
    // 2. Create the "Speech" request
    const utterance = new SpeechSynthesisUtterance(text);
    
    // 3. Set the Tone (Perfect for Indian English Coaching)
    utterance.lang = 'en-IN'; // Uses an Indian English accent for clarity
    utterance.pitch = 1.1;     // Slightly higher pitch sounds more friendly/coach-like
    utterance.rate = 0.9;      // Slightly slower so students can understand clearly
    
    // 4. Speak!
    synth.speak(utterance);
  } else {
    console.error("Speech not supported on this device.");
  }
}
