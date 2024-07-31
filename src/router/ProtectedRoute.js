// ProtectedRoute.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { accessToken } = useSelector((state) => state.auth);

  if (!accessToken) {
    // 로그인되어 있지 않으면 로그인 페이지로 리디렉션
    return <Navigate to="/user/login" />;
  }

  // 로그인되어 있으면 보호된 페이지를 렌더링
  return children;
};

export default ProtectedRoute;
