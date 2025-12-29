import VideoPlayer from "./VideoPlayer";
import ChatPopupOverlay from "./ChatPopupOverlay";
import VoiceControlsBar from "../voice/VoiceControlsBar";
import SoundToggleButton from "./SoundToggleButton";

export default function VideoDisplay() {
  return (
    <div className="flex flex-col h-screen bg-black relative">
      {/* Video */}
      <div className="relative flex-1">
        <VideoPlayer />
        <ChatPopupOverlay />
      </div>

      {/* Voice controls below video */}
      <VoiceControlsBar />
      <SoundToggleButton/>
    </div>
  );
}
