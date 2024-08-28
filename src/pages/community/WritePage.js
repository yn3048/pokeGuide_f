import React, { useEffect, useState } from 'react'
import MDEditor from '@uiw/react-md-editor';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../../util/cookieUtil';
import { ArticleReg } from '../../api/CommunityApi';


const WritePage = () => {
    const [article, setArticle] = useState({
        title: '',
        contents: '',
        uid: '',

    })

    const auth = getCookie("auth");

    const navigate = useNavigate();

    useEffect(() => {

        setArticle({ ...article, uid: auth.uid });

        console.log('유저의 아이디 출력 : ', article.uid);

    })

    const setMD = (value) => {//글 내용

        setArticle({ ...article, contents: value });

        console.log("내용을 출력해보자 : ", value);

    }


    const saveTitle = (e) => {

        setArticle({ ...article, [e.target.name]: e.target.value });//제목 

        console.log("제목을 출력해보자 : ", e.target.value);


    }

    const register = async () => {

        const result = await ArticleReg(article);

        if (result) {
            alert("글이 정상적으로 등록되었습니다.");
            navigate(`/community`);

        }else{
            alert("글 등록에 실패하였습니다.");
        }

    }

    const beforePage = () => {

        navigate(`/community`);//커뮤니티 리스트로 이동

    }

    return (
        <div className='write'>
            <p>글쓰기</p>

            <div className='title'>
                <span>제목<input name="title" value={article.title} onChange={saveTitle} placeholder='제목을 입력해주세요' /></span><p>최대40자</p>
            </div>

            <div className="markarea">
                <div data-color-mode="light">
                    <MDEditor height={565} value={article.contents} onChange={setMD} />
                </div>
            </div>
            <div className='btns'>
                <button className='submit' onClick={register}>등록</button>
                <button className='cancel' onClick={beforePage}>취소</button>
            </div>
        </div>


    )
}

export default WritePage