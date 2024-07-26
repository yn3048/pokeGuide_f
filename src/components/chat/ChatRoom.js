import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { RootUrl } from '../../api/RootUrl';

const ChatRoom = ({ currentUser }) => {
  const { chatNo } = useParams();
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const wsUrl = RootUrl.replace(/^http/, 'ws') + `/chat/${chatNo}`;
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log('Connected to the WebSocket server');
    };

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, msg]);
    };

    ws.onclose = () => {
      console.log('Disconnected from the WebSocket server');
    };

    setSocket(ws);

    // Fetch existing messages from the server
    fetch(`${RootUrl}/messages/chatroom/${chatNo}`)
      .then(response => response.json())
      .then(data => setMessages(data))
      .catch(error => console.error('Error fetching messages:', error));

    return () => {
      ws.close();
    };
  }, [chatNo]);

  const sendMessage = () => {
    if (socket && message.trim() !== '' && currentUser?.uid) {
      const chatMessage = {
        message,
        chatNo: parseInt(chatNo),
        uid: currentUser.uid, // 현재 로그인된 사용자의 uid
        oName: 'originalName', // 실제 파일명이 필요하다면 추가
        sName: 'storedName', // 실제 저장된 파일명이 필요하다면 추가
        cDate: new Date().toISOString()
      };

   

      // Send message via WebSocket
      socket.send(JSON.stringify(chatMessage));

      // Save message to the database
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
      console.error('User UID not found or message is empty');
    }
  };

  return (
    <div>
      <h1>Chat Room {chatNo}</h1>
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
