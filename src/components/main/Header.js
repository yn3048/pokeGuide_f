import React, { useEffect, useState } from 'react'
import { RootUrl, socket } from '../../api/RootUrl';
import Alarms from '../chat/Alarms';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';

const Header = ({uid}) => {
  const [alarmCount, setAlarmCount] = useState(0);
  const currentUser = useSelector((state) => state.authSlice);

  useEffect(() => {
    console.log("UID:", currentUser.uid); // UID가 제대로 전달되는지 확인
    if (!currentUser.uid) return;  // uid가 없을 경우 실행하지 않음

    if (uid) {
      // Socket.IO 클라이언트 설정
      socket.emit('join', { uid });
    

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
  }

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
