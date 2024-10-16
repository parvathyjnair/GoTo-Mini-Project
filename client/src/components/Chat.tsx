import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { auth, db } from "../services/firebase-config";
import SendIcon from "@mui/icons-material/Send";
import SingleChat from "./SingleChat";
import "../App.css"
interface ChatProps {
  room: string;
  username:string
}

interface Message {
  id: string;
  text: string;
  user: string;
  createdAt: { seconds: number; nanoseconds: number } | null;
  room: string;
}

function Chat({ room,username }: ChatProps) {

  const messageRef = collection(db, "messages");
  const [msgs, setMgs] = useState<Message[]>([]);
  const user:any = JSON.parse(localStorage.getItem("profile") || '{}');
  function updateScroll() {
    const element = document.getElementById("chat-window");
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }

  useEffect(() => {
    updateScroll();
  }, [msgs]);

  useEffect(() => {
    const queryMessage = query(
      messageRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(queryMessage, (snapshot) => {
      const messages: Message[] = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id } as Message);
      });
      setMgs(messages);
    });
    return () => unsubscribe();
    // eslint-disable-next-line
  }, [room]);

  const [newMsg, setNewMsg] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMsg === "") return;

    await addDoc(messageRef, {
      text: newMsg,
      user: user.name || "user",
      createdAt: serverTimestamp(),
      room: room,
    });
    setNewMsg("");
  };

  return (
    <div className="chat">
      <h1 className="usernameHeading">{username}</h1>
      <div id="chat-window">
        {msgs.map((message) => (
          <div key={message.id}>
            <SingleChat message={message} />
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Type your message here..."
          onChange={(e) => setNewMsg(e.target.value)}
          value={newMsg}
        />
        <button type="submit">
          <SendIcon />
        </button>
      </form>
    </div>
  );
}

export default Chat;
