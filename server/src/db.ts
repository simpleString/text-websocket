import { randomUUID } from "crypto";

type Message = {
  id: string;
  text: string;
};

export let messages: Message[] = [];

export const addMessage = (text: string) => {
  const message: Message = {
    id: randomUUID(),
    text,
  };
  messages.push(message);

  return message;
};

export const getMessages = () => {
  return messages;
};

export const deleteMessage = (id: string) => {
  const deletedMessage = messages.find((message) => message.id === id);
  messages = messages.filter((message) => message.id !== id);

  return deletedMessage;
};
