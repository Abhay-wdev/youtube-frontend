import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const socket = io("https://youtube-backend-liard-seven.vercel.app");

export default function Overlay() {
  const [visible, setVisible] = useState(false);
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");

  const videoRef = useRef(null);

  // -------------------------------
  // FREE AI VOICE (BROWSER)
  // -------------------------------
  const speak = (text) => {
    if (!window.speechSynthesis) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-IN";
    utterance.rate = 1;
    utterance.pitch = 1;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  // -------------------------------
  // SOCKET LISTENER
  // -------------------------------
  useEffect(() => {
    socket.on("chat-message", (data) => {
      setAuthor(data.author);
      setMessage(data.message);
      setVisible(true);

      // 🎬 Play video + 🔊 speak together
      speak(`New comment from ${data.author}. ${data.message}`);

      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
      }
    });

    return () => socket.off("chat-message");
  }, []);

  // -------------------------------
  // HIDE AFTER VIDEO END
  // -------------------------------
  const handleEnd = () => {
    setVisible(false);
  };

  return (
    <div className="w-screen h-screen bg-transparent flex items-end justify-center p-6">
      {visible && (
        <div className="flex items-center gap-4 bg-black/70 text-white px-6 py-4 rounded-xl shadow-2xl animate-bounce">
          <video
            ref={videoRef}
            src="/alert.mp4"
            className="w-20 h-20 rounded-lg"
            onEnded={handleEnd}
          />

          <div>
            <p className="font-bold text-lg">{author}</p>
            <p className="text-sm opacity-90">{message}</p>
          </div>
        </div>
      )}
    </div>
  );
}
