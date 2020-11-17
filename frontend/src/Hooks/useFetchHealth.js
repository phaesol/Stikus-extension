import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND } from '../config';


const mockAsyncHealthData = (pet) => 
    new Promise(resolve => {
        setTimeout(async function() {
            const result = await axios.get(`${BACKEND}/mypet-health/${pet}`)
            resolve({
                data: result.data
            })
        }, 250)
    })

export const useFetchHealth = (pet) => {
    const [healthData, setHealthData] = useState(null)

    useEffect(() => {
        const getHealthDataAxios = async () => {
            try {
                const { data : fetchedData } = await mockAsyncHealthData(pet);
                const reFactData = []     
                for (var key in fetchedData) {
                    let typeOfValue = "양호"
                    if (fetchedData[key] > 12) {
                        typeOfValue = "주의"
                    }
                    const copy = {}
                    copy['item'] = key;
                    copy[typeOfValue] = fetchedData[key]
                    reFactData.push(copy)
                }
                setHealthData(reFactData);

            } catch (err) {
                console.error(err);
            }
        };
        
        getHealthDataAxios();
    
    }, [])
    
    return [healthData]
}

