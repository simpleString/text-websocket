import { FormEvent, useState } from "react";
import {
  useDeleteMessage,
  useGetMessages,
  usePostMessage,
} from "./utils/hooks/useMessages";
import { useWebsocket } from "./utils/hooks/useWebsocket";

function App() {
  const { data: messages, isLoading, isError } = useGetMessages();
  const { mutate: deleteMessageMutation } = useDeleteMessage();
  const { mutate: createMessageMutation } = usePostMessage();

  useWebsocket();

  const [value, setValue] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    createMessageMutation(value);
    setValue("");
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error</p>;
  }

  const handleDeleteMessage = (id: string) => {
    deleteMessageMutation(id);
  };

  return (
    <section className="message">
      <form onSubmit={handleSubmit} className="message-form">
        <input value={value} onChange={(e) => setValue(e.target.value)} />
        <button type="submit">Submit</button>
      </form>

      <div className="message-list">
        {messages?.map((message) => (
          <div key={message.id} className="message-item">
            {message.text}
            <button
              onClick={() => handleDeleteMessage(message.id)}
              className="message-item__button"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default App;
