import { io } from "socket.io-client";

const serverHost = "127.0.0.1"; // 또는 배포된 서버 주소
export const RootUrl = `http://${serverHost}:8080/pokeguide`;

const socketServerHost = "127.0.0.1"; // 또는 배포된 서버 주소
export const socket = io(`http://${socketServerHost}:8081`, {
    withCredentials: true,
    autoConnect: false, // 자동 연결 비활성화
});

export const connectSocket = (uid, chatNo) => {
    if (uid) {
        socket.io.opts.query = { uid, chatNo: chatNo || null }; // null일 경우 전역 알림
        socket.connect();
    } else {
        console.error("UID가 설정되지 않았습니다. 소켓을 연결할 수 없습니다.");
    }
};
