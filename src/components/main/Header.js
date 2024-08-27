import React, { useEffect, useState } from 'react'
import { RootUrl } from '../../api/RootUrl';
import Alarms from '../chat/Alarms';
import { io } from 'socket.io-client';

const Header = ({uid}) => {
  const [alarmCount, setAlarmCount] = useState(0);

  useEffect(() => {
    // 서버와 Socket.IO 클라이언트 연결 설정
    const socket = io(`${RootUrl}:8081`, {
      query: { uid }, // 클라이언트가 연결될 때 uid를 함께 전송
    });

    // 연결된 후 특정 유저에 대한 알림을 수신
    socket.on("notification", (message) => {
      console.log("Received notification:", message);
      setAlarmCount(prevCount => prevCount + 1);
    });

    // 초기 알림 카운트 가져오기
    fetch(`${RootUrl}/chat/alarms?uid=${uid}`)
      .then(response => response.json())
      .then(data => setAlarmCount(data.length))
      .catch(error => console.error('Error fetching alarm count:', error));

    return () => {
      socket.disconnect();
    };
  }, [uid]);


  return (
    <>
      <div className='header'>
        <img src="../images/main_logo.png" />
        <span>{alarmCount} new alarms</span>
        <Alarms uid={uid} />
      </div>
    </>
  )
}

export default Header
