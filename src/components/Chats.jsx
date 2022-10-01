import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChat = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        // console.log("Current data: ", doc.data());
        setChats(doc.data());    
        // console.log(Object.entries(chats));
      });
      return () => {
        unsub();
      };
    };

    currentUser.uid && getChat();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    console.log(u);
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className="chats">
      {Object.entries(chats)?.sort((a,b)=>b[1].date-a[1].date).map((chat) => (
        <div
          className="userChat"
          key={chat[0]}
          onClick={()=>handleSelect(chat[1].userInfo)}
        >
          <img src={chat[1].userInfo.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{chat[1].userInfo.displayName}</span>
            <p>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
      {/* <div className="userChat">
        <img
          src="https://www.biography.com/.image/t_share/MTgwMzIxNDc5NDUwMTc0NjE0/gettyimages-457930149.jpg"
          alt=""
        />
        <div className="userChatInfo">
          <span>John</span>
          <p>Hello</p>
        </div>
      </div> */}
    </div>
  );
};

export default Chats;
