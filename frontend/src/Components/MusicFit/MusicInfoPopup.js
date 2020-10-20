import React from "react";

import styled from 'styled-components';
import MUSIC_BG from '../../Images/MusicFit/music-bg.png';
import GUIDE_DOG_CAT from '../../Images/MusicFit/guide-dog-cat.svg';


function MusicInfoPopup ({ toggleInfoPopup }) {
    return (
        <>
            <StyledMusicInfoWrapper>
                <StyledTopBackground src={MUSIC_BG} />
                <StyledTopIcon src={GUIDE_DOG_CAT} />
                
                <StyledText1>음악이 반려동물에게 왜 필요할까요?</StyledText1>


                <StyledMainSection>
                    <StyledText2>음악은 뇌에 의해 ~~</StyledText2>
                </StyledMainSection>
                <StyledConfirmBtn onClick={toggleInfoPopup}>확인</StyledConfirmBtn>
            </StyledMusicInfoWrapper>
        </>
    )
}

export default MusicInfoPopup;

const StyledMusicInfoWrapper = styled.div`
    box-sizing: border-box;
    position: absolute;
    max-width: 600px;
    width: 100%;
    height: 100vh;
    background: #ffffff;
    padding: 0 15px 15px 15px;
    z-index: 2001;
    border: 1px solid green;
`;

const StyledConfirmBtn = styled.div`
    width: calc(100% - 30px);
    height: 45px; 
    border: 1px solid #2b428e;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    color: #2b428e;
    font-size: 18px;
    letter-spacing: -0.9px;
    font-weight: medium;
    cursor: pointer;
    position: absolute;
    bottom: 9px;
`;








const StyledTopBackground = styled.img`
    width: 100%;
    position: absolute;
    left: 0;
    z-index: -1;
`;


const StyledTopIcon = styled.img`
    position: absolute;
    right: 10px;
    top: -16px;
`;


// text Styles
const StyledText1 = styled.div`
    font-size: 22px;
    text-align: left;
    letter-spacing: -1.1px;
    color: #FFFFFF;
    width: 185px;
    margin-top: 18px;
`;


const StyledText2 = styled.div`
`;


const StyledMainSection = styled.div`
    position: absolute;
    left: 0;
    width: 100%;
    border-radius: 20px 20px 0 0;
    top: 120px;
    background: #ffffff;
    overflow-y: scroll;
    border: 1px solid yellow;
    height: calc(100vh - 150px);
`;

