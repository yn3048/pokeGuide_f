import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RootUrl } from '../../api/RootUrl';

const ChatRoomList = ({ currentUser }) => {
  const [chatRooms, setChatRooms] = useState([]);
  const [newRoomTitle, setNewRoomTitle] = useState('');

  useEffect(() => {
    fetch(`${RootUrl}/chatrooms`)
      .then(response => response.json())
      .then(data => setChatRooms(data))
      .catch(error => console.error('Error fetching chat rooms:', error));
  }, []);

  const createChatRoom = () => {
    if (newRoomTitle.trim() === '') return;
    
    fetch(`${RootUrl}/chatrooms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: newRoomTitle, status: 'active' }),
    })
      .then(response => response.json())
      .then(newRoom => {
        setChatRooms([...chatRooms, newRoom]);
        setNewRoomTitle('');
      })
      .catch(error => console.error('Error creating chat room:', error));
  };

  return (
    <div>
      <h1>Chat Rooms</h1>
      <ul>
        {chatRooms.map(room => (
          <li key={room.chatNo}>
            <Link to={`/chatroom/${room.chatNo}`}>{room.title}</Link>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          placeholder="Enter new room title"
          value={newRoomTitle}
          onChange={(e) => setNewRoomTitle(e.target.value)}
        />
        <button onClick={createChatRoom}>Create Room</button>
      </div>
    </div>
  );
};

export default ChatRoomList;
