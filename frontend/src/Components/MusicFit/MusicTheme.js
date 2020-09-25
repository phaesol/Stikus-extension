import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MusicItem from './MusicItem';
import ALL_PLAY_BTN from '../../Images/MusicFit/icon/all-play-btn.svg';
import SELECT_ALL_ICON from '../../Images/MusicFit/icon/all-choice.svg';

function MusicTheme (props) {
    const [targetMusicList, setTargetMusicList] = useState([])
    const { theme, playOneMusic, playMultiMusic, setSelectMusicMode, playSelectMusic } = props;
    
    const checkTargetMusicList = (targetMusic) => {
        console.log(targetMusic)
        console.log(targetMusicList)
    }

    useEffect(() => {
        console.log("타겟뮤직 리스트", targetMusicList)
        // targetMusicList
        if (targetMusicList.filter(item => item == "2/1")) {
            console.log('잇다!!!!!!!!!')
            console.log(targetMusicList.map(item => item == "2/1"))
        }
    }, [targetMusicList])
    // console.log("타겟뮤직리스트",targetMusicList)
    return (
        <>
            <StyledThemeHeader>
                <StyledAllPlayWrapper>
                    <StyledAllPlayBtn id={theme.info.id} onClick={playMultiMusic} src={ALL_PLAY_BTN} />
                    <StyledAllPlayText>전체 재생</StyledAllPlayText>
                </StyledAllPlayWrapper>
            </StyledThemeHeader>
            <StyledMusicItemSection>
                { theme &&
                    theme.music.map(music => (
                        <MusicItem 
                            music={music}
                            themeId={theme.info.id} 
                            themeName={theme.info.name} 
                            playOneMusic={playOneMusic} 
                            setSelectMusicMode={setSelectMusicMode} 
                            playSelectMusic={playSelectMusic} 
                            targetMusicList={targetMusicList} 
                            setTargetMusicList={setTargetMusicList} 
                            checkTargetMusicList={checkTargetMusicList}
                            key={"music-itme"+music.name}
                        />
                    ))   
                }
            </StyledMusicItemSection>
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

const StyledMusicItemSection = styled.div`
    width: 100%;
    height: calc(100vh - 310px);
    overflow: scroll;
    padding-bottom: 55px;
    &::-webkit-scrollbar { 
        display: none !important; 
    }
`;
