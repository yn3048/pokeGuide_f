import React, { useEffect, useState } from 'react'
import '../../styles/admin.scss';
import { postUserList } from '../../api/AdminApi';

const UserListPage = () => {

  const [list,setList] = useState([]);

  //무한스크롤 적용해보기

  const userList = async()=> {

    const result = await postUserList();

    setList(result);

    console.log("뭐가 나오는지 찍어보자 : ", result);

  }

  useEffect(()=>{

    userList(); 

  },[]);  



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
            <div>성별</div>
            <div>이메일</div>
            <div>가입일</div>
            <div>방문횟수</div>
            <div>권한</div>
            <div>관리</div>

          </div>

          <div className='content'>
          {list.map((item,index) => (
          <div key={index}>
              <div>{index+1}</div>
              <div>{item.name}</div>
              <div>{item.nick}</div>
              <div>{item.gender}</div>
              <div>{item.email}</div>
              <div>{item.createDate}</div>
              <div>5</div>
              <div>
                <select>
                  <option>{item.role}</option>
                  {item.role==="USER"?(<option>ADMIN</option>):(<option>USER</option>)}
                </select>
                </div>
              <div>삭제/정지</div>
            </div>))}

          </div>          

        </div>

        <button className='allDel'>전체삭제</button>

      </div>
    </div>

  )
}
export default UserListPage