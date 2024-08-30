import React, { useEffect, useState } from 'react'
import '../../styles/community.scss';
import MDEditor from '@uiw/react-md-editor';
import { getContent } from '../../api/CommunityApi';


const ViewPage = () => {

    const [mkdStr, setMkdStr] = useState('');

    const params = new URLSearchParams(window.location.search);
    let ano = params.get("ano");

    useEffect(()=>{

        const mk = async ()=>{

            console.log("ano의 값을 찍어보자 : ",ano);//잘 찍힘

            const result = await getContent(ano);

            setMkdStr(result);
        }

        mk();

    },[])

    return (
        <div className="markdownDiv" data-color-mode="light" style={{ padding: 15 }}>
            <MDEditor.Markdown
                style={{ padding: 10 }}
                source={mkdStr}
            />
        </div>
    )
}

export default ViewPage