import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';


function Loading () {
    const [progress, setProgress] = useState(0);
    // 현재 1초 로딩용
    useEffect(() => {
        if (progress === 99){
            return;
        }
        setTimeout(() => {
            setProgress(progress+1)
        }, 10)
    }, [progress])

    return (
        <>
            <StyledMainInfo>
                답변 내용을
            </StyledMainInfo>
            <StyledMainInfo2>
                분석하고 있습니다.
            </StyledMainInfo2>
            <StyledSubInfo>
                닥터핏은 입력하신 정보를 통해 <br />
                수의영양에 기반한 맞춤영양제를 추천합니다.
            </StyledSubInfo>
            
            <StyledLoaderWrapper>
                <StyledLoadingSpinner></StyledLoadingSpinner>
                <StyledProgressNum>{progress}</StyledProgressNum><StyledPercent>%</StyledPercent>
                <StyledLoaderInfo>잠시만 기다려 주세요</StyledLoaderInfo>
            </StyledLoaderWrapper> 
        </>
    )   
}

export default React.memo(Loading);


// info

const StyledMainInfo = styled.div`
    margin: 25px 0 10px;
    font-size: 28px;
    font-weight: 300;
    color: #333333; 
    letter-spacing: -1.4px;
`;

const StyledMainInfo2 = styled.div`
    font-size: 28px;
    font-weight: 700;
    color: #333333; 
    letter-spacing: -1.4px;
`;

const StyledSubInfo = styled.div`
    font-size: 15px;
    color: #080808;
    letter-spacing: -0.75px;
    line-height: 1.47;
    margin: 15px 0 50px;
`;



// loader & spinner

const StyledLoaderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

`;

const KeyframesSpin = keyframes`
    0% {
        -webkit-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
        -moz-transform: rotate(360deg);
        -ms-transform: rotate(360deg);
        -o-transform: rotate(360deg);
        transform: rotate(360deg);
    }
`;

const StyledLoadingSpinner = styled.div`
    -webkit-animation-duration: 0.7s;
    -moz-animation-duration: 0.7s;
    animation-duration: 0.7s;
    -webkit-animation-iteration-count: 2;
    -moz-animation-iteration-count: 2;
    animation-iteration-count: 2;
    -webkit-animation-name: ${KeyframesSpin};
    -moz-animation-name: ${KeyframesSpin};
    animation-name: ${KeyframesSpin};
    -webkit-animation-timing-function: linear;
    -moz-animation-timing-function: linear;
    animation-timing-function: linear;
    height: 150px;
    width: 150px;
    border: 18px solid #e16a49;
    border-right-color: transparent;
    border-radius: 50%;
`;

const StyledProgressNum = styled.span`
    position: relative;
    top: -132px;
    font-size: 55px;
    font-weight: 700;
    color: #2C3E50;
`;

const StyledPercent = styled.span`
    position: relative;
    top: -170px;
    left: 42px;
    font-size: 23px;
    font-weight: 700;
    color: #2C3E50;
`;

const StyledLoaderInfo = styled.div`
    position: relative;
    top: -90px;
    font-size: 15px;
    color: #080808;
    letter-spacing: -0.75px;
    line-height: 1.47;
`;