import React, { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND } from '../config';

const mockAsyncMyPetData = (owner) => 
    new Promise(resolve => {
        setTimeout(async function() {
            const result = await axios.get(`${BACKEND}/mypet/${owner}`)
            resolve({
                data: result.data
            })
        }, 100)
    })

export const useFetchMyPet = (owner) => {
    const [myPetList, setMyPetList] = useState(null);
    useEffect(() => {
        const getMyPetDataAxios = async () => {
            try {
                const { data: fetchedData } = await mockAsyncMyPetData(owner);
                setMyPetList(fetchedData);
            } catch (err) {
                console.log(err);                
            }
        };
        
        getMyPetDataAxios();
    }, [])

    return myPetList
}