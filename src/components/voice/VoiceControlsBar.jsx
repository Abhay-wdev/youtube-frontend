import { useAppContext } from "../../app/context";

export default function VoiceControlsBar() {
  const { voices, speech } = useAppContext();

  return (
    <div className="bg-zinc-900 border-t border-zinc-800 px-6 py-4 text-white">
      <div className="flex flex-wrap gap-6 justify-center items-end">

        {/* Voice ON / OFF */}
        <button
          onClick={() => speech.setVoiceOn(!speech.voiceOn)}
          className={`px-6 py-2 rounded-full font-semibold ${
            speech.voiceOn ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {speech.voiceOn ? "Voice ON" : "Voice OFF"}
        </button>

        {/* Voice Selection */}
        <div>
          <label className="text-xs block text-center mb-1">Voice</label>
          <select
            value={voices.selectedVoice}
            onChange={(e) => voices.setSelectedVoice(e.target.value)}
            className="bg-zinc-800 border border-zinc-700 rounded px-3 py-1 text-sm"
          >
            {voices.voices.map((v) => (
              <option key={v.name} value={v.name}>
                {v.name} ({v.lang})
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
