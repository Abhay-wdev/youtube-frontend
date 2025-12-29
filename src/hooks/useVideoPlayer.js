import { useEffect, useRef, useState } from "react";

export function useVideoPlayer() {
  const videoRef = useRef(null);
  const [mode, setMode] = useState("idle");

  const isEventPlayingRef = useRef(false);
  const [canPlayUnmuted, setCanPlayUnmuted] = useState(false);

  useEffect(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;

    // Always set src (stable & safe)
    video.src =
      mode === "event"
        ? "/videos/thankyou.mp4"
        : "/videos/idle.mp4";

    video.preload = "auto";
    video.loop = mode === "idle";

    // 🔐 Browser-safe mute logic
    video.muted = mode === "event" || !canPlayUnmuted;

    video.load();

    const playSafe = async () => {
      try {
        await video.play();
      } catch {
        console.log("Autoplay blocked until user interaction");
      }
    };

    video.oncanplay = playSafe;

    video.onended = () => {
      if (mode === "event") {
        isEventPlayingRef.current = false;
        setMode("idle");
      }
    };

    return () => {
      video.oncanplay = null;
      video.onended = null;
    };
  }, [mode, canPlayUnmuted]);

  /* ================= PUBLIC CONTROLS ================= */

  const enableSound = () => {
    setCanPlayUnmuted(true);
  };

  const playEvent = () => {
    if (!videoRef.current) return;

    // First interaction → unlock sound
    if (!canPlayUnmuted) {
      setCanPlayUnmuted(true);
    }

    if (isEventPlayingRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
      return;
    }

    isEventPlayingRef.current = true;
    setMode("event");
  };

  const playIdle = () => {
    isEventPlayingRef.current = false;
    setMode("idle");
  };

  return {
    videoRef,
    playEvent,
    playIdle,
    enableSound,
    canPlayUnmuted,
    isEventPlayingRef,
  };
}
