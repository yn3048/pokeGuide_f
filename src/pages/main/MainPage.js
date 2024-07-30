import React from 'react'
import '../../styles/main.scss';
import { Link } from 'react-router-dom';
import { getCookie } from '../../util/cookieUtil';

const MainPage = () => {


  return (
    <div className="Main">
      <h2>메인 대시보드</h2>
      <img src="../images/pikachu.gif" alt='피카츄'></img><br />

      <Link to={`/chatrooms`}>ChatRooms</Link><br />
      <Link to={`/user/login`}>LoginPage</Link>

    </div>
  )
}
export default MainPage
