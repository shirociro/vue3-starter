
import { io, Socket } from "socket.io-client";

const backendHost =
  window.location.hostname === "localhost"
    ? "localhost"
    : window.location.hostname;

let socketInstance: Socket | null = null;

export function useSocket(): Socket {
  if (!socketInstance) {
    socketInstance = io(`http://${backendHost}:3000`, {
      transports: ["websocket"],
      autoConnect: true,
    });

    socketInstance.on("connect", () => {
      console.log("🟢 Socket connected:", socketInstance!.id);
    });

    socketInstance.on("disconnect", (reason) => {
      console.warn("🔴 Socket disconnected:", reason);
    });
  }

  return socketInstance;
}
