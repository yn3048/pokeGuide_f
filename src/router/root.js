import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import LoginPage from "../pages/user/LoginPage";
import ListPage from "../pages/pokemons/ListPage";
import DashboardPage from "../pages/admin/DashboardPage";
import Terms from "../pages/user/Terms";
import Register from "../pages/user/Register";
import FindId from "../pages/user/FindId";
import FindPass from "../pages/user/FindPass";
import Signup from "../pages/user/Signup";

import UserlistPage from "../pages/admin/UserListPage";

import ChatRoom from "../components/chat/ChatRoom";
import ChatRoomList from "../components/chat/ChatRoomList";
import { CommunityPage } from "../pages/community/CommunityPage";
import WritePage from "../pages/community/WritePage";


//router 생성
const root = createBrowserRouter([
    {path: "/", element: <HomePage />}, // 홈 화면
    
    // userd
    {path: "/user/login", element:<LoginPage />}, // 로그인
    {path: "/user/Terms", element:<Terms />}, // 약관
    {path: "/user/register", element:<Register />}, // 회원가입
    {path: "/user/FindId", element:<FindId />}, // 아이디찾기
    {path: "/user/FindPass", element:<FindPass />}, // 비번찾기
    {path: "/user/Signup", element:<Signup />}, // 비번찾기

    // pokemons
    {path: "/poke/list", element:<ListPage />}, // 포켓몬 목록

    // admin
    {path: "/admin/dashboard", element:<DashboardPage />}, // 관리자 대시보드
    {path: "/admin/userlist", element:<UserlistPage/>},//관리자 - 회원관리



    // chat
    { path: "/chatrooms", element: <ChatRoomList /> },
    { path: "/chatroom/:chatNo", element: <ChatRoom /> },


    //community
    { path: "/community", element: <CommunityPage /> },//커뮤니티 리스트
    { path: "/community/write", element: <WritePage /> },//커뮤니티 - 글쓰기
]);

export default root;
