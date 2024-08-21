import React from 'react';
import '../../styles/signup.scss';

const CongratsPage = () => {
  return (
    <div className="congrats-page">
      <img src='../../images/pika.jpg' alt="Pika" className="congrats-image" />
      <h1 className="congrats-message">가입을 축하합니다!</h1>
    </div>
  );
};

export default CongratsPage;
