import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RootUrl } from '../../api/RootUrl';
import { useSelector } from 'react-redux';

const ChatRoomList = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const [newRoomTitle, setNewRoomTitle] = useState('');
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.authSlice);
  const uid = currentUser?.uid; // currentUser에서 uid만 추출

  useEffect(() => {
    if(!currentUser || !currentUser.uid){
      navigate('/user/login');
    }else{
    fetch(`${RootUrl}/chatrooms`)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setChatRooms(data);
        } else {
            console.error('Received data is not an array:', data);
            setChatRooms([]);  // 데이터가 배열이 아닌 경우 빈 배열로 설정
        }
    })
      .catch(error => console.error('Error fetching chat rooms:', error));
    }
    
  }, [currentUser, navigate]);
  
  console.log("uid : ", uid)

  const createChatRoom = () => {
    console.log("create!!!!!")

    if (newRoomTitle.trim() === '') return;
    
    fetch(`${RootUrl}/chatrooms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: newRoomTitle  , uid : uid, status: 'active' }),
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
