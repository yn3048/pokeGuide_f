import React from 'react'

export const UserTable = ({memberList,onChangeRole,stopUser,activeUser,delUser}) => {
  return (
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
              {memberList && memberList.map((user,index) => (
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
              ))}
            </tbody>
          </table>
  )
}
