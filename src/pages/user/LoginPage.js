import React, { useState } from 'react'
import '../../styles/login.scss';

const LoginPage = () => {
    const [uid, setUid] = useState('');
    const [password, setPassword] = useState('');
    const [Submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        if(uid && password){
            console.log('Try Login : ', {uid, password});
        }
    };

  return (
    <div className="top">
            <section className="sub-login bg-light">
                <div className="container-xm text-center">
                    <img className="sub-logo mb-2" src="/images/pokemon logo.png" alt="" width="200" />
                    <div className="container-login">
                        <form className="needs-validation" noValidate onSubmit={handleSubmit} id="member-form">
                            <input type="hidden" name="md5_PW" />{/*사용자의 비밀번호를 MD5 해시로 변환한 값을 저장 */}
                            <input type="hidden" name="RefferURL" value="" />
                            <input type="hidden" name="key" value="" />
                            <input type="hidden" name="SiteFlag" value="" />
                            <div className="form-wrp">
                                <label htmlFor="uid" className="sr-only"></label>
                                <input 
                                    type="text" 
                                    className={`form-control ${Submitted && !uid ? 'is-invalid' : ''}`} 
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
                                    className={`form-control ${Submitted && !password ? 'is-invalid' : ''}`} 
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
                        </form>
                        <ul className="list-split">
                            <li><a href="/member/forgotid">아이디 찾기</a></li>
                            <li><a href="/member/password">비밀번호 변경</a></li>
                        </ul>
                        <a href="/member/apply" className="btn btn-round btn-sm btn-wh">아직 회원이 아니신가요? <i className="icon-go"></i></a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LoginPage