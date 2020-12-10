import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND } from '../config';

const mockAsyncMyPetData = (owner) => 
    new Promise(resolve => {
        setTimeout(async function() {
            const result = await axios.get(`${BACKEND}/mypet/${owner}`)
            resolve({
                data: result.data
            })
        }, 500)
    })

export const useFetchMyPet = (owner) => {
    const [myPetList, setMyPetList] = useState("no-owner");
    console.log("자 일단 왔고", owner === "" || owner === null)
    useEffect(() => {
        if (owner === "" || owner === undefined) {
            console.log("눌눌눌!")
            return myPetList
        }
        const getMyPetDataAxios = async () => {
            try {
                const { data: fetchedData } = await mockAsyncMyPetData(owner);
                // console.log("야야양야야")
                setMyPetList(fetchedData);
            } catch (err) {
                console.log(err);                
            }
        };
        
        getMyPetDataAxios();
    }, [owner])

    return myPetList
}