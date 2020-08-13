import React, { useEffect, useState } from "react";
import { useFetchAge } from "../../Hooks/useFetchAge";
// import NoviGraph from "../NutrientFit/Novi";
import NoviGraph from "../Useful/Novi";
import styled from 'styled-components';

function AgeFit ({ status }) {
    const [ageData] = useFetchAge();
    const { owner, pet_name, age1, age2 } = status;

    // 그래프 그릴 때 사용하는 state
    const initialDataState = [
        {
            "item": "피부",
        },
        {
            "item": "관절",
        },
        {
            "item": "눈",
        },
        {
            "item": "심장",
        },
        {
            "item": "신장",
        },
        {
            "item": "방광",
        },
        {
            "item": "치아",
        },
        {
            "item": "간",
        },
        {
            "item": "췌장염",
        },
        {
            "item": "종양",
        },
        {
            "item": "비타민결핍",
        },
        {
            "item": "칼슘결핍",
        },
        {
            "item": "면역력결핍",
        },
        {
            "item": "장건강",
        },
        {
            "item": "비만",
        },
        {
            "item": "호흡기",
        }
    ]
    const [data, setData] = useState(initialDataState)
    const [keys, setKeys] = useState([]);

    useEffect(() => {
        // 디버깅용
        if (ageData) {
            console.log("AgeFit mount!")
            console.log(ageData)
        }
    }, [ageData])

    const filterData = (id) => {
        return ageData.filter(object => {
            return object['id'] === parseInt(id)
        })
      }


    const useHandleAgeData = (event) => {
        const { id } = event.target;
        const targetAgeData = filterData(id)
        console.log(targetAgeData)
        // 넣을껀 target id를 가진 하나의 것이다.
        const {
            name,
            desc,
            min_age,
            mx_age, 
            a,
            b,
            c,
            d,
            e,
            f,
            g,
            h,
            i,
            j,
            k,
            m,
            l,
            n,
            o,
            p
        } = targetAgeData[0];
        
        let tempData = data;
        console.log(tempData)
        tempData[0][name] = parseFloat(a)
        tempData[1][name] = parseFloat(b)
        tempData[2][name] = parseFloat(c)
        tempData[3][name] = parseFloat(d)
        tempData[4][name] = parseFloat(e)
        tempData[5][name] = parseFloat(f)
        tempData[6][name] = parseFloat(g)
        tempData[7][name] = parseFloat(h)
        tempData[8][name] = parseFloat(i)
        tempData[9][name] = parseFloat(j)
        tempData[10][name] = parseFloat(k)
        tempData[11][name] = parseFloat(m)
        tempData[12][name] = parseFloat(l)
        tempData[13][name] = parseFloat(n)
        tempData[14][name] = parseFloat(o)
        tempData[15][name] = parseFloat(p)

        setData(tempData)
        setKeys([name])
        // 여기는 graph 띄워주는 함수!
        // drawAgeGraph()
    }

    return (
        <>
        
            {ageData && ageData.map(data => <button onClick={useHandleAgeData} id={data.id}>{data.name}</button>)}
            {owner}
            {pet_name}
            {age1}년 {age2}개월


            <br />
            <NoviGraphContainer>
                <NoviGraph data={data} keys={keys} />
            </NoviGraphContainer>

        </>
    )
}

export default AgeFit;

const NoviGraphContainer = styled.div`
    height: 50vh;
    width: 90vw;
`;