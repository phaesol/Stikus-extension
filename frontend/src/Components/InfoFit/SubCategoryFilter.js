import React from "react";
import styled from "styled-components";
import DiseaseCard from "./DiseaseCard";


const DiseaseList = [
    "skin",
    "intestine",
    "bone",
    "obesity",
    "heart",
    "liver",
    "tumor",
    "kidney",
    "respirator",
    "eyes",
    "urinary",
    "tooth",
    "diabetes",
    "brain",
    "growth"
    ]

function SubCategoryFilter ({ type }) {

    switch(type){
        case "건강":
            return (
                <>
                    <StyledMainSubject>따라하면 건강해져요!</StyledMainSubject>
                    <StyledImageSlider>
                        {DiseaseList.map((disease, idx) =>
                            <DiseaseCard
                                // onClick={onClick}
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
    margin-left: -6px;
    margin-bottom: 20px;
    ::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera*/
    }
    /* border: 1px solid red; */
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    width: calc(100% + 20px);

    /* width: 100vw; */
    overflow-x: scroll;
    display: flex;
    /* flex: 0 0 auto; */
    img{
        width: 60px;
        height: 80px;
    }

`;