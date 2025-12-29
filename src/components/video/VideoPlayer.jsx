import { useAppContext } from "../../app/context";

export default function VideoPlayer() {
  const { video } = useAppContext();

  return (
    <video
      ref={video.videoRef}
      autoPlay
      muted
      playsInline
      preload="auto"
      className="w-full h-full object-cover"
    />
  );
}
