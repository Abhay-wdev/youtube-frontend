import { useEffect, useState } from "react";

export function useVoices() {
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState("");

  useEffect(() => {
    const loadVoices = () => {
      const list = window.speechSynthesis.getVoices();
      setVoices(list);

      if (!selectedVoice && list.length) {
        const preferred =
          list.find(v => v.lang === "hi-IN") ||
          list.find(v => v.lang === "en-IN") ||
          list[0];

        setSelectedVoice(preferred.name);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, [selectedVoice]);

  return {
    voices,
    selectedVoice,
    setSelectedVoice,
  };
}
