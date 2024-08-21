import React from 'react'
import DefaultLayout from '../../layouts/DefaultLayout'

const WritePage = () => {
    return (
        <DefaultLayout>            
            <div className='writeBg'>
            <p>글쓰기</p>
                <p>제목</p>
                <input placeholder='제목을 입력해주세요' />
                <textarea></textarea>
            </div>
        </DefaultLayout>
    )
}

export default WritePage