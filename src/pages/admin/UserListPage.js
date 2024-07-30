import React, { useEffect, useState } from 'react'
import '../../styles/admin.scss';
import {getUserDel, postChangeRole, postUserList } from '../../api/AdminApi';
import { getCookie } from '../../util/cookieUtil';


const UserListPage = () => {

  const auth = getCookie("auth");

  const [list,setList] = useState([]);
  const [role,setRole] = useState([]);
  const formData = new FormData();

  //무한스크롤 적용해보기

  const userList = async()=> {

    const result = await postUserList();

    setList(result);

    console.log("뭐가 나오는지 찍어보자 : ", result);

  }

  useEffect(()=>{

    userList(); 

  },[]);  

  const allUserDel = async ()=>{

    if(window.confirm("정말 삭제하시겠습니까?")){
      
      const result = await getUserDel();

      if(result){
        alert("삭제되었습니다.");
        console.log("유저 모두 삭제 완료");
      }else{
        alert("삭제에 실패했습니다.");
        console.log("유저 삭제 실패");
      }

    }      

  }

  const onChangeRole = async (e)=>{
   
    const Role = e.target.value;
    const Uid = e.target.dataset.id;

    console.log("Uid : ",Uid);

    formData.append("role",Role);
    formData.append("uid",Uid);

    console.log("Role",Role);

    setRole(Role);

    await postChangeRole(formData);

  }



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
              <div>{item.visitCount}</div>
              <div>
                <select name = "userRole" data-id={item.uid} onChange={onChangeRole}>
                  <option value={item.role}>{item.role}</option>
                  {item.role==="USER"?(<option value="ADMIN">ADMIN</option>):(<option value="USER">USER</option>)}
                </select>
                </div>
              <div>삭제/정지</div>
            </div>))}

          </div>          

        </div>

        <button onClick={allUserDel} className='allDel'>전체삭제</button>

      </div>
    </div>

  )
}
export default UserListPage