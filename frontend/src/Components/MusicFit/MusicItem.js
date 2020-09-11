import React from 'react';
import styled from 'styled-components';
import PLAY_CHOICE_ICON from '../../Images/MusicFit/icon/play-choice.svg';


function MusicItem ({ music, themeId, themeName, playOneMusic }) {

    return (
        <StyledItemWrapper>
            <StyledSection1>
                0{music.index+1}
            </StyledSection1>
            
            <StyledSection2>
                <StyledMusicName>{music.name}</StyledMusicName>
                <StyledSubInfo>{themeName}</StyledSubInfo>
            </StyledSection2>

            <StyledPlayBtn id={themeId + "/" + music.index} onClick={playOneMusic} src={PLAY_CHOICE_ICON} />
        </StyledItemWrapper>
    )
}

export default React.memo(MusicItem);

const StyledItemWrapper = styled.div`
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    position: relative;
    border-bottom: 1px solid #ddd;
`;


const StyledSection1 = styled.div`
    font-size: 28px;
    width: 29px;
    margin-right: 15px;
    letter-spacing: -1.4px;
    color: #333333;
`;
const StyledSection2 = styled.div`
`;
// const StyledSection3 = styled.div`
// `;


const StyledMusicName = styled.div`
    font-size: 15px;
    letter-spacing: -0.75px;
    color: #333333;
`;

const StyledSubInfo = styled.div`
    font-size: 13px;
    letter-spacing: -0.65px;
    color: #A5A4A4;
`;


const StyledPlayBtn = styled.img`
    cursor: pointer;
    position: absolute;
    right: 0;

`;