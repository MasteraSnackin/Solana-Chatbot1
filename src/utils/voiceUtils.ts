export const startVoiceRecognition = (onResult: (text: string) => void, onError: (error: string) => void) => {
  if (!('webkitSpeechRecognition' in window)) {
    onError('Speech recognition is not supported in this browser.');
    return null;
  }

  // @ts-ignore - webkitSpeechRecognition is not in the types
  const recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';

  recognition.onresult = (event: any) => {
    const text = event.results[0][0].transcript;
    onResult(text);
  };

  recognition.onerror = (event: any) => {
    onError(`Error occurred in recognition: ${event.error}`);
  };

  recognition.start();
  return recognition;
};

export const speak = (text: string) => {
  if (!('speechSynthesis' in window)) {
    console.error('Speech synthesis is not supported in this browser.');
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = 1;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
};