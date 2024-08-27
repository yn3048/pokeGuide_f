import React, { useState } from 'react'
import MDEditor from '@uiw/react-md-editor';
import { useNavigate } from 'react-router-dom';

const WritePage = () => {

    const [mdinfo, setMdinfo] = useState('');
    const [title,setTitle] = useState('');

    const navigate = useNavigate();


    const setMD = (value) => {

        setMdinfo(value);//글 내용들

    }


    const saveTitle = (e) => {

        setTitle(e.target.value);//제목 
        console.log("제목을 출력해보자 : ",e.target.value);

    }

    const register = () =>{



        alert("글이 정상적으로 등록되었습니다.");
        navigate(`/community`);

    }

    const beforePage=()=>{

        navigate(`/community`);//커뮤니티 리스트로 이동

    }

    return (
        <div className='write'>
            <p>글쓰기</p>

            <div className='title'>
                <span>제목<input value={title} onChange={saveTitle} placeholder='제목을 입력해주세요' /></span><p>최대40자</p>
            </div>

            <div className="markarea">
                <div data-color-mode="light">
                    <MDEditor height={565} value={mdinfo} onChange={setMD} />
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