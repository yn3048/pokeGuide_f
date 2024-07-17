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
]);

export default root;
