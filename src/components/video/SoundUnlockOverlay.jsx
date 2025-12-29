import { useAppContext } from "../app/context";

export default function SoundUnlockOverlay() {
  const { video } = useAppContext();

  if (video.canPlayUnmuted) return null;

  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center
                 bg-black/60 backdrop-blur-sm cursor-pointer"
      onClick={video.enableSound}
    >
      <div className="px-6 py-3 bg-red-600 rounded-lg text-white font-semibold text-lg">
        🔊 Tap to enable sound
      </div>
    </div>
  );
}
