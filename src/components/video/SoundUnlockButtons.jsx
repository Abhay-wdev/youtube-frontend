import { useAppContext } from "../../app/context";
import { Volume2 } from "lucide-react";

export default function SoundUnlockButtons() {
  const { video } = useAppContext();

  // Sound already enabled → no button
  if (video.canPlayUnmuted) return null;

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center
                    bg-black/60 backdrop-blur-sm">
      <button
        onClick={video.enableSound}
        className="flex items-center gap-3 px-8 py-4
                   bg-red-600 hover:bg-red-700
                   text-white text-lg font-semibold
                   rounded-full shadow-xl
                   transition-all active:scale-95"
      >
        <Volume2 size={22} />
        Enable Sound
      </button>
    </div>
  );
}
