import React from "react";
import styled from "styled-components";
import DiseaseCard from "./DiseaseCard";
import AgeCard from "./AgeCard";


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


function SubCategoryFilter ({ type, filter }) {

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
                            />
                        )}
                    </StyledAgeCardContainer>
                </>
            )
        case "환경":
            return (
                <>
                    <StyledMainSubject>관심 키워드로 정보를 골라 보세요!</StyledMainSubject>
                </>
                )
        case "행동":
            return (
                <>
                    <StyledMainSubject>관심 키워드로 정보를 골라 보세요!</StyledMainSubject>
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
    /* box-sizing: border-box;
    border: 1px solid red; */
    display: inline-block;
    text-align: center;
    margin-left: -6px;
    margin-bottom: 20px;
    /* ::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera*/
    } */
    /* border: 1px solid red; */
    /* -ms-overflow-style: none; 
    scrollbar-width: none;  */
    width: calc(100%);

    /* width: 100vw; */
    /* overflow-x: scroll; */
    /* display: flex; */
    /* flex: 0 0 auto; */
    img{
        width: 60px;
        height: 80px;
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

    }

`;