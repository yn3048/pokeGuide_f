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

        const fetchData = async () => {

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

                    const koreanName = speciesResponse.data.names.find(name => name.language.name === 'ko');

                    console.log("결과값 3 : ", koreanName);

                    allPokeData.push({ ...response.data, koreanName: koreanName.name });
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
                        <p>{pokemon.koreanName}</p>
                        <p>ID : {pokemon.id}</p>
                    </div>
                ))
                }
            </InfiniteScroll>
            {loading && <p>loading....</p>}
        </div>
    )
}
