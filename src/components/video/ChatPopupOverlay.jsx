import { useAppContext } from "../../app/context";
import { useEffect, useState } from "react";

export default function ChatPopupOverlay() {
  const { activeChat } = useAppContext();
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (!activeChat) return;

    setVisible(true);
    setClosing(false);

    const closeTimer = setTimeout(() => {
      setClosing(true);
    }, 9000);

    const hideTimer = setTimeout(() => {
      setVisible(false);
      setClosing(false);
    }, 10000000);

    return () => {
      clearTimeout(closeTimer);
      clearTimeout(hideTimer);
    };
  }, [activeChat]);

  if (!activeChat || !visible) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 pointer-events-none">
      <div
        className={`chat-popup min-w-70 ${
          closing ? "chat-popup-exit" : "chat-popup-enter"
        }`}
      >
        <p className="chat-user">{activeChat.user}</p>
        <p className="chat-text">{activeChat.text}</p>
      </div>
    </div>
  );
}
