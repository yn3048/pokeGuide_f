import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootUrl, socket } from '../../api/RootUrl';
import '../../styles/chatRoom.scss';

const ChatRoom = () => {
    const { chatNo } = useParams();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [showInvite, setShowInvite] = useState(false);
    const [inviteUid, setInviteUid] = useState('');
    const [inviteStatus, setInviteStatus] = useState('');
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.authSlice);


    // 메시지 영역에 대한 ref 생성
    const messagesEndRef = useRef(null);

    // 스크롤을 가장 아래로 내리는 함수
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

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
                const parsedMsg = typeof msg === 'string' ? JSON.parse(msg) : msg;
                setMessages((prevMessages) => [...prevMessages, parsedMsg]);
            });

            fetch(`${RootUrl}/messages/chatroom/${chatNo}?uid=${currentUser.uid}`)
            .then(response => {
                if (response.status === 403) {
                    // 접근 권한이 없으면 홈으로 리다이렉트
                    navigate('/');
                }
                return response.json();
            })
            .then(data => {
                if (Array.isArray(data)) {
                    setMessages(data);
                } else {
                    console.error('Received data is not an array:', data);
                    setMessages([]);  // 데이터가 배열이 아닌 경우 빈 배열로 설정
                }
            })
            .catch(error => console.error('Error fetching messages:', error));

            return () => {
                socket.off('chat message');
                socket.off('connect');
                socket.off('disconnect');
                socket.off('connect_error');
            };
        }
    }, [currentUser, navigate, chatNo]);

    // messages 상태가 변경될 때마다 스크롤을 아래로 이동
    useEffect(() => {
        scrollToBottom();
    }, [messages]);


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



    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
            event.preventDefault();  // 엔터 키의 기본 동작 방지 (폼 제출 등)
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('uid', currentUser.uid);
        formData.append('chatNo', chatNo);
    
        fetch(`${RootUrl}/upload`, {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            console.log('File uploaded:', data.imageUrl);
            const chatMessage = { message: '', imageUrl: data.imageUrl, uid: currentUser.uid, chatNo: chatNo };
            socket.emit('chat message', chatMessage);
            setMessages((prevMessages) => [...prevMessages, chatMessage]);
        })        
        .catch(error => console.error('Error uploading file:', error));
    };
    




    const inviteFriend = () => {
        if (inviteUid.trim() === '') {
            setInviteStatus('초대할 친구의 아이디를 입력하세요.');
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

    const goBack = () => {
        navigate('/chatrooms');
    };



    return (
        
        <div className="chatroom">
            <div className="chatroom-header">
            <button className="back-button" onClick={goBack}>
                    ←
                </button>
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
        <span className="message-author">{msg.uid}</span>: 
        {msg.imageUrl ? (
            <a 
                href={`http://localhost:8080${msg.imageUrl}`} 
                download 
                target="_blank" 
                rel="noopener noreferrer"
            >
                <img 
                    src={`http://localhost:8080${msg.imageUrl}`} 
                    alt="uploaded file" 
                    className="message-image" 
                    style={{ maxWidth: '100px', maxHeight: '100px' }} 
                />
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
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                    id="file-input"
                />
                <button onClick={() => document.getElementById('file-input').click()}>+</button> {/* 플러스 버튼 */}
                
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
