import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useFetchAge } from "../../Hooks/useFetchAge";
import NoviGraph from "../Useful/Novi";
import styled from 'styled-components';

function AgeFit ({ status, parseAge }) {
    // parseAge => 개월수로 계산된 age
    const [ageData, setAgeData] = useFetchAge();
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
    const [currentDesc, setCurrentDesc] = useState('');


    const filterData = (slug) => {
        return ageData.filter(object => {
            return object['slug'] === slug
        })
      }


    const drawAgeGraph = (id) => {
        const targetAgeData = filterData(id) 
        // id의 첫 글자만 가져옴
        // console.log("ageData는", targetAgeData)
        // 넣을껀 target id를 가진 하나의 것이다.
        const {
            name,
            desc,
            slug,
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
        // console.log(tempData)
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

        setCurrentDesc(desc)
        setData(tempData)
        setKeys([name])
        // 여기는 graph 띄워주는 함수!
        // drawAgeGraph()
    }

    const useHandleAgeData = (event) => {

        const { id } = event.target;

        const checkedBorderStyle = "1px solid blue";


        const allAgeBtnList = document.querySelectorAll('#age-list-btn-wrapper');

        for(let ageBtnIndex = 0; ageBtnIndex < allAgeBtnList.length; ageBtnIndex++ ){
            allAgeBtnList[ageBtnIndex].children[0].style.border = "none";
            // console.log("스타일 초기화")
        }
        document.getElementById(id).style.border = checkedBorderStyle;
        drawAgeGraph(id)
        // console.log(id)
    }


    useEffect(() => {
        if (ageData) {
            console.log("이거보고 계산 하면댐", parseAge)

            if (parseAge<7){
                drawAgeGraph("super-baby");
            } else if(parseAge<12) {
                drawAgeGraph("baby");
            } else if(parseAge<25) {
                drawAgeGraph("adult");
            } else if(parseAge<61) {
                drawAgeGraph("adult2560");
            } else if(parseAge<85) {
                drawAgeGraph("adult6184");
            } else if(parseAge<121) {
                drawAgeGraph("old");
            } else {
                drawAgeGraph("super-old");
            }
        }
    }, [ageData])


    return (
        <>
            <AgeListContainer id="hello">
                {ageData && ageData.map(data => 
                    <AgeListBtnWrapper key={data.id}>
                        <AgeListBtn key={data.slug} onClick={useHandleAgeData} id={data.slug}>
                            {data.name}
                        </AgeListBtn>
                    </AgeListBtnWrapper>
                )}
                
            </AgeListContainer>
            <table border="1">

                <tr>
                    <td>펫 이름</td>
                    <td>{pet_name}</td>
                </tr>
                <tr>
                    <td>나이</td>
                    <td>{age1}년 {age2}개월</td>
                </tr>
            </table>

            {currentDesc && currentDesc}

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

const AgeListContainer = styled.div`
    display: flex;  
    flex: 0 0 auto;  
`;

const AgeListBtnWrapper = styled.div.attrs({
    id :"age-list-btn-wrapper"
})`

`;
const AgeListBtn = styled.button`
    border: 0;
    outline: 0;
    padding: 5px;
    cursor: pointer;
`;