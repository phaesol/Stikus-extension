import React from "react";
import styled from "styled-components";
import DiseaseCard from "./card/DiseaseCard";
import AgeCard from "./card/AgeCard";
import EcoCard from "./card/EcoCard";
import BehaviorCard from "./card/BehaviorCard";

const DiseaseList = [
    {"skin": "피부"},
    {"intestine": "장 건강"},
    {"bone": "관절"},
    {"obesity": "비만"},
    {"heart": "심장"},
    // {"liver": "간"},
    {"tumor": "종양"},
    {"kidney": "신장"},
    {"respirator": "호흡"},
    {"eyes": "눈건강"},
    {"urinary": "비뇨기"},
    {"tooth": "치아"},
    {"diabetes": "당뇨"},
    // {"brain": "뇌"},
    {"growth": "성장"},
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

    switch(type){
        case "건강":
            return (
                <>
                    <StyledMainSubject>따라하면 건강해져요!</StyledMainSubject>
                    <StyledImageSlider>
                    {DiseaseList.map((disease, idx) =>
                        <DiseaseCard
                            filter={filter}
                            key={idx} 
                            disease={disease}
                        />
                    )}
                    </StyledImageSlider>
                </>
            )
        case "나이":
            return (
                <>
                    <StyledMainSubject>따라하면 건강해져요!</StyledMainSubject>
                    <StyledAgeCardContainer>
                    {AgeList.map((age, idx) =>
                        <AgeCard
                            filter={filter}
                            key={idx} 
                            age={age}
                            infoAge={infoAge}
                        />
                        )}
                    </StyledAgeCardContainer>
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
    display: inline-block;
    text-align: center;
    margin-left: -6px;
    margin-bottom: 20px;
    width: 100%;
    img{
        width: 60px;
        height: 80px;
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