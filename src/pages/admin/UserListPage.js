import React from 'react'
import '../../styles/admin.scss';

const UserListPage = () => {


  return (
    <div className="wrap">
      <div className='header'>
        <img src="../images/pokemon logo.png" />
      </div>

      <div className='sidebar'>
        <a href='/admin/userlist'>회원관리<img src='../images/ball.png' /></a>
        <a>포켓몬관리</a>
        <a>마을관리</a>
      </div>

      <div className='main'>
        <p>회원 목록</p>
        <div className='userList'>
          <div className='title'>
            <div>번호</div>
            <div>이름</div>
            <div>닉네임</div>
            <div>권한</div>
          </div>
          <div className='content'>
            <div>1</div>
            <div>홍길동</div>
            <div>홍홍이</div>
            <div>USER</div>
          </div>
        </div>
      </div>
    </div>

  )
}
export default UserListPage