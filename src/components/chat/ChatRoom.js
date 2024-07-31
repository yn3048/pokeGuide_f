import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import { RootUrl } from '../../api/RootUrl';
import '../../styles/chatRoom.scss';

const socket = io('http://localhost:3000');


const ChatRoom = () => {
    const { chatNo } = useParams();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [showInvite, setShowInvite] = useState(false);
    const [inviteUid, setInviteUid] = useState('');
    const [inviteStatus, setInviteStatus] = useState('');
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.authSlice);

    useEffect(() => {
        if (!currentUser || !currentUser.uid) {
            navigate('/user/login');
        } else {
            socket.on('connect', () => {
                console.log('Socket connected');
            });

            socket.on('connect_error', (err) => {
                console.error('Socket connection error:', err);
            });

            socket.on('disconnect', () => {
                console.log('Socket disconnected');
            });

            socket.on('chat message', (msg) => {
                console.log('New message received:', msg);
                setMessages((prevMessages) => [...prevMessages, msg]);
            });

            fetch(`${RootUrl}/messages/chatroom/${chatNo}`)
                .then(response => response.json())
                .then(data => setMessages(data))
                .catch(error => console.error('Error fetching messages:', error));

            return () => {
                socket.off('chat message');
                socket.off('connect');
                socket.off('disconnect');
                socket.off('connect_error');
            };
        }
    }, [currentUser, navigate, chatNo]);

    const sendMessage = () => {
        if (message.trim() === '') return;
        if (currentUser) {
            const chatMessage = { message, uid: currentUser.uid, chatNo: chatNo };

            socket.emit('chat message', chatMessage);

            fetch(`${RootUrl}/messages`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(chatMessage),
            })
            .then(response => response.json())
            .then(data => console.log('Message saved:', data))
            .catch(error => console.error('Error saving message:', error));
            setMessage('');
        }
    };

    const inviteFriend = () => {
        if (inviteUid.trim() === '') {
            setInviteStatus('Please enter a valid UID.');
            return;
        }

        fetch(`${RootUrl}/invite`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ chatNo, inviteUid }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const inviteMessage = {
                        message: `${inviteUid}가 초대되었습니다.`,
                        uid: 'system',
                        chatNo,
                    };
                    socket.emit('chat message', inviteMessage);
                    setInviteStatus('초대 완료!');
                    setMessages((prevMessages) => [...prevMessages, inviteMessage]);
                } else {
                    setInviteStatus('아이디를 찾을 수 없습니다.');
                }
            })
            .catch(error => {
                console.error('Error inviting user:', error);
                setInviteStatus('Error occurred while inviting.');
            });
    };

    return (
        <div className="chatroom">
            <div className="chatroom-header">
                <h1 className="chatroom-title">채팅방</h1>
                <div className="chatroom-toggle" onClick={() => setShowInvite(!showInvite)}>
                ☰
                </div>
            </div>
            {showInvite && (
                <div className="invite-friends">
                    <input
                        type="text"
                        placeholder="아이디를 입력하세요."
                        value={inviteUid}
                        onChange={(e) => setInviteUid(e.target.value)}
                    />
                    <button onClick={inviteFriend}>초대하기</button>
                    {inviteStatus && <p>{inviteStatus}</p>}
                </div>
            )}
            <div className="chatroom-messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`chatroom-message ${msg.uid === currentUser.uid ? 'own-message' : 'other-message'}`}>
                        <span className="message-author">{msg.uid}</span>: <span className="message-content">{msg.message}</span>
                    </div>
                ))}
            </div>
            <div className="chatroom-input">
                <input
                    type="text"
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="메시지를 입력하세요."
                />
                <button onClick={sendMessage}>보내기</button>
            </div>
        </div>
    );
};

export default ChatRoom;
