import React, { useState } from 'react';
import styled from 'styled-components';


function SelectNutrientWay () {
    const [way, setWay] = useState('');

    const handleChange = (event) => {
        setWay(event.target.name)
    }    
    const goToSurveyPage = () => {
        // history.push('')
        // 여기서 way에 따라 분기해서 push해주면 된다!
        console.log(way)
    }

    return (    
        <>
            <StyledSelectWrapper>
                <input onChange={handleChange} type="radio" checked={way === "recommend" ? true : false} id="recommend" name="recommend" value="recom-making" />
                <label htmlFor="recommend">건강 맞춤으로 선택 / 설문으로 맞춤 추천받기</label>
            </StyledSelectWrapper>
            <StyledSelectWrapper>
                <input onChange={handleChange} type="radio" checked={way === "self" ? true : false} id="self" name="self" value="self-making" />
                <label htmlFor="self">원료 맞춤으로 선택 / 자유롭게 맞춤 구성하기</label>
            </StyledSelectWrapper>
            <StyledNextButton onClick={goToSurveyPage}>다음</StyledNextButton>
        </>

    )
}

export default SelectNutrientWay;



const StyledSelectWrapper = styled.div``;


const StyledNextButton = styled.button``;
