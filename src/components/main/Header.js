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
        <div>
        <div>
          <Link to="/poke/list">
          <img src='/images/pokeball.png' alt='pokeball'/>
          </Link>
          <Link to="/">
          <img src='/images/board.png' alt='board'/>
          </Link>
        <Link to="/user/login">
          <img src='/images/login.png' alt='login'/>
          </Link>
          <Link to="/">
          <img src='/images/search.png' alt='search'/>
          </Link>
        </div>
        </div>
       
      </header>
      <hr/>
    </>
  )
}

export default Header
