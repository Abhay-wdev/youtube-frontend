import { useCallback, useRef, useState } from "react";

export function useSpeech({ voices, video }) {
  const speakingRef = useRef(false);
  const lastSpokenRef = useRef("");

  const [voiceOn, setVoiceOn] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const getHindiVoice = () =>
    voices.find(v => v.lang === "hi-IN") ||
    voices.find(v => v.lang.startsWith("hi")) ||
    voices[0];

  const speak = useCallback(
    (user, text) => {
      if (!voiceOn || speakingRef.current) return;
      if (!user || !text) return;

      const key = `${user}-${text}`;
      if (lastSpokenRef.current === key) return;
      lastSpokenRef.current = key;

      // 🔇 Mute video
      if (video?.videoRef?.current) {
        video.videoRef.current.muted = true;
      }

      window.speechSynthesis.cancel();
      window.speechSynthesis.resume();

      speakingRef.current = true;
      setIsSpeaking(true);

      const voice = getHindiVoice();

      // 🗣️ Natural Hindi sentence
      const sentence = `${user} ने कमेन्ट किया है… ${text}`;

      const utter = new SpeechSynthesisUtterance(sentence);
      utter.voice = voice;
      utter.lang = "hi-IN";
      utter.rate = 0.9;   // natural speed
      utter.pitch = 1.1;  // human-like tone

      utter.onend = () => {
        speakingRef.current = false;
        setIsSpeaking(false);

        // 🔊 Unmute video
        if (video?.videoRef?.current) {
          video.videoRef.current.muted = false;
        }
      };

      window.speechSynthesis.speak(utter);
    },
    [voiceOn, voices, video]
  );

  return {
    speak,
    voiceOn,
    setVoiceOn,
    isSpeaking,
  };
}
