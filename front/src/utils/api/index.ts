import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
  validateStatus: () => true,
});

export const getMessages = () => api.get<{ messages: Message[] }>("/messages");

export const deleteMessage = (id: string) =>
  api.delete<{ message: Message | undefined }>(`/message/${id}`);

export const postMessage = (text: string) =>
  api.post<{ message: Message }>(`/message`, { text });
