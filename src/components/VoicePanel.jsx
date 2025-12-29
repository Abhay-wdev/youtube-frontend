export default function VoicePanel() {
  return (
    <div className="bg-slate-950 p-4 rounded-xl space-y-4">
      <h3 className="text-lg font-bold">🎧 Voice Panel</h3>

      <div>
        <label className="text-sm">Speed</label>
        <input
          type="range"
          min="0.7"
          max="1.3"
          step="0.05"
          className="w-full"
        />
      </div>

      <div>
        <label className="text-sm">Pitch</label>
        <input
          type="range"
          min="0.8"
          max="1.5"
          step="0.05"
          className="w-full"
        />
      </div>

      <div>
        <label className="text-sm">Volume</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          className="w-full"
        />
      </div>

      <button className="w-full bg-sky-600 py-2 rounded-lg">
        🔊 Test Voice
      </button>
    </div>
  );
}
