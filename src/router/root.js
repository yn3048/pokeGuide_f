import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import MainPage from "../pages/main/MainPage";
import LoginPage from "../pages/user/LoginPage";
import ListPage from "../pages/pokemons/ListPage";
import DashboardPage from "../pages/admin/DashboardPage";
import Terms from "../pages/user/Terms";
import Register from "../pages/user/Register";
import FindId from "../pages/user/FindId";
import FindPass from "../pages/user/FindPass";

import UserlistPage from "../pages/admin/UserListPage";

import ChatRoom from "../components/chat/ChatRoom";
import ChatRoomList from "../components/chat/ChatRoomList";


//router 생성
const root = createBrowserRouter([
    {path: "/", element: <HomePage />}, // 홈 화면
    {path: "/main", element:<MainPage />}, // 메인 대시보드
    
    // user
    {path: "/user/login", element:<LoginPage />}, // 로그인
    {path: "/user/Terms", element:<Terms />}, // 약관
    {path: "/user/register", element:<Register />}, // 회원가입
    {path: "/user/FindId", element:<FindId />}, // 아이디찾기
    {path: "/user/FindPass", element:<FindPass />}, // 비번찾기

    // pokemons
    {path: "/pokemons/list", element:<ListPage />}, // 포켓몬 목록

    // admin
    {path: "/admin/dashboard", element:<DashboardPage />}, // 관리자 대시보드

    {path: "/admin/userlist", element:<UserlistPage/>}//관리자 - 회원관리


    // chat
    { path: "/chatrooms", element: <ChatRoomList /> },
    { path: "/chatroom/:chatNo", element: <ChatRoom /> },

]);

export default root;
