import { useEffect } from "react";
import { useSyncMessages } from "./useMessages";

export const useWebsocket = () => {
  const syncMessages = useSyncMessages();

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onmessage = (event) => {
      const { message, type } = JSON.parse(event.data);
      syncMessages(message, type);
    };

    return () => ws.close();
  }, [syncMessages]);
};
