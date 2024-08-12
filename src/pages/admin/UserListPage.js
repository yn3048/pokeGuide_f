import React, { useEffect, useRef, useState } from 'react'
import '../../styles/admin.scss';
import { getUserDel, postChangeRole, postUserList, deleteUser, userStop, searchKeyword, allUserList, userActive } from '../../api/AdminApi';
import XLSX from 'xlsx-js-style';
import { useLocation } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ClipLoader } from "react-spinners";
import { UserTable } from '../../components/admin/UserTable';
import { SearchComponent } from '../../components/admin/SearchComponent';

{/*
const initState = {
  dtoList: [],
  cate: null,
  length:0,
  pg: 0,
  size: 0,
  total: 0,
  startNo: 0,
  start: 0,
  end: 0,
  prev: false,
  next: false,
};*/}

const UserListPage = () => {

  //const [list, setList] = useState(initState);
  const [memberList, setMemberList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [searchUser, setSearchUser] = useState(''); // 검색 입력 처리
  const [searchQuery, setSearchQuery] = useState(''); // 검색어 저장
  const [role, setRole] = useState([]);
  const formData = new FormData();
  const params = new FormData();
  

  const [search, setSearch] = useState({
    searchCate: "uid",
    keyword: ""
  });

  //스피너 관련 정렬?(아래)

  const override = {
    display: "flex",
    margin: "0 auto",
    borderColor: "#E50915",
    textAlign: "center",
    setTimeout:3000,
  };


  // 회원 데이터 가져오기
  const fetchData = async (page, keyword,searchCate) => {

  
    try {

      setLoading(true);

      console.log("page : ",page);
      console.log("keyword",keyword);
      console.log("searchCate",searchCate); 
      
      params.append("pg", page);
      params.append("keyword", keyword);
      params.append("searchCate", searchCate);

      const response = await postUserList(params);

      const newMembers = response.dtoList;

      console.log("출력할 데이터 보기 : ",newMembers);

      setMemberList((prevList) => {
        if (page === 1) {
          return newMembers; // 페이지가 1일 때 전체 교체
        } else {
          //return [...prevList, ...newMembers]; // 페이지가 1이 아닐 때 추가
          const existingIds = new Set(prevList.map(item => item.uid));
        return [...prevList, ...newMembers.filter(item => !existingIds.has(item.uid))];//반복되는 결과는 없애기
        }
      });

      if (newMembers.length<5) {
        // 남은 길이가 5이하면 그만 불러오기
        console.log("배열의 길이 : ",newMembers.length);
        setHasMore(false);
      } else {
        setHasMore(true);
      }

      setLoading(false);
    } catch (error) {
      console.error('유저를 불러오는데 실패했습니다.', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage, searchQuery);
  }, [currentPage, searchQuery]);

  const searchChange = (e) => {
    setSearchUser(e.target.value);
  };

  // 검색 후 페이지 reload
  /*const search = () => {
      setCurrentPage(1);
      setHasMore(true);
      setSearchQuery(searchUser);
      setMemberList([]); // 새로운 검색 시 이전 검색 결과를 초기화
  };*/

  // enter key 로 검색하기
  const keydown = (e) => {
    if (e.key === 'Enter') {
      search();
    }
  };

  const fetchMoreData = () => {
    if (!loading && hasMore) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };




  {/*const userList = async () => {

    const result = await postUserList(pageRequest);

    setList(result);

    console.log("뭐가 나오는지 찍어보자 : ", result);

  }


  useEffect(() => {
    userList();
  }, []);

  */}

  const allUserDel = async () => {//모든 유저 삭제

    if (window.confirm("정말 삭제하시겠습니까?")) {

      const result = await getUserDel();

      if (result) {
        alert("삭제되었습니다.");
        console.log("유저 모두 삭제 완료");
        setCurrentPage(1);
        await fetchData(1, searchQuery);
      } else {
        alert("삭제에 실패했습니다.");
        console.log("유저 삭제 실패");
      }
    }
  }

  const delUser = async (e) => {//하나의 유저만 삭제

    const uid = e.target.dataset.uid;

    if (window.confirm('정말 삭제하시겠습니까?')) {

      const result = await deleteUser(uid);

      if (result) {

        alert("삭제되었습니다.");
        console.log("유저 삭제 완료");
        setCurrentPage(1);
        await fetchData(1, searchQuery);

      } else {

        alert("삭제에 실패했습니다.");
        console.log("유저 삭제 실패");

      }
    }
  }

  const stopUser = async (e) => {//유저 상태 정지

    const uid = e.target.dataset.user;

    if (window.confirm('유저를 정지시키겠습니까?')) {

      const result = await userStop(uid);

      if (result) {

        alert("유저가 정지 되었습니다.");
        console.log("유저 정지 완료");
        setCurrentPage(1);
        await fetchData(1, searchQuery);
      } else {

        alert("유저 정지에 실패하였습니다.");
        console.log("유저 정지 실패");

      }
    }
  }

  

  const activeUser = async (e) => {//유저 상태 활성화

    const uid = e.target.dataset.user;

    if (window.confirm('유저를 활성화시키겠습니까?')) {

      const result = await userActive(uid);

      if (result) {

        alert("유저가 활성화 되었습니다.");
        console.log("유저 활성화 완료");
        setCurrentPage(1);
        await fetchData(1, searchQuery);

      } else {

        alert("유저 활성화에 실패하였습니다.");
        console.log("유저 활성화 실패");

      }
    }
  }

  const onChangeRole = async (e) => {

    const Role = e.target.value;
    const Uid = e.target.dataset.id;

    if (window.confirm('권한을 변경하시겠습니까?')) {

      console.log("Uid : ", Uid);

      formData.append("role", Role);
      formData.append("uid", Uid);

      console.log("Role", Role);

      setRole(Role);

      await postChangeRole(formData);

      alert('권한이 변경되었습니다.');
    }

  }

  const searchContent = (e) => {

    const { name, value } = e.target;
    setSearch(prevState => ({
      ...prevState,
      [name]: value
    }));

    console.log(search.keyword);
    console.log(search.searchCate);
  }

  const submitSearch = async () => {

    console.log("넘겨야하는 값1 : ", search.keyword);
    console.log("넘겨야하는 값2 : ", search.searchCate);


    setCurrentPage(1);
    setHasMore(true);
    setMemberList([]);

    const result = fetchData(currentPage,search.keyword,search.searchCate);

    console.log("검색 결과값 : ", result);

    setMemberList(result);
  }

  const excelDown = async () => {
    try {
      console.log('excelDown 호출');

      // 서버에서 직원 리스트 가져오기
      const res = await allUserList();
      const excelData = res;
      console.log(excelData);

      // Excel 파일 생성 및 다운로드
      const wb = XLSX.utils.book_new();
      const headerStyle = {
        font: { bold: true, color: { rgb: '000000' }, name: '함초롱바탕', sz: 13 },
        fill: { fgColor: { rgb: 'BC8F8F' } },
        alignment: { horizontal: 'center', vertical: 'center' },
        border: { left: { style: 'thin', color: { auto: 1 } }, right: { style: 'thin', color: { auto: 1 } }, top: { style: 'thin', color: { auto: 1 } }, bottom: { style: 'thin', color: { auto: 1 } } }
      };
      const dataStyle = {
        font: { color: { rgb: '000000' }, name: '함초롱바탕', sz: 11 },
        fill: { fgColor: { rgb: 'FFFAFA' } },
        alignment: { horizontal: 'center', vertical: 'center' },
        border: { left: { style: 'thin', color: { auto: 1 } }, right: { style: 'thin', color: { auto: 1 } }, top: { style: 'thin', color: { auto: 1 } }, bottom: { style: 'thin', color: { auto: 1 } } }
      };

      // 열의 폭을 정의
      const colWidths = [80, 120, 80, 80, 130];

      // cols 속성을 사용하여 각 열의 폭을 조절
      const cols = colWidths.map(width => ({ wpx: width }));

      const headerRow = [
        { v: '아이디', t: 's', s: headerStyle },
        { v: '이름', t: 's', s: headerStyle },
        { v: '닉네임', t: 's', s: headerStyle },
        { v: '성별', t: 's', s: headerStyle },
        { v: '이메일', t: 's', s: headerStyle },
        { v: '가입일', t: 's', s: headerStyle },
        { v: '방문횟수', t: 's', s: headerStyle },
        { v: '권한', t: 's', s: headerStyle },
        { v: '상태', t: 's', s: headerStyle },
      ];

      const dataRows = excelData.map(emp => [
        { v: emp.uid, t: 's', s: dataStyle },
        { v: emp.name, t: 's', s: dataStyle },
        { v: emp.nick, t: 's', s: dataStyle },
        { v: emp.gender, t: 's', s: dataStyle },
        { v: emp.email, t: 's', s: dataStyle },
        { v: emp.createDate, t: 's', s: dataStyle },
        { v: emp.visitCount, t: 's', s: dataStyle },
        { v: emp.role, t: 's', s: dataStyle },
        { v: emp.status, t: 's', s: dataStyle },
      ]);


      const rows = [headerRow, ...dataRows];

      // 새로운 Sheet 객체 생성
      const ws = XLSX.utils.aoa_to_sheet(rows);

      // cols 속성 적용
      ws['!cols'] = cols;

      // workbook에 추가
      XLSX.utils.book_append_sheet(wb, ws, '회원 목록');

      // 파일 다운로드
      XLSX.writeFile(wb, 'employee_list.xlsx');

      console.log('Excel 파일 생성 및 다운로드 완료');
    } catch (error) {
      console.error('Error occurred while downloading Excel', error);
    }

  };

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
        <SearchComponent searchContent={searchContent} submitSearch={submitSearch}/>
        <InfiniteScroll
          dataLength={memberList.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<ClipLoader
            color="#E50915"
            loading={loading}
            cssOverride={override}
            size={20}
          />}
          //endMessage={<p>end</p>}
        >
        <UserTable
            memberList={memberList}
            onChangeRole={onChangeRole}
            stopUser={stopUser}
            activeUser={activeUser}
            delUser={delUser}
          />
        </InfiniteScroll>
        {loading && <p>Loading...</p>}

        <button style={{ cursor: 'pointer' }} onClick={allUserDel} className='allDel'>전체삭제</button>
        <button style={{ cursor: 'pointer' }} onClick={excelDown} className='downExcell'>엑셀다운</button>

      </div>
    </div>

  )
}
export default UserListPage