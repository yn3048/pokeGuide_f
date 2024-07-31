import React, { useEffect, useRef, useState } from 'react'
import '../../styles/admin.scss';
import { getUserDel, postChangeRole, postUserList,deleteUser, userStop} from '../../api/AdminApi';
import XLSX from 'xlsx-js-style';


const UserListPage = () => {

  const [list, setList] = useState([]);
  const [role, setRole] = useState([]);
  const formData = new FormData();

  //무한스크롤 적용해보기

  const userList = async () => {

    const result = await postUserList();

    setList(result);

    console.log("뭐가 나오는지 찍어보자 : ", result);

  }

  useEffect(() => {

    userList();

  }, []);

  const allUserDel = async () => {//모든 유저 삭제

    if (window.confirm("정말 삭제하시겠습니까?")) {

      const result = await getUserDel();

      if (result) {
        alert("삭제되었습니다.");
        console.log("유저 모두 삭제 완료");
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

      } else {

        alert("삭제에 실패했습니다.");
        console.log("유저 삭제 실패");

      }

    }

  }

  const stopUser = async (e) => {//유저 상태 정지

    const uid = e.target.dataset.user;

    if (window.confirm('유저를 정지시키겠습니까?')) {

      alert("유저가 정지 되었습니다.");

      const result = await userStop(uid);

      if (result) {

        alert("삭제되었습니다.");
        console.log("유저 삭제 완료");

      } else {

        alert("삭제에 실패했습니다.");
        console.log("유저 삭제 실패");
        
      }
    }

  }

  const onChangeRole = async (e) => {

    const Role = e.target.value;
    const Uid = e.target.dataset.id;

    console.log("Uid : ", Uid);

    formData.append("role", Role);
    formData.append("uid", Uid);

    console.log("Role", Role);

    setRole(Role);

    await postChangeRole(formData);

  }

  const excelDown = async () => {
    try {
      console.log('excelDown 호출');

      // 서버에서 직원 리스트 가져오기
      const res = await postUserList();
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
            <div>상태</div>
            <div>관리</div>

          </div>

          <div className='content'>
            {list.map((item, index) => (
              <div key={index}>
                <div>{index + 1}</div>
                <div>{item.name}</div>
                <div>{item.nick}</div>
                <div>{item.gender}</div>
                <div>{item.email}</div>
                <div>{item.createDate}</div>
                <div>{item.visitCount}</div>
                <div>
                  <select name="userRole" data-id={item.uid} onChange={onChangeRole}>
                    <option value={item.role}>{item.role}</option>
                    {item.role === "USER" ? (<option value="ADMIN">ADMIN</option>) : (<option value="USER">USER</option>)}
                  </select>
                </div>
                <div>{item.status}</div>
                <div style={{ cursor: 'pointer' }}>
                  <a data-uid={item.uid} onClick={delUser}>삭제 / </a>
                  <a data-user={item.uid} onClick={stopUser}>정지</a>
                </div>
              </div>))}

          </div>

        </div>

        <button style={{ cursor: 'pointer' }} onClick={allUserDel} className='allDel'>전체삭제</button>
        <button style={{ cursor: 'pointer' }} onClick={excelDown} className='downExcell'>엑셀다운</button>

      </div>
    </div>

  )
}
export default UserListPage