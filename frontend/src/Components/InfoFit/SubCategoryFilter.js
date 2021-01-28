import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import DiseaseCard from "./card/DiseaseCard";
import AgeCard from "./card/AgeCard";
import EcoCard from "./card/EcoCard";
import BehaviorCard from "./card/BehaviorCard";
import AgeData from "./AgeData";
import ReferHealth from "./card/ReferHealth";


const DiseaseList = [
    {"skin": "피부"},
    {"intestine": "장 건강"},
    {"bone": "관절"},
    {"obesity": "비만"},
    {"heart": "심장"},
    {"liver": "간"},
    {"tumor": "종양"},
    {"kidney": "신장"},
    {"respirator": "호흡"},
    {"eyes": "눈건강"},
    {"urinary": "비뇨기"},
    {"tooth": "치아"},
    {"diabetes": "당뇨"},
    {"brain": "뇌"},
    // {"growth": "성장"},
]

const AgeList = [
    {"baby": "4개월 이하"},
    {"youth": "1살 이하"},
    {"boy": "7살 이하"},
    {"senior": "12살 이하"},
    {"old": "12살 이상"},
]

const EcoList = [
    '강아지',
    '고양이',
    '급여',
    '간식',
    '건강식',
    '교육',
    '꿀팁',
    '놀이',
    '레시피',
    '먹방',
    '사료',
    '섭취방법',
    '식이문제',
    '영양제',
    '예방접종',
    '용품',
    '입양준비',
    '전용템',
    '주변환경',
    '청결관리',
    '필수상식',
    '필수템',
    '해외사례',
    '후기'
]

const BehaviorList = [
    '강아지',
    '고양이',
    '교감해요',
    '궁금해요',
    '급여',
    '무서워요',
    '배변교육',
    '사나워요',
    '섭취방법',
    '성격',
    '스트레스',
    '식이문제',
    '이상증상',
    '종특성'
]


function SubCategoryFilter ({ type, filter, infoAge }) {

    const [toggleAge, setToggleAge] = useState(null);

    const slideRef = useRef();
    const slideRef2 = useRef();

    useEffect(() => {
        if(slideRef && slideRef.current) {
        slideRef.current.addEventListener("touchstart", (event) => {
            event.stopPropagation()
        })
        return () => slideRef.current.removeEventListener("touchstart", (event) => {
            event.stopPropagation()
        })
    }}, [slideRef])

    useEffect(() => {
        if(slideRef2 && slideRef2.current) {
        slideRef2.current.addEventListener("touchstart", (event) => {
            event.stopPropagation()
        })
        return () => slideRef2.current.removeEventListener("touchstart", (event) => {
            event.stopPropagation()
        })
    }}, [slideRef2])

    switch(type) {
        case "건강":
            return (
                <>
                    <StyledMainSubject>탭을 클릭하세요!</StyledMainSubject>
                    <StyledImageSlider ref={slideRef}>
                    {DiseaseList.map((disease, idx) =>
                        <DiseaseCard
                            filter={filter}
                            key={idx} 
                            disease={disease}
                        />
                    )}
                    </StyledImageSlider>

                      
                    
                    <>
                        <StyledMainSubject>참고 해주세요!</StyledMainSubject>

                        <StyledImageSlider ref={slideRef2}>
                            <ReferHealth />
                        </StyledImageSlider>
                    </>
                    
                </>
            )
        case "나이":
            return (
                <>
                    <StyledMainSubject>탭을 클릭하세요!</StyledMainSubject>
                    <StyledAgeCardContainer>
                    {AgeList.map((age, idx) =>
                        <AgeCard
                            filter={filter}
                            key={idx} 
                            age={age}
                            infoAge={infoAge}
                            toggleAge={toggleAge}
                            setToggleAge={setToggleAge}
                        />
                        )}
                    </StyledAgeCardContainer>
                    
                    {toggleAge && 
                        <StyledAgeInfo>
                            {AgeData[toggleAge].split("/").map((data) =>
                                <div>· {data}</div>
                            )}
                        </StyledAgeInfo>
                    }

                </>
            )
        case "환경":
            return (
                <>
                    <StyledMainSubject>관심 키워드로 정보를 골라 보세요!</StyledMainSubject>
                    <StyledTagCardContainer>
                    {EcoList.map((eco, idx) => 
                        <EcoCard 
                            filter={filter}
                            key={idx} 
                            eco={eco}
                        />
                    )}
                    </StyledTagCardContainer>
                </>
                )
        case "행동":
            return (
                <>
                    <StyledMainSubject>관심 키워드로 정보를 골라 보세요!</StyledMainSubject>
                    <StyledTagCardContainer>
                    {BehaviorList.map((behavior, idx) => 
                        <BehaviorCard 
                            filter={filter}
                            key={idx} 
                            behavior={behavior}
                        />
                    )}
                    </StyledTagCardContainer>
                </>
            )
    }
     
}
 
export default SubCategoryFilter;


const StyledMainSubject = styled.div`
    font-weight: 500;
    font-size: 18px;
    font-family: "NotoSansKR";
    letter-spacing: -0.9px;
    color: #333333;
    margin-bottom: 15px;
`;

const StyledImageSlider = styled.div`
    display: flex;
    overflow-x: scroll;
    /* white-space: nowrap; */
    /* flex-wrap: nowrap; */
    /* -webkit-overflow-scrolling: touch; */
    margin-bottom: 20px;
    /* width: 400px; */

    ::-webkit-scrollbar {
        width: 0px;
        height: 8px;
        cursor: pointer;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background-color: #f2f2f2;
        border-radius: 10px;
        cursor: pointer;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background-color: #e16a49;
        border-radius: 5px;
        cursor: pointer;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background-color: #ba563a;
        cursor: pointer;
    }

    img{
        width: 70px;
        height: 87px;
        cursor: pointer;
    }
`;


const StyledAgeCardContainer = styled.div`
    display: flex;
    justify-content: space-around;
    margin-bottom: 25px;
    img {
        border-radius: 10px;
        width: 52px;
        height: 70px;
        box-shadow: 0px 3px 8px #00000029;
        cursor: pointer;
    }

`;

const StyledTagCardContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
    margin-bottom: 15px;
    span {
        cursor: pointer;
    }
`;


const StyledAgeInfo = styled.div`
    padding: 15px;
    box-sizing: border-box;
    width: 100%;
    margin-top: -5px;
    margin-bottom: 20px;
    background: 0% 0% no-repeat padding-box padding-box rgb(255, 255, 255);
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px;
    border-radius: 10px;
    text-align: left;
    font-size: 15px;
    letter-spacing: -0.75px;
    opacity: 1;
    font-family: "NotoSansKR";
    line-height: 25px;
`;


const StyledHealthInfo = styled.div`



`;