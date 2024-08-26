import axios from 'axios';
import React, { useEffect, useState } from 'react'
import '../../styles/poke.scss';
import InfiniteScroll from 'react-infinite-scroll-component';

export const PokeComponents = () => {

    const [pokeData, setPokeData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const pokePerPage = 56;


    useEffect(() => {

        const fetchData = async () => {//db에서 pokemon데이터를 불러와서 있으면 db에서 불러온거 뿌려주고, 없으면 api로 뿌려주는 동시에 db에 저장

            const allPokeData = [];

            for (let i = 1; i <= currentPage * pokePerPage; i++) {

                if (i === 152) {
                    setHasMore(false);
                    break;
                } else {

                    setLoading(false);
                    setHasMore(true);

                    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);

                    console.log("결과값 1 : ", response);

                    const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${i}`);

                    console.log("결과값 2 : ", speciesResponse);
                    console.log("여기는 뭐가 들어와?", speciesResponse.data);


                    const typesWithKoreanNames = await Promise.all(
                        response.data.types.map(async (type) => {
                            const typeResponse = await axios.get(type.type.url);
                            const koreanTypeName = typeResponse.data.names.find(
                                (name) => name.language.name === 'ko'
                            ).name;
                            return { ...type, type: { ...type.type, korean_name: koreanTypeName } };
                        })
                    );

                    console.log("포켓몬 타입 추출 ", typesWithKoreanNames);


                    const koreanName = speciesResponse.data.names.find(name => name.language.name === 'ko');
                    const koreaAblity = speciesResponse.data.genera.find(ab => ab.language.name === 'ko');

                    console.log("이거 뽑혀?", koreaAblity.genus);

                    console.log("결과값 3 : ", koreanName);

                    allPokeData.push({ ...response.data, koreanName: koreanName.name, koreanablity: koreaAblity.genus, types: typesWithKoreanNames });
                }

            }

            setPokeData(allPokeData);

        }

        fetchData();

    }, [currentPage]);

    const fetchMoreData = () => {

        if (!loading && hasMore) {

            console.log("인피니티 스크롤 작동!");
            setCurrentPage((prevPage) => prevPage + 1);

        } else {

            console.log("더이상 불러올 페이지가 없습니다.");

        }
    }

    return (
        <div>
            <InfiniteScroll
                dataLength={pokeData.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<p>loading.....</p>}
            >

                {pokeData.map((pokemon) => (
                    <div key={pokemon.id} className='pokeList'>
                        <img src={pokemon.sprites.front_default} alt={pokemon.koreanName} />
                        <p>1 : {pokemon.koreanName}</p>
                        <p>2 : {pokemon.koreanablity}</p>
                        <p>ID : {pokemon.id}</p>
                    </div>
                ))
                }

            </InfiniteScroll>

            {loading && <p>loading....</p>}
        </div>
    )
}
