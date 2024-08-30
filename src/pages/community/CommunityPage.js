import React, { useEffect, useState } from 'react'
import '../../styles/community.scss';
import { useNavigate } from 'react-router-dom';
import { ArticleList } from '../../api/CommunityApi';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ClipLoader } from 'react-spinners';



export const CommunityPage = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [articleList, setArticleList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchSubmit, setSearchSubmit] = useState(true);

  const params = new FormData();


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
    
        setSearch(prevState => ({
          ...prevState,
          [name]: value
        }));
        

    console.log(search.keyword);
    console.log(search.searchCate);
  }
  
  const override = {
    display: "flex",
    margin: "0 auto",
    borderColor: "#E50915",
    textAlign: "center",
    setTimeout: 3000,
  };

  const submitSearch = async () => {

    console.log("넘겨야하는 값1 : ", search.keyword);
    console.log("넘겨야하는 값2 : ", search.searchCate);

    setCurrentPage(1);
    setHasMore(true);
    setSearchSubmit(true);
    window.scrollTo(0, 0);
  }

  const write = () => {

    navigate(`/community/write`);
  }


  //글 리스트 불러오기
  const fetchData = async (page, keyword, searchCate) => {
    try {

      setLoading(true);

      console.log("page : ", page);
      console.log("keyword", keyword);
      console.log("searchCate", searchCate);

      params.append("pg", page);
      params.append("keyword", keyword);
      params.append("searchCate", searchCate);

      const response = await ArticleList(params);

      const newArticle = response.body;

      console.log("출력할 데이터 보기 : ", newArticle);
      console.log("출력할 데이터와 함께 currentPage보기 : ", currentPage);

      setArticleList((prevList) => {

        if (!newArticle) {

          console.log("데이터가 없을시에 여기에 들어옴");

          return prevList;//데이터가 없을시에 그냥 그 전 데이터 불러오기

        } else if (page === 1) {
          console.log("결과 값이 없을때 여기에 들어오나?");
          return newArticle; // 페이지가 1일 때 전체 교체
        } else {
          console.log("정상적으로 저장이 되려면 여기에 들어와야해!");
          const existingIds = new Set(prevList.map(item => item.ano));
          return [...prevList, ...newArticle.filter(item => !existingIds.has(item.ano))];//반복되는 결과는 없애기
        }
      });

      console.log("어디까지 들어오는지 확인해보자...1");

      if (!newArticle) {

        console.log("newArticle undefined이거나 null인가? : ", newArticle);
        setHasMore(false);

      } else if (newArticle.length < 5) {// 남은 길이가 5이하면 그만 불러오기

        console.log("배열의 길이 : ", newArticle.length);
        setHasMore(false);

      } else {

        console.log("newArticle 길이 찍어보기 : ", newArticle.length);

        setHasMore(true);
      }

      setLoading(false);
    } catch (error) {
      console.error('글을 불러오는데 실패했습니다.', error);
      setLoading(false);
    }
  };
  useEffect(() => {

    const fetchAndSetData = async () => {

      if (searchSubmit) {
        console.log("currentPage 찍어봄 : ",currentPage);
        setSearchSubmit(false);
        await fetchData(currentPage, search.keyword, search.searchCate); // 비동기 함수 처리
        console.log("글리스트 출력해봄(articleList) : ",articleList);        
      }
    }

    window.scrollTo(0,0);

    fetchAndSetData();
  }, [currentPage, searchSubmit]);

  const fetchMoreData = () => {
    if (!loading && hasMore) {

      console.log("인피니티 스크롤 작동!");
      console.log("회원이 5명이면 이게 작동하면 안됨.");
      setCurrentPage((prevPage) => prevPage + 1);
      setSearchSubmit(true);

      console.log("loading값 : ", loading);
      console.log("hasMore값 : ", hasMore);

    } else {

      console.log("더이상 불러올 페이지가 없습니다.");

    }
  };

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

      <InfiniteScroll
        dataLength={articleList.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<ClipLoader
          color="#E50915"
          loading={loading}
          cssOverride={override}
          size={20}
        />}
      >

        <div className="boardList">
          <ul>
            {articleList && articleList.map((list, index) => (
              <li key={list.ano}>
                <dl>
                  <dt><a>{list.title}</a></dt>
                  <dd>
                    <img src="../images/ball.png" alt='포켓볼' />
                    <a>{list.nick}</a>
                  </dd>
                </dl>
                <p>
                  <span>조회 <span>{list.hit}</span>|</span>
                  <span> {list.rdate}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </InfiniteScroll>
      {loading && <p>Loading...</p>}

    </div>
  )

}
