import React, { useState } from 'react';
import '../../styles/login.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { RootUrl } from '../../api/RootUrl';

const LoginPage = () => {
    const [uid, setUid] = useState('');
    const [password, setPassword] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        if (uid && password) {
            try {
                const response = await axios.post(`${RootUrl}/user/login`, { uid, password });
                const { accessToken, refreshToken } = response.data;

                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);

                navigate('/main');
            } catch (error) {
                console.error('Login failed', error);
                setError('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.');
            }
        }
    };

    return (
        <div className="top">
            <section className="sub-login bg-light">
                <div className="container-xm text-center">
                    <img className="sub-logo mb-2" src="/images/pokemon logo.png" alt="" width="200" />
                    <div className="container-login">
                        <form className="needs-validation" noValidate onSubmit={handleSubmit} id="member-form">
                            <input type="hidden" name="md5_PW" />
                            <input type="hidden" name="RefferURL" value="" />
                            <input type="hidden" name="key" value="" />
                            <input type="hidden" name="SiteFlag" value="" />
                            <div className="form-wrp">
                                <label htmlFor="uid" className="sr-only"></label>
                                <input 
                                    type="text" 
                                    className={`form-control ${submitted && !uid ? 'is-invalid' : ''}`} 
                                    name="uid" 
                                    id="uid" 
                                    placeholder="아이디" 
                                    value={uid} 
                                    onChange={(e) => setUid(e.target.value)} 
                                    required 
                                    aria-required="true" 
                                />
                                <div className="invalid-feedback text-left">아이디를 입력해주세요.</div>
                            </div>
                            <div className="form-wrp">
                                <label htmlFor="password" className="sr-only"></label>
                                <input 
                                    type="password" 
                                    className={`form-control ${submitted && !password ? 'is-invalid' : ''}`} 
                                    name="password" 
                                    id="password" 
                                    placeholder="비밀번호" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    required 
                                    aria-required="true" 
                                />
                                <div className="invalid-feedback text-left">비밀번호를 입력해주세요.</div>
                            </div>
                            <button type="submit" id="login_btn" className="btn btn-dark btn-skew no-icon">
                                <p>로그인</p>
                            </button>
                            {error && <div className="text-danger mt-2">{error}</div>}
                        </form>
                        <ul className="list-split">
                            <li><a href="/user/FindId">아이디 찾기</a></li>
                            <li><a href="/user/FindPass">비밀번호 변경</a></li>
                        </ul>
                        <a href="/user/Terms" className="btn btn-round btn-sm btn-wh">아직 회원이 아니신가요? <i className="icon-go"></i></a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LoginPage;
