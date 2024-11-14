import { useEffect, useState } from "react";
import socket from "../services/socket";

const RoomComponent: React.FC = () => {
  const [connected, setConnected] = useState(false);
  const [roomId, setRoomId] = useState("example-room");
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    // Manually connect to the socket
    socket.connect();

    socket.on("connect", () => {
      console.log("Connected to /room namespace");
      setConnected(true);
      socket.emit("join-room", roomId);
    });

    socket.on("user-joined", (userId: string) => {
      setMessages((prevMessages) => [...prevMessages, `User ${userId} joined`]);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from /room namespace");
      setConnected(false);
    });

    // Clean up on component unmount
    return () => {
      socket.emit("leave-room", roomId);
      socket.disconnect();
    };
  }, [roomId]);

  return (
    <div>
      <h2>Room: {roomId}</h2>
      <div>Status: {connected ? "Connected" : "Disconnected"}</div>
      <div>
        <label>
          Room ID:
          <input
            type="text"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
        </label>
        <button onClick={() => socket.emit("join-room", roomId)}>
          Join Room
        </button>
      </div>
      <div>
        <h3>Messages</h3>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RoomComponent;
