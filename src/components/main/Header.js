import React, { useEffect, useState } from 'react';
import { RootUrl, socket, connectSocket } from '../../api/RootUrl';
import Alarms from '../chat/Alarms';
import { useSelector } from 'react-redux';

const Header = ({ uid }) => {
    const [alarmCount, setAlarmCount] = useState(0);
    const currentUser = useSelector((state) => state.authSlice);

    useEffect(() => {
        if (!currentUser.uid) return;

        // "global" 채널로 알림을 받기 위한 소켓 연결
        connectSocket(currentUser.uid, "global");

        socket.on('notification', (message) => {
            console.log("Received notification:", message);
            setAlarmCount(prevCount => prevCount + 1);
        });

        fetch(`${RootUrl}/chat/alarms?uid=${uid}`)
            .then(response => response.json())
            .then(data => setAlarmCount(data.length))
            .catch(error => console.error('Error fetching alarm count:', error));

        return () => {
            socket.off('notification');
        };
    }, [uid]);

    return (
        <div className='header'>
            <img src="../images/main_logo.png" />
            <span>{alarmCount} new alarms</span>
            <Alarms uid={uid} />
        </div>
    );
};

export default Header;
