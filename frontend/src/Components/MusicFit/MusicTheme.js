import React from 'react';
import styled from 'styled-components';
import MusicItem from './MusicItem';
import ALL_PLAY_BTN from '../../Images/MusicFit/icon/all-play-btn.svg';

function MusicTheme ({ theme, playOneMusic, playWholeThemeMusic }) {

    return (
        <>
            <StyledThemeHeader>
                <StyledAllPlayWrapper>
                    <StyledAllPlayBtn id={theme.info.id} onClick={playWholeThemeMusic} src={ALL_PLAY_BTN} />
                    <StyledAllPlayText>전체 재생</StyledAllPlayText>
                </StyledAllPlayWrapper>
            </StyledThemeHeader>
            
            { theme &&
                theme.music.map(music => (
                    <MusicItem music={music} themeId={theme.info.id} themeName={theme.info.name} playOneMusic={playOneMusic} />
                ))   
            }
        </>
    )
}

export default React.memo(MusicTheme);

const StyledThemeHeader = styled.div`
    margin-top: -15px;
    width: 100%;
    height: 60px;
    
    display: flex;
    align-items: center;
    justify-content: flex-end;

`;

const StyledAllPlayWrapper = styled.div`
    display: flex; 
    flex-direction: column;
    cursor: pointer;
`;

const StyledAllPlayBtn = styled.img`
    margin-bottom: 2px;
`;

const StyledAllPlayText = styled.div`
    font-size: 9px;
    letter-spacing: -0.45px;
    color: #A5A4A4;
`;