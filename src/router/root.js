import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import MainPage from "../pages/main/MainPage";
import LoginPage from "../pages/user/LoginPage";
import ListPage from "../pages/pokemons/ListPage";
import DashboardPage from "../pages/admin/DashboardPage";

//router 생성
const root = createBrowserRouter([
    {path: "/", element: <HomePage />}, // 홈 화면
    {path: "/main", element:<MainPage />}, // 메인 대시보드
    
    // user
    {path: "/user/login", element:<LoginPage />}, // 로그인


    // pokemons
    {path: "/pokemons/list", element:<ListPage />}, // 포켓몬 목록

    // admin
    {path: "/admin/dashboard", element:<DashboardPage />}, // 관리자 대시보드

]);

export default root;