import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
   TERMS_PATH, SEND_EMAIL_CODE_PATH, CHECK_EMAIL_CODE_PATH, LOGIN_PATH,
    UPDATE_GRADE_PATH, UPDATE_USER_PATH, SEND_FINDID_EMAIL_CODE_PATH,
     FINDID_PATH, CHANGEPASS_PATH, CHECKPASS_PATH  } from '../requestPath';

// 약관 조회
export const selectTerms = async (TERMS_PATH, setTerms) => {
  try {
      const response = await axios.get(TERMS_PATH);
      const termsData = response.data[0];
      setTerms({ terms: termsData.terms, privacy: termsData.privacy, age: termsData.age });
  } catch (error) {
      console.error('에러 발생:', error);
  }
};

/* 회원가입 인증코드 전송 버튼 */
export const sendUserEmailCode = async (email, setServerCode, setShowVerification) => {
    try {
        const response = await axios.post(SEND_EMAIL_CODE_PATH, { email });
        if (response.data.result === 1) {
            console.log('코드전송 response.data:', response.data);
            alert('이메일이 중복되었습니다. 다른 이메일을 사용해주세요.');
            return;
        } else {
            alert('인증코드가 이메일로 전송되었습니다.');
            setServerCode(response.data.code); // 서버로부터 받은 암호화된 코드 저장
            setShowVerification(true);
        }
    } catch (err) {
        console.log('이메일 코드 전송 오류:', err);
        alert('이메일 코드 전송에 실패했습니다. 다시 시도해주세요.');
    }
};



/** 인증코드 확인 버튼 */
export const checkEmailCode = (serverCode, verificationCode) => {
     axios
        .post(CHECK_EMAIL_CODE_PATH, { code: serverCode, inputCode: verificationCode })
        .then((response) => {
            const data = response.data;
            console.log('코드확인 response.data:', response.data);
            console.log('코드확인 data:', data);
            if (data.result === 0) {
                alert('인증코드가 일치합니다.');
            } else {
                alert('인증코드가 일치하지 않습니다.');
            }
        })
        .catch((error) => {
            console.error('인증코드 확인에 실패하였습니다.', error);
        });
};

/* 모든 유효성 검사 통과하면 회원가입 */
export const registerUser = async (USER_PATH, user, navigate) => {
      await axios
          .post(USER_PATH, user)
          .then((response) => {
              console.log(response.data);
              alert('회원가입 완료!');
              navigate('/');
          })
          .catch((err) => {
              console.log(err);
          });
  };
/** 로그인 */
export const loginUser = (user, dispatch, navigate, loginAction) => {
  return axios.post(LOGIN_PATH, user)
      .then(response => {
          const data = response.data;
          console.log(data);
          // 리덕스 액션 실행 : 로그인 성공 시 사용자 정보를 리덕스 상태에 저장
          dispatch(loginAction(data));
          // 메인 전환
          navigate('/main');
          alert('로그인에 성공하셨습니다');
          return data;
      })
      .catch(error => {
          console.error('로그인에 실패하였습니다.', error);
          throw new Error('아이디 또는 비밀번호가 틀렸습니다. 다시 확인해주세요.');
      });
};

/** 사용자 정보 조회(회원수정) */
export const fetchUserData = (url, uid) => {
  return axios.get(`${url}/user/info?uid=${uid}`)
      .then(response => response.data)
      .catch(error => {
          console.error('사용자 정보 받기 에러:', error);
          throw error;
      });
};
/** 사용자 정보 업데이트 */
export const updateUser = (formData) => {
  return axios.patch(`${UPDATE_USER_PATH}`, formData, {
          headers: {
              'Content-Type': 'multipart/form-data',
          },
      })
      .then(response => response.data)
      .catch(error => {
          console.error('사용자 정보 업데이트 에러:', error);
          throw error;
      });
};
/** 아이디 찾기 인증코드 전송 */
export const requestFindIdCode = (email) => {
  return axios.post(SEND_FINDID_EMAIL_CODE_PATH, { email }, { withCredentials: true })
      .then(response => {
          if (response.status === 200) {
              return response.data.code;
          } else {
              throw new Error('전송 실패.');
          }
      })
      .catch(error => {
          console.error('인증코드 전송 실패:', error);
          throw new Error('이메일 주소가 틀렸습니다.');
      });
};

/** 이메일 중복 검사 및 인증코드 체크 */
export const confirmFindIdCode = (serverCode, verificationCode, name, email) => {
  return axios.post(CHECK_EMAIL_CODE_PATH, { code: serverCode, inputCode: verificationCode }, { withCredentials: true })
      .then(response => {
          if (response.status === 200) {
              const { result } = response.data;
              if (result === 0) {
                  return axios.get(`${FINDID_PATH}?name=${name}&email=${email}`, { withCredentials: true })
                      .then(userIdResponse => {
                          if (userIdResponse.status === 200) {
                              return userIdResponse.data.uid;
                          } else {
                              throw new Error('유저가 없습니다.');
                          }
                      });
              } else {
                  throw new Error('올바르지 않은 인증 코드입니다.');
              }
          } else {
              throw new Error('인증 실패. 서버 오류가 발생했습니다.');
          }
      })
      .catch(error => {
          console.error('인증 실패:', error);
          throw new Error('인증 실패. 네트워크 오류가 발생했습니다.');
      });
};
/** 비밀번호 찾기 이메일 인증코드 전송 */
export const requestPasswordResetCode = (email) => {
  return axios.post(SEND_FINDID_EMAIL_CODE_PATH, { email }, { withCredentials: true })
      .then(response => {
          if (response.status === 200) {
              return response.data.code; // Save the encrypted code from the server
          } else {
              throw new Error('전송 실패.');
          }
      })
      .catch(error => {
          console.error('인증코드 전송 실패:', error);
          throw new Error('이메일 주소가 틀렸습니다.');
      });
};

/** 비밀번호 찾기 이메일 중복 및 인증코드 확인 */
export const confirmPasswordResetCode = (serverCode, verificationCode, uid, email) => {
  return axios.post(CHECK_EMAIL_CODE_PATH, { code: serverCode, inputCode: verificationCode }, { withCredentials: true })
      .then(response => {
          if (response.data.result === 0) {
              return true;
          } else {
              throw new Error('인증 코드가 일치하지 않습니다.');
          }
      })
      .catch(error => {
          console.error('인증 코드 확인 중 오류가 발생했습니다:', error);
          throw new Error('인증 코드 확인 중 오류가 발생했습니다.');
      });
};

/** 비밀번호 수정 */
export const resetPassword = (uid, newPassword, email) => {
  return axios.get(`${CHANGEPASS_PATH}?uid=${uid}&pass=${newPassword}&email=${email}`, { withCredentials: true })
      .then(response => {
          if (response.status === 200) {
              return true;
          } else {
              throw new Error('비밀번호 변경에 실패했습니다.');
          }
      })
      .catch(error => {
          console.error('비밀번호 변경 중 오류가 발생했습니다:', error);
          throw new Error('비밀번호 변경 중 오류가 발생했습니다.');
      });
};

/** 비밀번호 확인 */
export const checkPassword = (url, user) => {
  return axios.post(CHECKPASS_PATH, user)
      .then(response => response.data)
      .catch(error => {
          console.error('비밀번호 확인 에러:', error);
          throw error;
      });
};
