import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <>
      <header>
        <h1>
          <Link to="/">
          <img src='/images/main_logo.png' alt='logo'/>
          </Link>
        </h1>
       
        <div className='nav-box'>
          <ul className='gnb'>
            <li>
            <Link to="/poke/list">
            <img src='/images/pokeball.png' alt='pokeball'/>
            <p>포켓몬 도감</p>
            </Link>
            </li>
            <li>
            <Link to="/">
            <img src='/images/board.png' alt='board'/>
            <p>게시판</p>
            </Link>
            </li>   
          </ul>
         <ul className='right-gnb'>
          <li>
            <Link to="/user/login">
            <img src='/images/login.png' alt='login'/>
            <p>로그인</p>
          </Link>
          </li>
          <li>
            <Link to="/">
            <img src='/images/search.png' alt='search'/>
            <p>통합검색</p>
            </Link>
          </li>
         </ul>
        </div>
      </header>
      <hr/>
    </>
  )
}

export default Header
