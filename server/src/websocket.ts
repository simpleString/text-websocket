import { WebSocketServer, WebSocket, Server } from "ws";

export default class WebSocketClass {
  #socket?: WebSocket;
  #ws?: Server;

  constructor() {
    this.#socket;
    this.#ws;
  }

  async init() {
    this.#ws = new WebSocketServer({ port: 8080 });

    this.#ws.on("connection", (ws) => {
      this.#socket = ws;
    });
  }

  sendAll(message: object, type: "ADD" | "DELETE") {
    this.#ws?.clients.forEach((client) => {
      client.send(JSON.stringify({ message, type }));
    });
  }
}
