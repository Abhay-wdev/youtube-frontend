import { useEffect, useState } from "react";
import { AppContext } from "./context";
import { socket } from "../socket/socket";
import { useVoices } from "../hooks/useVoices";
import { useSpeech } from "../hooks/useSpeech";
import { useVideoPlayer } from "../hooks/useVideoPlayer";
import { cleanUserName } from "../utils/cleanUserName";

export default function AppProvider({ children }) {
  const [activeChat, setActiveChat] = useState(null);

  // 🎤 Load voices
  const voices = useVoices();

  // 🎥 Video controller (ref + play logic)
  const video = useVideoPlayer();

  // 🗣️ Speech controller (IMPORTANT: pass full video object)
  const speech = useSpeech({
    voices: voices.voices,
    video,
  });

  /* ================= SOCKET CHAT ================= */
  useEffect(() => {
    if (!socket) return;

    const onChat = (data) => {
      if (!data?.text) return;

      const chat = {
        user: cleanUserName(data.user || "Guest"),
        text: data.text,
      };

      setActiveChat(chat);

      // ▶ Start / restart event video (muted)
      video.playEvent();

      // 🗣️ Speak comment (video unmutes after speech)
      speech.speak(chat.user, chat.text);
    };

    socket.on("chat", onChat);

    return () => {
      socket.off("chat", onChat);
    };
  }, [video, speech]);

  /* ================= CONTEXT ================= */
  return (
    <AppContext.Provider
      value={{
        activeChat,
        video,
        speech,
        voices,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
