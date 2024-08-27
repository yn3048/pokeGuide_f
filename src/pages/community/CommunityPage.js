import React, { useState } from 'react'
import '../../styles/community.scss';
import { useNavigate } from 'react-router-dom';


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
    <div className='community'>
      <p>유저 게시판</p>

      <div className='searchWriteContainer'>
        <button className='writeBtn' onClick={write}>글쓰기</button>

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
      </div>

      <div className="boardList">
        <ul>
          <li>
            <dl>
            
              <dt><a>게시판글입니당~ 일라일라일라이라~ 일라일아</a></dt>
              <dd><img src="../images/ball.png" alt='포켓볼'></img><a>오홍홍</a></dd>
            
            </dl>
            
            <p>

              <span>조회<span> 2</span>|</span>
              <span> 2024-08-22</span>

            </p>

          </li>


          <li>
            <dl>
            
              <dt><a>게시판글입니당~ 일라일라일라이라~ 일라일아</a></dt>
              <dd><img src="../images/ball.png" alt='포켓볼'></img><a>오홍홍</a></dd>
            
            </dl>
            
            <p>

              <span>조회<span> 2</span>|</span>
              <span> 2024-08-22</span>

            </p>

          </li>


          <li>
            <dl>
            
              <dt><a>게시판글입니당~ 일라일라일라이라~ 일라일아</a></dt>
              <dd><img src="../images/ball.png" alt='포켓볼'></img><a>오홍홍</a></dd>
            
            </dl>
            
            <p>

              <span>조회<span> 2</span>|</span>
              <span> 2024-08-22</span>

            </p>

          </li>


          <li>
            <dl>
            
              <dt><a>게시판글입니당~ 일라일라일라이라~ 일라일아</a></dt>
              <dd><img src="../images/ball.png" alt='포켓볼'></img><a>오홍홍</a></dd>
            
            </dl>
            
            <p>

              <span>조회<span> 2</span>|</span>
              <span> 2024-08-22</span>

            </p>

          </li>


          <li>
            <dl>
            
              <dt><a>게시판글입니당~ 일라일라일라이라~ 일라일아</a></dt>
              <dd><img src="../images/ball.png" alt='포켓볼'></img><a>오홍홍</a></dd>
            
            </dl>
            
            <p>

              <span>조회<span> 2</span>|</span>
              <span> 2024-08-22</span>

            </p>

          </li>


          <li>
            <dl>
            
              <dt><a>게시판글입니당~ 일라일라일라이라~ 일라일아</a></dt>
              <dd><img src="../images/ball.png" alt='포켓볼'></img><a>오홍홍</a></dd>
            
            </dl>
            
            <p>

              <span>조회<span> 2</span>|</span>
              <span> 2024-08-22</span>

            </p>

          </li>
          </ul>
      </div>
    </div>
  )

}
