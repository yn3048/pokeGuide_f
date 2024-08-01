import { io } from "socket.io-client";

const serverHost = "127.0.0.1";
//const serverHost = "3.34.158.6";

export const RootUrl = `http://${serverHost}:8080/pokeguide`;


const socketServerHost = "127.0.0.1";
// const socketServerHost = "3.34.158.6";

export const socket = io(`http://${socketServerHost}:8081`, { withCredentials: true });