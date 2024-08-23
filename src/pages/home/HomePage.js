import axios from 'axios';
import React from 'react'
import { RootUrl } from '../../api/RootUrl';
import { Link } from 'react-router-dom';


const HomePage = () => {

  axios.get(`${RootUrl}/users`)
  .then((data) => {
    console.log(data)
  }).catch((err) => {
    console.log(err);
  });

  return (
    <div>
      <h2>로그인페이지</h2>

      <img src="../images/pikachu.gif" alt='피카츄'></img><br />

      <Link to={`/chatrooms`}>ChatRooms</Link><br />
      <Link to={`/user/login`}>LoginPage</Link><br />
      <Link to={`/poke/list`}>pokeList</Link><br />
      <Link to={`/admin/dashboard`}>Admin</Link><br />
      <Link to={`/community`}>community</Link><br />
      
    </div>
  )
}

export default HomePage