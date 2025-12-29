import { useEffect, useState } from "react";

export default function ShortsVideo() {
  const [mode, setMode] = useState("idle"); // idle | event

  // 🔧 TEMP: simulate new comment every 8s
  useEffect(() => {
    const interval = setInterval(() => {
      setMode("event");
      setTimeout(() => setMode("idle"), 3000);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="
        w-[360px] h-[640px]
        rounded-2xl overflow-hidden
        shadow-2xl border border-slate-700
        bg-black
      "
    >
      {mode === "idle" && (
        <video
          src="/videos/idle.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      )}

      {mode === "event" && (
        <video
          src="/videos/thankyou.mp4"
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
}
