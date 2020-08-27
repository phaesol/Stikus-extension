import React, { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND } from '../config';

// 일단 post요청으로 데이터 저장되는지 보자

const mockAsyncMyPetData = (owner) => 
    new Promise(resolve => {
        setTimeout(async function() {
            const result = await axios.get(`${BACKEND}/mypet/${owner}`)
            resolve({
                data: result.data
            })
        }, 100)
    })



const tempMyPetData = [
    {
        "owner": "1",
        "name": "name1",
    },
    {
        "owner": "2",
        "name": "name2",
    }
]

export const useFetchMyPet = (owner) => {
    const [myPetList, setMyPetList] = useState(null);
    useEffect(() => {
        const getMyPetDataAxios = async () => {
            try {
                const { data: fetchedData } = await mockAsyncMyPetData(owner);
                setMyPetList(fetchedData);
                console.log("fetchedData: ",fetchedData);
            } catch (err) {
                console.log(err);                
            }
        };

        getMyPetDataAxios();
    }, [])

    useEffect(() => {
        console.log("myPetList: ", myPetList)
    }, [myPetList])
        // getFeedAxios();
    //     getNutrientAxios();
    
    // }, [])
   
    // return [feed, nutrient]
    return myPetList
}