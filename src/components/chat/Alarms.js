import React, { useEffect, useState } from 'react';
import { RootUrl, socket } from '../../api/RootUrl'; // API 경로가 정의된 파일

const Alarms = ({ uid }) => {
    const [alarms, setAlarms] = useState([]);

    useEffect(() => {
        fetch(`${RootUrl}/chat/alarms?uid=${uid}`)
            .then(response => response.json())
            .then(data => {
                console.log("Fetched alarms:", data); // 데이터 확인
                setAlarms(Array.isArray(data) ? data : []); // 배열이 아닌 경우 빈 배열로 설정
            })
            .catch(error => console.error('Error fetching alarms:', error));
            socket.on('notification', (newAlarm) => {
                console.log("New alarm received:", newAlarm);
                setAlarms((prevAlarms) => [...prevAlarms, newAlarm]);
            });
    
            return () => {
                socket.off('notification');
            };
        }, [uid]);

    const checkAndDeleteAlarm = (alarmId) => {
        fetch(`${RootUrl}/chat/alarms/${alarmId}/check`, {
            method: 'POST',
        })
            .then(() => {
                setAlarms(alarms.filter(alarm => alarm.id !== alarmId));
            })
            .catch(error => console.error('Error checking alarm:', error));
    };

    return (
        <div>
            <h2>Alarms</h2>
            <ul>
                {alarms.map(alarm => (
                    <li key={alarm.id}>
                        {alarm.message}
                        <button onClick={() => checkAndDeleteAlarm(alarm.id)}>Check</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Alarms;
