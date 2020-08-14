import React, { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND } from '../config';


const mockAsyncAgeData = () => 
    new Promise(resolve => {
        setTimeout(async function() {
            const result = await axios.get(`${BACKEND}/agerange/`)
            resolve({
                data: result.data
            })
        }, 1000)
    })

export const useFetchAge = () => {
    // console.log("중복호출 막아야한다")
    // 일단 data에 feed만 담아서 해봅시당 
    // data는 object여야 함
    const [ageData, setAgeData] = useState(null)
    useEffect(() => {
        console.log("useFetchAge 호출")
        const getAgeDataAxios = async () => {
            try {
                const { data : fetchedData } = await mockAsyncAgeData();
                setAgeData(fetchedData);
                console.log("fetched age data", fetchedData)
            } catch (err) {
                console.error(err);
            }
        };
        
        getAgeDataAxios();
    
    }, [])
    
    return [ageData]
}