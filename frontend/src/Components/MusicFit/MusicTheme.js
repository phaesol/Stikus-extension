import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MusicItem from './MusicItem';
import ALL_PLAY_BTN from '../../Images/MusicFit/icon/all-play-btn.svg';
import SELECT_ALL_ICON from '../../Images/MusicFit/icon/all-choice.svg';

import { setPetPlayList, setPlaySelectedMusicFlag } from '../../Redux/Actions/petMusicActions';
import { connect } from 'react-redux';

function MusicTheme (props) {
    const [targetMusicList, setTargetMusicList] = useState([])
    const { petPlaySelectedMusicFlag, dispatchPetPlaySelectedMusicFlag, 
            theme, playOneMusic, playMultiMusic, setSelectMusicMode, playSelectMusic } = props;

   useEffect(() => {
    // 하단 푸터 toggle
        targetMusicList.length !== 0 ? setSelectMusicMode(true) : setSelectMusicMode(false)
        
        targetMusicList.length !== 0 ? dispatchPetPlaySelectedMusicFlag(true) : dispatchPetPlaySelectedMusicFlag(false)
        
    }, [targetMusicList])

    useEffect(() => {
        if(!petPlaySelectedMusicFlag) {
            playSelectMusic(targetMusicList)
        }
    }, [petPlaySelectedMusicFlag])
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
                            targetMusicList={targetMusicList} 
                            setTargetMusicList={setTargetMusicList} 
                            petPlaySelectedMusicFlag={petPlaySelectedMusicFlag}
                            key={"music-itme"+music.name}
                        />
                    ))   
                }
            </StyledMusicItemSection>
        </>
    )
}
const mapStateToProps = state => {
    return { petPlayList: state.petMusic.playList,
             petPlaySelectedMusicFlag: state.petMusic.petPlaySelectedMusicFlag } 
}

const mapDispatchToProps = dispatch => {
    return { dispatchPetPlayList: playList => dispatch(setPetPlayList(playList)),
             dispatchPetPlaySelectedMusicFlag: bool => dispatch(setPlaySelectedMusicFlag(bool)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(MusicTheme));

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
    /* overflow-y: scroll; */
    padding-bottom: 55px;
    &::-webkit-scrollbar { 
        display: none !important; 
    }
`;
