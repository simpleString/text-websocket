import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteMessage, getMessages, postMessage } from "../api";
import { useCallback } from "react";

export const useGetMessages = () =>
  useQuery({
    queryKey: ["getMessages"],
    queryFn: async () => {
      const response = await getMessages();
      return response.data.messages;
    },
  });

export const useDeleteMessage = () =>
  useMutation({
    mutationKey: ["deleteMessage"],
    mutationFn: (id: string) => deleteMessage(id),
  });

export const usePostMessage = () =>
  useMutation({
    mutationKey: ["postMessage"],
    mutationFn: (text: string) => postMessage(text),
  });

export const useSyncMessages = () => {
  const queryClient = useQueryClient();

  const syncMessages = useCallback(
    (message: Message, type: "ADD" | "DELETE") => {
      if (type === "ADD") {
        queryClient.setQueryData(["getMessages"], (old: Message[]) => [
          message,
          ...old,
        ]);
      } else {
        queryClient.setQueryData(["getMessages"], (old: Message[]) =>
          old.filter((m) => m.id !== message.id)
        );
      }
    },
    [queryClient]
  );

  return syncMessages;
};
