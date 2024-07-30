// ChatRoom.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import { RootUrl } from '../../api/RootUrl';

const socket = io('http://localhost:3000'); // 서버 URL

const ChatRoom = () => {
  const { chatNo } = useParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.authSlice); // state 모양에 맞게 선택자 조정

  useEffect(() => {
    if (!currentUser || !currentUser.uid) {
      navigate('/user/login');
    } else {
      socket.on('chat message', (msg) => {
        setMessages((prevMessages) => [...prevMessages, msg]);
      });
      return () => {
        socket.off('chat message');
      };
    }
  }, [currentUser, navigate]);

  const sendMessage = () => {
    if (message.trim() === '') {
      console.error('Message is empty');
      return;
    }
  
    if (currentUser) {
      const chatMessage = {
        message,
        uid: currentUser.uid,
        chatNo: chatNo, 
      };

      console.log("Sending message:", chatMessage);

      socket.emit('chat message', chatMessage);
  
      fetch(`${RootUrl}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(chatMessage),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Message saved:', data);
        })
        .catch(error => console.error('Error saving message:', error));
  
      setMessage('');
    } else {
      console.error('User UID not found');
    }
  };
  

  return (
    <div>
      <h1>Chat Room</h1>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg.message}</div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatRoom;
