import React from "react";
import Message from "./Message";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect } from "react";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      // console.log("Current data: ", doc.data());
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  return (
    <div className="messages">
      {messages.map((m) =>(<Message message={m} key={m.id}/>))}
    </div>
  );
};

export default Messages;
