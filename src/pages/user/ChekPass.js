import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { RootUrl } from 'RootUrl';
import { checkPassword } from '../../api/UserApi';


const CheckPass = () => {
    const authSlice = useSelector((state) => state.authSlice);
    const navigate = useNavigate();

    // user 상태 설정
    const [user, setUser] = useState({
        uid: '',
        pass: '',
    });

    // 비밀번호 확인 핸들러
    const submitHandler = (e) => {
        e.preventDefault();
        checkPassword(RootUrl, user)
            .then(data => {
                console.log(data);
                if (data > 0) {
                    alert('비밀번호 일치');
                    navigate(`/user/profile?uid=${authSlice.uid}`, { state: { user: data } });
                } else {
                    alert('비밀번호 불일치');
                }
            })
            .catch(err => {
                console.log('에러:', err);
            });
    };

    /** 계정 설정 - 사용자 정보 넘겨줌 */
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${RootUrl}/user/info?uid=${authSlice.uid}`);
                setUser({ ...user, uid: response.data.uid });
                console.log('check:', response.data);
            } catch (error) {
                console.error('사용자 정보 받기 에러:', error);
            }
        };

        if (authSlice.uid) {
            fetchUserData();
        }
    }, [RootUrl]);

    // 정보 변경 핸들러
    const changeHandler = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    const cancelHandler = () => {
        navigate(-1);
    };

    return (
        <div className="check-pass-container">
            <div className="check-pass-update-container">
                <div className="check-pass-update-form">
                    <h3 className="check-pass-title">회원 정보 확인</h3>
                    <form onSubmit={submitHandler}>
                        <div className="user-id-display">
                            <label>사용자 아이디 : </label>
                            <span>{user.uid}</span>
                        </div>
                        <label htmlFor="pass">비밀번호 확인 : </label>
                        <input
                            type="password"
                            name="pass"
                            placeholder="비밀번호를 입력하세요."
                            onChange={changeHandler}
                            value={user.pass}
                        />
                        <div className="sumbitButton">
                            <button type="submit">확인</button>
                            <button type="button" className="cancel-button" onClick={cancelHandler}>
                                취소
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CheckPass;