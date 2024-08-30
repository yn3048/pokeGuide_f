import React, { useEffect, useState } from 'react'
import { RootUrl, socket } from '../../api/RootUrl';
import Alarms from '../chat/Alarms';
import { useSelector } from 'react-redux';

const Header = ({uid}) => {
  const [alarmCount, setAlarmCount] = useState(0);
  const currentUser = useSelector((state) => state.authSlice);

  useEffect(() => {
    if (!currentUser.uid) return;

    if (currentUser && currentUser.uid) {

      socket.io.opts.query = { uid: currentUser.uid };

        // 소켓 연결
        socket.connect();


        // 연결 확인
        socket.on('connect', () => {
            console.log('Socket connected:', socket.id);
        });


        // 알림 이벤트 수신 설정
        socket.on("notification", (message) => {
            console.log("Received notification:", message);
            setAlarmCount(prevCount => prevCount + 1);
        });

        // 기존 알림 카운트를 가져오는 요청
        fetch(`${RootUrl}/chat/alarms?uid=${uid}`)
            .then(response => response.json())
            .then(data => setAlarmCount(data.length))
            .catch(error => console.error('Error fetching alarm count:', error));
    }

    return () => {
        socket.off('notification');
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
