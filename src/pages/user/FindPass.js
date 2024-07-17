import React, { useState } from 'react';
import { requestPasswordResetCode, confirmPasswordResetCode, resetPassword } from '../../api/UserApi'; // 경로는 실제 파일 경로에 맞게 수정하세요.
import { Link, useNavigate } from 'react-router-dom';

const FindPw = () => {
    const [uid, setUid] = useState('');
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [verificationSent, setVerificationSent] = useState(false);
    const [showVerificationCode, setShowVerificationCode] = useState(false);
    const [showPassChange, setShowPassChange] = useState(false);
    const [passwordResetSuccess, setPasswordResetSuccess] = useState(false);
    const navigate = useNavigate();
    const [serverCode, setServerCode] = useState('');

    // 비밀번호 찾기 이메일 인증코드 전송
    const handleRequestCode = () => {
        requestPasswordResetCode(email)
            .then(code => {
                setShowVerificationCode(true);
                setVerificationSent(true);
                setServerCode(code);
                alert('인증코드가 이메일로 전송되었습니다.');
            })
            .catch(error => {
                alert(error.message);
            });
    };

    // 비밀번호 찾기 이메일 중복 및 인증코드 확인
    const handleConfirmCode = () => {
        confirmPasswordResetCode(serverCode, verificationCode, uid, email)
            .then(() => {
                setShowPassChange(true);
                alert('인증 코드가 일치합니다.');
            })
            .catch(error => {
                alert(error.message);
            });
    };

    // 비밀번호 수정 로직
    const handleResetPassword = () => {
        if (newPassword !== confirmNewPassword) {
            alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
            return;
        }

        resetPassword(uid, newPassword, email)
            .then(() => {
                alert('비밀번호가 성공적으로 변경되었습니다.');
                setPasswordResetSuccess(true);
                navigate('/');
            })
            .catch(error => {
                alert(error.message);
            });
    };

    return (
        <div className="find-pw-container">
            <div className="find-pw-update-container">
                <div className="find-pw-update-form">
                    <h3 className="find-pw-title">비밀번호 찾기</h3>
                    <form id="find-pw-form">
                        <div className="input-container">
                            <label htmlFor="userId">아이디</label>
                            <input
                                type="text"
                                id="userId"
                                name="userId"
                                placeholder="아이디 입력"
                                required
                                value={uid}
                                onChange={(e) => setUid(e.target.value)}
                            />
                        </div>
                        <div className="input-container">
                            <label htmlFor="email">이메일</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="이메일 입력"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button type="button" id="request-code-button" onClick={handleRequestCode}>
                                인증코드 요청
                            </button>
                        </div>
                        <div id="verification-code-section" className={showVerificationCode ? 'show' : ''}>
                            <label htmlFor="verification-code">인증코드</label>
                            <input
                                type="text"
                                id="verification-code"
                                name="verification-code"
                                placeholder="인증코드 입력"
                                required
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                            />
                            <button type="button" id="confirm-code-button" onClick={handleConfirmCode}>
                                확인
                            </button>
                        </div>
                        {showPassChange && (
                            <div className="changePass">
                                <div className="pass1">
                                    <label htmlFor="newPassword">새로운 비밀번호</label>
                                    <input
                                        type="password"
                                        id="newPassword"
                                        name="newPassword"
                                        placeholder="비밀번호 입력"
                                        required
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                                <div className="pass2">
                                    <label htmlFor="confirmNewPassword">새로운 비밀번호 확인</label>
                                    <input
                                        type="password"
                                        id="confirmNewPassword"
                                        name="confirmNewPassword"
                                        placeholder="비밀번호 확인"
                                        required
                                        value={confirmNewPassword}
                                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                                    />
                                    <button type="button" id="reset-password-button" onClick={handleResetPassword}>
                                        비밀번호 재설정
                                    </button>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FindPw;