import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND } from '../config';


const mockAsyncMusicData = () => 
    new Promise(resolve => {
        setTimeout(async function() {
            const result = await axios.get(`${BACKEND}/music`)
            resolve({
                data: result.data
            })
        }, 150)
    })

export const useFetchMusic = () => {
    const [musicData, setMusicData] = useState(null)

    useEffect(() => {
        // if (musicData) {
        //     return;
        // }
        const getMusicDataAxios = async () => {
            try {
                const { data : fetchedData } = await mockAsyncMusicData();
                setMusicData(fetchedData);
                console.log("fetched Music data", fetchedData)
            } catch (err) {
                console.error(err);
            }
        };
        
        getMusicDataAxios();
    
    }, [])
    
    return [musicData]
}


// 추천 음악 데이터 가져오기

const mockAsyncRecomMusicData = () => 
    new Promise(resolve => {
        setTimeout(async function() {
            const result = await axios.get(`${BACKEND}/recommend-music`)
            // console.log("리졸브!") 여기에는 성능 issue X
            resolve({
                data: result.data
            })
        }, 150)
    })


export const useFetchRecomMusic = () => {
    const [recomMusicData, setRecomMusicData] = useState(null)

    useEffect(() => {
        const getRecomMusicDataAxios = async () => {
            try {
                const { data : fetchedData} = await mockAsyncRecomMusicData();
                setRecomMusicData(fetchedData);
            } catch (err) {
                console.log(err);
            }
        }
        getRecomMusicDataAxios();
    }, [])
    return [recomMusicData]
}