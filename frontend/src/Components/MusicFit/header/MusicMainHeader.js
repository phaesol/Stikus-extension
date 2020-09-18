import React from 'react';
import styled from 'styled-components';
import MUSIC_THEME_LIST from '../../../Music/THEME/MUSICTHEME';
import RECOM_PLAY_ICON from '../../../Images/MusicFit/icon/recommend-play.png';
import RECOM_LIST_ICON from '../../../Images/MusicFit/icon/recommend-list.svg';
function MusicMainHeader ({ playRecomMusic }) {
    const selectRecomMucicAndPlay = () => {
        // 추천곡을 정하는 곳
        const music1 = MUSIC_THEME_LIST[0].music[0]
        const music2 = MUSIC_THEME_LIST[0].music[1]
        playRecomMusic(music1, music2)
    }
    return (
        <>  
        <StyledTopSection>
            <StyledMainInfo>토토리를 위한 오늘의 추천곡</StyledMainInfo>
            <StyledRecomPlayIcon onClick={selectRecomMucicAndPlay} src={RECOM_PLAY_ICON} />
        </StyledTopSection>
        <StyledBottomSection>
            <StyledRecomMusicSection>
                <StyledMusicIcon src={RECOM_LIST_ICON} />
                    <StyledFlexDiv>
                        <StyledMusicName>꽃이 피는 계절에(오늘부터 우리는)</StyledMusicName>
                        <StyledMusicSub>03:37 TBE STUDIO</StyledMusicSub>
                    </StyledFlexDiv>        
            </StyledRecomMusicSection>
            <StyledRecomMusicSection>
                <StyledMusicIcon src={RECOM_LIST_ICON} />
                    <StyledFlexDiv>
                        <StyledMusicName>꽃이 피는 계절에(오늘부터 우리는)</StyledMusicName>
                        <StyledMusicSub>03:37 TBE STUDIO</StyledMusicSub>
                    </StyledFlexDiv>        
            </StyledRecomMusicSection>
        
        </StyledBottomSection>
        </>
    )

}

export default React.memo(MusicMainHeader);

const StyledTopSection = styled.div`
    width: 100%;
    padding: 45px 25px 20px 13px; 
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const StyledRecomPlayIcon = styled.img`
    width: 50px;
    height: 50px;
    cursor: pointer;
`;

const StyledMainInfo = styled.div`
    display: inline-block;
    width: 130px;
    letter-spacing: -1.1px;
    color: #FFFFFF;
    font-size: 22px;
`;


// bottom section

const StyledBottomSection = styled.div`
    width: 100%;
    
`;
const StyledRecomMusicSection = styled.div`
    display: flex;
    /* justify-content: space-bet */

`;
const StyledMusicIcon = styled.img`
    padding: 13px;
`;

const StyledFlexDiv = styled.div`
    display: flex;
    flex-direction: column;
    
`;
const StyledMusicName = styled.div`
    text-align: left;
    font-size: 15px;
    letter-spacing: -0.75px;
    color: #FFFFFF;
    font-weight: normal;

`;
const StyledMusicSub = styled.div`
    text-align: left;
    font-size: 13px;
    letter-spacing: -0.65px;
    color: #B3BFE9;

`;
   