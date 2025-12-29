import { useEffect, useRef, useState } from "react";

export default function ChatList() {
  const [chats, setChats] = useState([]);
  const bottomRef = useRef(null);

  // 🔧 TEMP: fake live chat (frontend-only)
  useEffect(() => {
    const demoChats = [
      { user: "@Amit-123", text: "nice video" },
      { user: "@Janta-ki-sarkar", text: "hii abhay" },
      { user: "@Tech-guru-india", text: "great stream bro" }
    ];

    let i = 0;
    const interval = setInterval(() => {
      setChats(prev => [...prev, demoChats[i % demoChats.length]]);
      i++;
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  return (
    <div className="bg-slate-950 rounded-xl p-4 h-[80vh] overflow-y-auto">
      <h3 className="text-lg font-bold mb-4">💬 Live Chat</h3>

      <div className="space-y-3">
        {chats.map((c, i) => (
          <div key={i} className="bg-slate-800 p-3 rounded-lg">
            <div className="text-sky-400 font-semibold text-sm">
              {c.user}
            </div>
            <div className="text-sm text-slate-200">
              {c.text}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
