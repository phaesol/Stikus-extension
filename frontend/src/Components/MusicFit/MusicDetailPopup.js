import React from "react";
import styled from 'styled-components';
import MUSIC_TYPE_IMAGE from '../../Images/MusicFit/icon/music-type/musicTypeImage';

function MusicDetailPopup ({ detail, setDetailInfo }) {
    const closeModal = () => {
        setDetailInfo(null);
    }
    return (
        <>
            <StyledInfoModalWrapper>
                                                        
                <StyledMusicName>{detail.name}</StyledMusicName>
                <StyledSubInfo>{detail.singer}</StyledSubInfo>
                <StyledTypeDiv>
                        <StyledTypeBox>
                            <StyledTypeIcon src={MUSIC_TYPE_IMAGE[detail.genre]}/>
                            <StyledText3>{detail.genre}</StyledText3>
                        </StyledTypeBox>
                        <StyledTypeBox>
                            <StyledTypeIcon src={MUSIC_TYPE_IMAGE[detail.instrument]}/>
                            <StyledText3>{detail.instrument}</StyledText3>
                        </StyledTypeBox>
                        <StyledTypeBox>
                            <StyledTypeIcon src={MUSIC_TYPE_IMAGE[detail.tempo]}/>
                            <StyledText3>{detail.tempo}</StyledText3>
                        </StyledTypeBox>
                    </StyledTypeDiv>
                <StyledText2>
                    {detail.desc}
                </StyledText2>
                <StyledConfirmBtn onClick={closeModal}>확인</StyledConfirmBtn>
            </StyledInfoModalWrapper>
                    
                    
        </>
    )
}

export default MusicDetailPopup;

const StyledTypeIcon = styled.img`
    width: 60px;
    height: 60px;
`;

const StyledTypeDiv = styled.div`
    display: flex;
    margin: 20px 0;
`;

const StyledTypeBox = styled.div`
    margin-right: 20px;
`;

const StyledText2 = styled.div`
    background: #f2f2f2;
    border-radius: 10px;
    padding: 13px;
    font-size:  15px;
    letter-spacing: -0.75px;
    color: #333333;
`;


const StyledText3 = styled.div`
    text-align: center;
    font-size: 13px;
    letter-spacing: -0.65px;
    color: #2B428E;
`;


// Info Modal
const StyledInfoModalWrapper = styled.div`
    position: fixed;
    bottom: 0;
    max-width: 600px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    border-radius: 15px 15px 0 0;
    z-index: 2001;
    background: #FFFFFF;
    padding: 15px;
    box-shadow: 0px -3px 4px #00000029;
`;

const StyledMusicName = styled.div`
    font-size: 15px;
    letter-spacing: -0.75px;
    color: #333333;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

const StyledSubInfo = styled.div`
    font-size: 13px;
    letter-spacing: -0.65px;
    color: #A5A4A4;
`;

const StyledConfirmBtn = styled.div`
    width: 100%;
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
    margin-top: 15px;
    cursor: pointer;
`;