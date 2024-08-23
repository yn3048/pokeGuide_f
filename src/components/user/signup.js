import React from 'react';
import '../../styles/signup.scss';
import { Link, useNavigate } from 'react-router-dom';

const CongratsPage = () => {
  const navigate = useNavigate();

  const gohome = () =>{
    navigate('/');
  }
  return (
    <div className="congrats-page">
      <img src='../../images/pika.jpg' alt="Pika" className="congrats-image" />
      <h1 className="congrats-message">가입을 축하합니다!</h1>
      <Link className='gohome' onClick={gohome}>홈으로 가기</Link>
    </div>
  );
};

export default CongratsPage;
