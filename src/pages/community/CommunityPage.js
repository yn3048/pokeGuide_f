import React, { useState } from 'react'
import '../../styles/admin.scss';

export const CommunityPage = () => {

    const [search, setSearch] = useState({
        searchCate: "title",
        keyword: ""
      });

    // enter key 로 검색하기
    const keydown = (e) => {
        if (e.key === 'Enter') {
          submitSearch();
        }
      };

      const searchContent = (e) => {

        const { name, value } = e.target;
        {/**
        setSearch(prevState => ({
          ...prevState,
          [name]: value
        }));
         */}
    
        console.log(search.keyword);
        console.log(search.searchCate);
      }
    
      const submitSearch = async () => {
    
        console.log("넘겨야하는 값1 : ", search.keyword);
        console.log("넘겨야하는 값2 : ", search.searchCate);
    
        //setCurrentPage(1);
        //setHasMore(true);
        //setSearchSubmit(true);
        window.scrollTo(0, 0);
      }
    




    return (
        <div className="wrap">
            <div className='header'>
                <img src="../images/pokemon logo.png" />
            </div>

            <div className='sidebar'>
                <a href='/community'>게시판<img src='../images/ball.png' /></a>
                <a>게시판1</a>
                <a>게시판2</a>
            </div>

            <div className='main'>
                <p>유저 게시판</p>
                <div className='search'>
                    <select name="searchCate" onClick={searchContent} className='searchCate'>
                        <option value="title">제목</option>
                        <option value="content">내용</option>
                        <option value="title+content">제목+내용</option>
                        <option value="nick">닉네임</option>
                    </select>
                    <input name="keyword" onChange={searchContent} className='searchContent' onKeyDown={keydown} placeholder='검색어를 입력하세요' />
                    <button onClick={submitSearch} className='searchBtn'>검색</button>
                </div>

                <table className="userList">
            <thead>
              <tr>
                <th>번호</th>
                <th>아이디</th>
                <th>이름</th>
                <th>닉네임</th>
                <th>성별</th>
                <th>이메일</th>
                <th>가입일</th>
                <th>방문횟수</th>
                <th>권한</th>
                <th>상태</th>
                <th>작업</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(memberList) && memberList.length > 0 ?(memberList && memberList.map((user,index) => (
                <tr key={user.uid}>
                  <td>{index+1}</td>
                  <td>{user.uid}</td>
                  <td>{user.name}</td>
                  <td>{user.nick}</td>
                  <td>{user.gender}</td>
                  <td>{user.email}</td>
                  <td>{user.createDate}</td>
                  <td>{user.visitCount}</td>
                  <td>
                    <select
                      name="role"
                      data-id={user.uid}
                      value={user.role}
                      onChange={onChangeRole}
                      >
                      <option value="USER">USER</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>
                  </td>
                  <td>{user.status}</td>
                  <td>
                    {user.status=="active" ?(<button onClick={stopUser} data-user={user.uid}>정지</button>):(<button onClick={activeUser} data-user={user.uid}>활성화</button>)}
                    <button onClick={delUser} data-uid={user.uid}>삭제</button>
                  </td>
                </tr>
              ))):(<tr>
                <td colSpan="11">자료가 없습니다.</td>
              </tr>)}
              
            </tbody>
          </table>

            </div>
        </div>
    )
}
