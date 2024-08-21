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

                <table className="boardList">
            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>글쓴이</th>
                <th>작성일</th>
              </tr>
            </thead>
            <tbody>
                <tr>
                  <td>1</td>
                  <td>게시판글입니다.</td>
                  <td>오홍홍</td>
                  <td>2024-08-21</td>
                </tr>              
            </tbody>
          </table>

            </div>
        </div>
    )
}
