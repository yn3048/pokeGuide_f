import { createSlice } from "@reduxjs/toolkit";
import { getCookie, setCookie, removeCookie } from "../util/cookieUtil";

const loadStateFromCookie = () => {
  const auth = getCookie("auth");

  const uid = auth?.uid;
  const name = auth?.name;
  const email = auth?.email;
  const gender = auth?.gender;
  const role = auth?.role;
  const nick = auth?.nick;
  const address = auth?.address;
  const profile = auth?.profile;
  const accessToken = auth?.accessToken;

  // 리턴에 값을 넣어줘야 초기화가 된 후에도 값이 유지가 됨 //
  return {
    uid,
    accessToken,
    name,
    email,
    gender,
    role,
    nick,
    address,
    profile,
  };
};

const initState = {
  uid: "",
  accessToken: "",
};

const authSlice = createSlice({
  name: "authSlice",
  initialState: loadStateFromCookie() || initState, // 쿠키 확인 후 초기화
  reducers: {
    /** dispatch(login(resp.data)); 이런 식으로 사용 */
    login: (state, action) => {
      // payload : JWT 의 내용
      const data = action.payload;

      // 리덕스 저장소 상태 업데이터(Username과 accessToken)
      state.uid = data.uid;
      state.name = data.name;
      state.email = data.email;
      state.role = data.role;
      state.gender = data.gender;
      state.nick = data.nick;
      state.profile = data.profile;
      state.address = data.address;
      state.accessToken = data.accessToken;

      // 쿠키저장 (쿠키이름, 값, 유효기간)
      setCookie("auth", data, 1);
    },
    logout: (state) => {
      removeCookie("auth");
      // initState를 초기화
      return { ...initState };
    },
    updateUserProfile: (state, action) => {
      // 프로필 정보 업데이트 액션
      const updateData = action.payload;

      state.uid = updateData.uid; 
      state.nick = updateData.nick;
      state.profile = updateData.profile;
      state.email = updateData.email;
      state.role = updateData.role;
      state.position = updateData.gender;
      state.accessToken = updateData.accessToken;

      // 쿠키저장
      setCookie("auth", updateData, 1);
    },
  },
});

export const { login, logout, updateUserProfile } = authSlice.actions;
export default authSlice.reducer;