export const useSpeech = () => {
    const speak = (text, lang = "hi-IN") => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      window.speechSynthesis.speak(utterance);
    };
  
    const isSpeechSupported = () => {
      return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
    };
  
    const listen = (onResult, lang = "hi-IN") => {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        alert("🎙️ Voice input not supported.");
        return;
      }
  
      const recognition = new SpeechRecognition();
      recognition.lang = lang;
      recognition.interimResults = false;
      recognition.onresult = (e) => {
        const result = e.results[0][0].transcript;
        onResult(result);
      };
      recognition.onerror = (err) => {
        console.error("Mic error: ", err);
        alert("🎤 Please allow microphone access.");
      };
      recognition.start();
    };
  
    return { speak, listen, isSpeechSupported };
  };
  