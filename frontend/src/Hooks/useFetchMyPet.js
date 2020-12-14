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
        }, 400)
    })

export const useFetchMyPet = (owner) => {

    // const [firstRequest, setFirstRequest] = useState(0);
    // console.log("owner들!!!!!!!!!", owner)
    const [myPetList, setMyPetList] = useState([]);
    // console.log("자 일단 왔고", owner === "" || owner === null)
    const returnPetListNoOwner = () => {
        console.log("asdkjaslkdjaslasd")
    }
    useEffect(() => {
        const getMyPetDataAxios = async () => {
            try {
                const { data: fetchedData } = await mockAsyncMyPetData(owner);
                // console.log("야야양야야")
                setMyPetList(fetchedData);
            } catch (err) {
                console.log(err);      
        
            }
        };

        if (owner === "" || owner === undefined) {
            // alert("?!")
            returnPetListNoOwner()
        } else {
            getMyPetDataAxios();
        }
        
        
    }, [])
    // console.log("%$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
    return myPetList
}