import React, { useEffect, useState } from 'react';
import { RootUrl } from '../../api/RootUrl';
import axios from 'axios';
import '../../styles/Terms.scss';
import { useNavigate } from 'react-router-dom';

const Terms = () => {
  const navigate = useNavigate();

  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);
  const [isSmsChecked, setIsSmsChecked] = useState(false);
  const [termsContent, setTermsContent] = useState("");
  const [privacyContent, setPrivacyContent] = useState("");
  const [smsContent, setSmsContent] = useState("");
  const [expanded, setExpanded] = useState({
    terms: false,
    privacy: false,
    sms: false
  });

  useEffect(() => {
    axios.get(RootUrl + "/user/Terms").then((response) => {
      console.log(response.data);
      if (response.data && response.data.length > 0) {
        const data = response.data[0];
        setTermsContent(data.terms);
        setPrivacyContent(data.privacy);
        setSmsContent(data.sms);
      }
    });
  }, []);

  const handleTermsCheckboxChange = (e) => {
    setIsTermsChecked(e.target.checked);
  };

  const handlePrivacyCheckboxChange = (e) => {
    setIsPrivacyChecked(e.target.checked);
  };

  const handleSmsCheckboxChange = (e) => {
    setIsSmsChecked(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isTermsChecked && isPrivacyChecked) {
      alert("약관에 동의하셨습니다.");
      navigate("/user/Register");
    } else {
      alert("필수 약관에 동의하셔야 합니다.");
    }
  };

  const toggleExpand = (section) => {
    setExpanded({ ...expanded, [section]: !expanded[section] });
  };

  return (
    <div className="Terms">
      <h2>약관동의</h2>
      <form onSubmit={handleSubmit}>
        <div className="checkbox-all">
          <input
            type="checkbox"
            checked={isTermsChecked && isPrivacyChecked && isSmsChecked}
            onChange={(e) => {
              const checked = e.target.checked;
              setIsTermsChecked(checked);
              setIsPrivacyChecked(checked);
              setIsSmsChecked(checked);
            }}
          />
          <label>전체 약관에 동의합니다.</label>
        </div>
        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={isTermsChecked}
              onChange={handleTermsCheckboxChange}
            />
            이용약관에 동의합니다.
            <button type="button" onClick={() => toggleExpand('terms')}>▼</button>
          </label>
          <div className={`content ${expanded.terms ? 'expanded' : ''}`}>
            <textarea readOnly value={termsContent}></textarea>
          </div>
        </div>
        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={isPrivacyChecked}
              onChange={handlePrivacyCheckboxChange}
            />
            개인정보 처리방침에 동의합니다.
            <button type="button" onClick={() => toggleExpand('privacy')}>▼</button>
          </label>
          <div className={`content ${expanded.privacy ? 'expanded' : ''}`}>
            <textarea readOnly value={privacyContent}></textarea>
          </div>
        </div>
        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={isSmsChecked}
              onChange={handleSmsCheckboxChange}
            />
            광고성 정보 전송에 대해 동의합니다. (선택)
            <button type="button" onClick={() => toggleExpand('sms')}>▼</button>
          </label>
          <div className={`content ${expanded.sms ? 'expanded' : ''}`}>
            <textarea readOnly value={smsContent}></textarea>
          </div>
        </div>
        <button type="submit" className="submit-btn">다음 단계로</button>
      </form>
    </div>
  );
};

export default Terms;
