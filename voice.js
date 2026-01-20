// voice.js - The "Mouth" of Zelvora
export function zelvoraSpeak(text) {
  if (!('speechSynthesis' in window)) {
    console.error("Speech not supported on this device.");
    return;
  }

  const synth = window.speechSynthesis;
  
  // 1. IMPORTANT: Cancel any ongoing speech 
  // This fixes the "silent mobile" bug where a previous stuck task blocks new ones.
  synth.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  
  // 2. TONE & ACCENT
  utterance.lang = 'en-IN'; 
  utterance.pitch = 1.1;     
  utterance.rate = 0.9;      

  // 3. VOICE LOADING (Chrome/Android Fix)
  // Some browsers need to wait for voices to load from the system.
  const voices = synth.getVoices();
  const indianVoice = voices.find(v => v.lang.includes('en-IN') || v.name.includes('India'));
  if (indianVoice) {
    utterance.voice = indianVoice;
  }

  // 4. USER GESTURE REQUIREMENT
  // Browsers in 2026 will block synth.speak() if it's not called 
  // within 1 second of a user click.
  synth.speak(utterance);
}
