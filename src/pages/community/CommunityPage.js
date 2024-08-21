import React, { useState } from 'react'
import '../../styles/community.scss';
import { useNavigate } from 'react-router-dom';
import DefaultLayout from '../../layouts/DefaultLayout';

export const CommunityPage = () => {

  const [search, setSearch] = useState({
    searchCate: "title",
    keyword: ""
  });

  const navigate = useNavigate();

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

  const write = () => {

    navigate(`/community/write`);
  }

  return (
    <DefaultLayout>
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

      <div className='boardContainer'>
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
              <td>게시판글입니다1</td>
              <td>오홍홍</td>
              <td>2024-08-21</td>
            </tr>
            <tr>
              <td>2</td>
              <td>게시판글입니다2</td>
              <td>오홍홍</td>
              <td>2024-08-22</td>
            </tr>
            <tr>
              <td>3</td>
              <td>게시판글입니다3</td>
              <td>오홍홍</td>
              <td>2024-08-23</td>
            </tr>
            <tr>
              <td>4</td>
              <td>게시판글입니다4</td>
              <td>오홍홍</td>
              <td>2024-08-24</td>
            </tr>
          </tbody>
        </table>
        <button className='writeBtn' onClick={write}>글쓰기</button>
      </div>
    </DefaultLayout>
  )
}
