import React from 'react'

const WritePage = () => {
    return (
        <div className='write'>
            <p>글쓰기</p>
            <div className='title'>
                <p>제목<input placeholder='제목을 입력해주세요' /></p>
            </div>
            <div className='contents'>
                <p>내용</p>
                <textarea></textarea>
            </div>
        </div>


    )
}

export default WritePage