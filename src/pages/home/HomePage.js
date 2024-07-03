import axios from 'axios';
import React from 'react'

const HomePage = () => {

  axios.get(`http://localhost:8080/pokeguide/users`)
  .then((data) => {
    console.log(data)
  }).catch((err) => {
    console.log(err);
  });

  return (
    <div>
      <h2>로그인페이지</h2>

      <img src="../images/pikachu.gif" alt='피카츄'></img>
    </div>
  )
}

export default HomePage