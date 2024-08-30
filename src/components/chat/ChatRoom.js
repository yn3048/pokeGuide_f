import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootUrl, socket, connectSocket } from '../../api/RootUrl';
import '../../styles/chatRoom.scss';

const ChatRoom = () => {
    const { chatNo } = useParams();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.authSlice);

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (!currentUser || !currentUser.uid) {
            navigate('/user/login');
        } else {    
            console.log("Connecting with uid:", currentUser.uid, "and chatNo:", chatNo);

            // chatNo를 포함하여 실제 채팅방에 소켓 연결
            connectSocket(currentUser.uid, chatNo);

            socket.on('connect', () => {
                console.log('Socket connected');
                socket.emit('join room', chatNo);
            });

            socket.on('chat message', (msg) => {
                console.log('New message received:', msg);
                const parsedMsg = typeof msg === 'string' ? JSON.parse(msg) : msg;
                setMessages((prevMessages) => [...prevMessages, parsedMsg]);
            });

            fetch(`${RootUrl}/messages/chatroom/${chatNo}?uid=${currentUser.uid}`)
                .then(response => response.json())
                .then(data => setMessages(data))
                .catch(error => console.error('Error fetching messages:', error));

            fetch(`${RootUrl}/chat/chatrooms/${chatNo}/enter?uid=${currentUser.uid}`, {
                method: 'POST',
            }).catch(error => console.error('Error deleting alarms for chat room:', error));
        
            return () => {
                socket.off('chat message'); 
                socket.off('connect');
                socket.off('notification'); 
            };
        }
    }, [currentUser, navigate, chatNo]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = () => {
        if (message.trim() === '') return;

        if (currentUser) {
          const chatMessage = { message, uid: currentUser.uid, chatNo: chatNo };
          socket.emit('chat message', JSON.stringify(chatMessage));

          fetch(`${RootUrl}/messages`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(chatMessage),
          }).then(response => response.json())
          .then(data => console.log('Message saved:', data))
            .catch(error => console.error('Error saving message:', error));

          setMessage('');
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
            event.preventDefault();
        }
    };

    return (
        <div className="chatroom">
            <div className="chatroom-header">
                <button className="back-button" onClick={() => navigate('/chatrooms')}>←</button>
                <h1 className="chatroom-title">채팅방</h1>
            </div>
            <div className="chatroom-messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`chatroom-message ${msg.uid === currentUser.uid ? 'own-message' : 'other-message'}`}>
                        {msg.uid && <span className="message-author">{msg.uid}</span>}
                        {msg.imageUrl ? (
                            <a href={`${RootUrl}${msg.imageUrl}`} download target="_blank" rel="noopener noreferrer">
                                <img src={`${RootUrl}${msg.imageUrl}`} alt="uploaded file" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                            </a>
                        ) : (
                            <span className="message-content">{msg.message}</span>
                        )}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="chatroom-input">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="메시지를 입력하세요."
                />
                <button onClick={sendMessage}>보내기</button>
            </div>
        </div>
    );
};

export default ChatRoom;
