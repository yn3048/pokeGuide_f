import React, { useEffect, useState } from 'react';
import { RootUrl } from '../../api/RootUrl'; // ../../api 추가
import { TERMS_PATH } from '../../requestPath'; // ../../ 추가
import { selectTerms } from '../../api/UserApi'; // ../../ 추가

const Terms = () => {
    const [terms, setTerms] = useState({ terms: '', privacy: '', age: '' });

    useEffect(() => {
        selectTerms(TERMS_PATH, setTerms);
    }, []);

    return (
        <div>
            <h2>약관</h2>
            <div>{terms.terms}</div>
            <div>{terms.privacy}</div>
            <div>{terms.age}</div>
        </div>
    );
};

export default Terms;
