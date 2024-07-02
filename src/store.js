//리덕스는 상태 관리를 효율적 으로 할 수 있도록 도와주는 도구
//리덕스를 사용하면 상태값을 컴포넌트에 종속시키지 않고, 상태관리를 바깥에서 할 수 있게 해줍니다(props 사용안해도 됨)
//store는 state 관리자
//애플리케이션당 하나의 store만 사용하기
//중간자 역할

import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: { }
})