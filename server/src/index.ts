import express from "express";
import cors from "cors";

import { addMessage, deleteMessage, getMessages } from "./db";
import WebSocketClass from "./websocket";

const ws = new WebSocketClass();

ws.init();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/messages", (_, res) => {
  const messages = getMessages();
  return res.json({ messages });
});

app.delete("/message/:id", (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "id is required" });
  }

  const deletedMessage = deleteMessage(id);
  res.json({ message: deletedMessage });

  ws.sendAll(deletedMessage!, "DELETE");
});

app.post("/message", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "text is required" });
  }

  const message = addMessage(text);
  res.json({ message });

  ws.sendAll(message, "ADD");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
