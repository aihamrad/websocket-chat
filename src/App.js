import React, { useState, useCallback, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import Messages from "./components/Messages";

const App = () => {

  const [socketUrl, setSocketUrl] = useState("ws://localhost:8080");
  const [message, setMessage] = useState("");
  const [messageHistory, setMessageHistory] = useState([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage));
    }
  }, [lastMessage, setMessageHistory]);

  const connectToServer = useCallback(() => {
    setSocketUrl("ws://localhost:13000");
  }, []);

  const handleClickSendMessage = (e) => {
    e.preventDefault();
    sendMessage(message);
    setMessage("");
  };

  const onChangeText = (e) => {
    setMessage(e.target.value);
  };

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  return (
    <div className="d-flex justify-content-center">
      {connectionStatus === "Closed" && (
        <button onClick={connectToServer} className="btn btn-primary m-m">
          Login
        </button>
      )}

      {connectionStatus === "Connecting" && (
        <div className="btn btn-primary m-m">Connecting...</div>
      )}

      {connectionStatus === "Open" && (
        <div className="container">
          <div className="message-container p-m">
            {messageHistory.map((message, index) => (
              <Messages text={message.data} index={index} />
            ))}
          </div>
          <form onSubmit={handleClickSendMessage} className="box-input">
            <div className=" d-flex align-items-center">
              <input
                onChange={onChangeText}
                id="message"
                name="message"
                value={message}
                className="input-text mr-m"
                type="text"
              ></input>
              <button
                disabled={!message}
                type="submit"
                className="btn btn-primary"
              >
                send
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default App;
