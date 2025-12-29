import { useAppContext } from "../../app/context";
import { VolumeX, Volume2 } from "lucide-react";

export default function SoundToggleButton() {
  const { video } = useAppContext();

  const isMuted =
    video.videoRef?.current?.muted ?? true;

  const toggleSound = () => {
    if (!video.videoRef?.current) return;
    video.videoRef.current.muted = !isMuted;
  };

  return (
    <button
      onClick={toggleSound}
      className="flex items-center gap-2 px-4 py-2
                 bg-zinc-800 hover:bg-zinc-700
                 rounded-lg text-white text-sm"
    >
      {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      {isMuted ? "Muted" : "Sound On"}
    </button>
  );
}
