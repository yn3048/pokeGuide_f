import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CHECK_EMAIL_CODE_PATH, SEND_EMAIL_CODE_PATH, USER_PATH } from '../../requestPath';
import { registerUser, sendUserEmailCode, checkEmailCode } from '../../api/UserApi'; // 경로 수정

const Register = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        uid: '',
        pass: '',
        pass2: '',
        name: '',
        email: '',
        role: 'USER',
        grade: 'FREE',
        verificationCode: '',
    });
    const [errors, setErrors] = useState({
        uid: '',
        pass: '',
        pass2: '',
        name: '',
        email: '',
        verificationCode: '',
    });

    const [passwordType, setPasswordType] = useState('password');
    const [passwordButtonIcon, setPasswordButtonIcon] = useState('eye-light-off-icon');
    const [confirmPasswordType, setConfirmPasswordType] = useState('password');
    const [confirmPasswordButtonIcon, setConfirmPasswordButtonIcon] = useState('eye-light-off-icon');

    const [showVerification, setShowVerification] = useState(false);
    const [serverCode, setServerCode] = useState(''); // 서버로부터 받은 인증코드 저장
    const [emailOk, setEmailOk] = useState(false); // 이메일 인증 상태

    // 비밀번호 숨기기
    const togglePasswordVisibility = () => {
        setPasswordType(passwordType === 'password' ? 'text' : 'password');
        setPasswordButtonIcon(passwordType === 'password' ? 'eye-light-on-icon' : 'eye-light-off-icon');
    };
    // 비밀번호 숨기기
    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordType(confirmPasswordType === 'password' ? 'text' : 'password');
        setConfirmPasswordButtonIcon(confirmPasswordType === 'password' ? 'eye-light-on-icon' : 'eye-light-off-icon');
    };

    /** 포커스 아웃되면 유효성 검사 */
    const handleBlur = (e) => {
        const { name, value } = e.target;
        let errorMessage = '';
        switch (name) {
            case 'uid':
                const uidPattern = /^[a-zA-Z0-9_]{4,20}$/;
                errorMessage = !uidPattern.test(value)
                    ? '아이디는 영문자와 숫자로 4자 이상, 20자 이하여야 합니다.'
                    : '';
                break;
            case 'pass':
                const passPattern = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
                errorMessage = !passPattern.test(value)
                    ? '비밀번호는 영문자와 특수문자와 숫자를 포함하여 8자 이상이어야 합니다.'
                    : '';
                break;
            case 'pass2':
                errorMessage = user.pass !== value ? '비밀번호와 비밀번호 확인이 일치하지 않습니다.' : '';
                break;
            case 'name':
                const namePattern = /^(?=.*[가-힣])[가-힣]{2,}$/;
                errorMessage = !namePattern.test(value) ? '이름은 2글자 이상 입력하셔야 합니다. ' : '';
                break;
            case 'email':
                const emailPattern =
                    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
                errorMessage = !emailPattern.test(value) ? '올바른 이메일 주소를 입력해주세요.' : '';
                break;
            default:
                break;
        }
        setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
    };

    /** 가입하기 버튼 */
    const submitHandler = (e) => {
        e.preventDefault();
        for (const key in user) {
            if (user[key] === '') {
                alert('모든 필드를 입력해주세요.');
                return;
            }
        }
        for (const error in errors) {
            if (errors[error]) {
                alert('양식을 올바르게 작성해주세요.');
                return;
            }
        }
        if (emailOk) {
            registerUser(USER_PATH, user, navigate);
        } else {
            alert('이메일을 확인해주세요.');
        }
    };
    // value change 핸들러
    const changeHandler = (e) => {
        e.preventDefault();
        setUser({ ...user, [e.target.name]: e.target.value });

        setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: '' }));
    };
    /** 인증코드 전송 버튼 */
    const sendUserEmailCodeHandler = () => {
        sendUserEmailCode(user.email, setServerCode, setShowVerification);
    }
    /** 인증코드 확인 버튼 */
    const checkEmailCodeHandler = () => {
        checkEmailCode(serverCode, user.verificationCode);
        setEmailOk(true);
    }
    
    return (
        <>
            <div className="container">
                <div className="signup-container">
                    <div className="signup-Form">
                        <form onSubmit={submitHandler}>
                            <label htmlFor="uid">아이디</label>
                            <input
                                type="text"
                                name="uid"
                                placeholder="아이디를 입력하세요."
                                onBlur={handleBlur}
                                onChange={changeHandler}
                                value={user.uid}
                            />
                            <span className="error-message">{errors.uid}</span>
                            <label htmlFor="password">비밀번호</label>
                            <div className="password-container">
                                <input
                                    type={passwordType}
                                    name="pass"
                                    placeholder="비밀번호를 입력하세요."
                                    onBlur={handleBlur}
                                    onChange={changeHandler}
                                    value={user.pass}
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className={`password-toggle-button ${passwordButtonIcon}`}
                                >
                                    {passwordType === 'password' ? 'Show' : 'Hide'}
                                </button>
                            </div>
                            <span className="error-message">{errors.pass}</span>
                            <label htmlFor="confirm-password">비밀번호 확인</label>
                            <div className="password-container">
                                <input
                                    type={confirmPasswordType}
                                    name="pass2"
                                    placeholder="동일한 비밀번호를 입력하세요."
                                    onBlur={handleBlur}
                                    onChange={changeHandler}
                                    value={user.pass2}
                                />
                                <button
                                    type="button"
                                    onClick={toggleConfirmPasswordVisibility}
                                    className={`password-toggle-button ${confirmPasswordButtonIcon}`}
                                >
                                    {confirmPasswordType === 'password' ? 'Show' : 'Hide'}
                                </button>
                            </div>
                            <span className="error-message">{errors.pass2}</span>
                            <label htmlFor="name">이름</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="이름을 입력하세요."
                                onBlur={handleBlur}
                                onChange={changeHandler}
                                value={user.name}
                            />
                            <span className="error-message">{errors.name}</span>
                            <label htmlFor="email">이메일</label>
                            <div className="email-input-container">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="이메일을 입력하세요."
                                    onBlur={handleBlur}
                                    onChange={changeHandler}
                                    value={user.email}
                                />

                                <button className="email-verify" type="button" onClick={sendUserEmailCodeHandler}>
                                    이메일 인증
                                </button>
                            </div>
                            <span className="error-message">{errors.email}</span>

                            {showVerification && (
                                <div className="verification-code-container">
                                    <input
                                        type="text"
                                        name="verificationCode"
                                        placeholder="인증코드를 입력하세요."
                                        onBlur={handleBlur}
                                        onChange={changeHandler}
                                        value={user.verificationCode}
                                    />
                                    <button className="email-verify" type="button" onClick={checkEmailCodeHandler}>
                                        인증코드 확인
                                    </button>
                                </div>
                            )}
                            <button type="submit">회원가입</button>
                        </form>
                        <div className="signup-options">
                            <div className="signup-buttons">
                                <button className="kakao-signup"></button>
                                <button className="google-signup"></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Register;
