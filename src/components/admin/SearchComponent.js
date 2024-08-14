import React from 'react'

export const SearchComponent = ({searchContent,submitSearch}) => {

    // enter key 로 검색하기
    const keydown = (e) => {
      if (e.key === 'Enter') {
        submitSearch();
      }
    };

  return (
    <div className='search'>
          <select name="searchCate" onClick={searchContent} className='searchCate'>
            <option value="uid">아이디</option>
            <option value="name">이름</option>
            <option value="nick">닉네임</option>
          </select>
          <input name="keyword" onChange={searchContent} className='searchContent' onKeyDown={keydown} placeholder='검색어를 입력하세요' />
          <button onClick={submitSearch} className='searchBtn'>검색</button>
    </div>
  )
}
