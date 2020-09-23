import React from 'react';
import styled from 'styled-components';
// music selected mode icon
import SELECT_PLAY_ICON from '../../Images/MusicFit/icon/play-choice.svg';
import ADD_SELECTED_ICON from '../../Images/MusicFit/icon/add-selected.svg';
import KEEP_SELECTED_ICON from '../../Images/MusicFit/icon/keep-selected.svg';
import KEEP_THEME_ICON from '../../Images/MusicFit/icon/keep-theme.svg';

// main footer icon 
import HOME_ICON from '../../Images/MusicFit/icon/music-home.svg';
import HOME_ICON2 from '../../Images/MusicFit/icon/music-home2.svg';
import PETDY_ICON from '../../Images/MusicFit/icon/petd-go.svg';
import SETTING_ICON from '../../Images/MusicFit/icon/music-setting.svg';
import SETTING_ICON2 from '../../Images/MusicFit/icon/music-setting2.svg';




function MusicFooter (props) {

    const { isDetail, goToHome, selectMusicMode } = props;

    if (!selectMusicMode)
    return (
        <StyledFooterWrapper>
            <StyldeMenuItem onClick={goToHome}>
                {isDetail ? 
                    <StyledIcon src={HOME_ICON} />
                : <StyledIcon src={HOME_ICON2} /> }
                음악만들기
            </StyldeMenuItem>
            <StyldeMenuItem>
                <StyledIcon src={PETDY_ICON} />
                펫디 바로가기
            </StyldeMenuItem>
            <StyldeMenuItem>
                <StyledIcon src={SETTING_ICON} />
                설정
            </StyldeMenuItem>
        </StyledFooterWrapper>
    )

    return (
        <StyledFooterWrapper>
            <StyldeMenuItem>
                <StyledIcon src={SELECT_PLAY_ICON} />
                선택곡재생
            </StyldeMenuItem>
            
            <StyldeMenuItem>
                <StyledIcon src={ADD_SELECTED_ICON} />
                추가
            </StyldeMenuItem>
            
            <StyldeMenuItem>
                <StyledIcon src={KEEP_SELECTED_ICON} />
                선택곡보관
            </StyldeMenuItem>
            
            <StyldeMenuItem>
                <StyledIcon src={KEEP_THEME_ICON} />
                테마보관
            </StyldeMenuItem>
        </StyledFooterWrapper>
    )

}

export default React.memo(MusicFooter);

const StyledFooterWrapper = styled.div`
    width: 100%;
    height: 55px;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 2;
    box-shadow: 0px -3px 4px #00000029;
    background: #ffffff;
    
    display: flex;
    justify-content: space-around;
`;

const StyldeMenuItem = styled.div`
    font-size: 9px;
    cursor: pointer;
    display: inline-flex;
    letter-spacing: -0.45px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #2B428E;
    min-width: 70px;
`;
const StyledIcon = styled.img`
    width: 22px;
    margin-bottom: 2px;
`;