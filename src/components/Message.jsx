import React, { useContext, useEffect, useRef } from 'react'
import { useState } from 'react';
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import moment from 'moment';

const Message = ({message}) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const [date, setDate] = useState()
  const ref= useRef()

  useEffect(() => {
    ref.current?.scrollIntoView({behavior:"smooth"})
    toDateTime(message.date.seconds)
  }, [message])

  function toDateTime(sec) {
     const day=moment.unix(sec).utc(sec*1000).format('HH:mm:ss');
    setDate(day)
  }
  //console.log(message);
  return (
    <div ref={ref} className={`message ${message.senderId===currentUser.uid&&"owner"}`}>
      <div className='messageInfo'>
        <img src={ message.senderId===currentUser.uid?currentUser.photoURL:data.user.photoURL } alt="" />
        <span>{date}</span>
      </div>
      <div className='messageContent'>
        <p>{message.text}</p>
        <a href={`${message.img}`} target="_blank" >
          <img src={message.img} alt="" />
        </a>
      </div>
    </div>
  )
}

export default Message