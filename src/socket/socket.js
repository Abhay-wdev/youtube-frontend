import { io } from "socket.io-client";

const SOCKET_URL = "https://youtube-backend-liard-seven.vercel.app";

export const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  autoConnect: true,
});
