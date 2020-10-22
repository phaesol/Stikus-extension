import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import MusicItem from './MusicItem';
import MusicDetailPopup from '../../Components/MusicFit/MusicDetailPopup';
import ALL_PLAY_BTN from '../../Images/MusicFit/icon/all-play-btn.svg';
import { setPetPlayList, setPlaySelectedMusicFlag } from '../../Redux/Actions/petMusicActions';
import { connect } from 'react-redux';

function MusicTheme (props) {
    const [targetMusicList, setTargetMusicList] = useState([]);
    const [detailInfo, setDetailInfo] = useState(null);
    const { petPlaySelectedMusicFlag, dispatchPetPlaySelectedMusicFlag, 
            theme, playOneMusic, playMultiMusic, setSelectMusicMode, playSelectMusic } = props;
    
    const backGroundRef = useRef();
    const displayInfo = (targetIndex) => {
        setDetailInfo(theme.music[targetIndex])
    }

    useEffect(() => {
        // 디테일 팝업 모달 제어(배경 누르면 모달 꺼지게 리스너 장착 및 해제)
        if (!detailInfo) {
            return;
        }
        const closeSection = backGroundRef.current;
        closeSection.addEventListener('click', () => setDetailInfo(null))
        return () => closeSection.removeEventListener('click', () => setDetailInfo(null)) 
    }, [detailInfo])

    useEffect(() => {
    // 하단 푸터 toggle
        if (targetMusicList.length !== 0) {
            setSelectMusicMode(true)
            dispatchPetPlaySelectedMusicFlag(true, targetMusicList.length)
        } else { 
            setSelectMusicMode(false)
            dispatchPetPlaySelectedMusicFlag(false, targetMusicList.length)    
        } 
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
                    <StyledAllPlayBtn 
                        id={theme.number} 
                        onClick={playMultiMusic} 
                        src={ALL_PLAY_BTN} 
                    />
                    <StyledAllPlayText>전체 재생</StyledAllPlayText>
                </StyledAllPlayWrapper>
            </StyledThemeHeader>
            <StyledMusicItemSection>
                { theme &&
                    theme.music.map((music, index) => (
                        <MusicItem 
                            music={music}
                            index={index}
                            themeId={theme.number} 
                            themeName={theme.music_theme} 
                            playOneMusic={playOneMusic}   
                            displayInfo={displayInfo}
                            targetMusicList={targetMusicList} 
                            setTargetMusicList={setTargetMusicList} 
                            petPlaySelectedMusicFlag={petPlaySelectedMusicFlag}
                            key={"music-item"+index}
                        />
                    ))   
                }
                <StyledMargin></StyledMargin>
            </StyledMusicItemSection>
            { detailInfo && 
            <>
                <MusicDetailPopup detail={detailInfo} setDetailInfo={setDetailInfo} /> 
                <StyledBackGround ref={backGroundRef}></StyledBackGround>
            </>
            }
        </>
    )
}
const mapStateToProps = state => {
    return { petPlayList: state.petMusic.playList,
             petPlaySelectedMusicFlag: state.petMusic.petPlaySelectedMusicFlag } 
}

const mapDispatchToProps = dispatch => {
    return { dispatchPetPlayList: playList => dispatch(setPetPlayList(playList)),
             dispatchPetPlaySelectedMusicFlag: (bool, number) => dispatch(setPlaySelectedMusicFlag(bool, number)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(MusicTheme));

const StyledThemeHeader = styled.div`
    position: fixed;
    border-radius: 20px 20px 0 0;
    top: 230px;
    left: 50%;
    -webkit-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    transform: translate(-50%, 0);
    max-width: 600px;
    z-index: 3;
    padding: 0 15px;
    width: 100%;
    height: 60px;
    background: #ffffff;
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
    padding-top: 45px;
    height: calc(100vh - 310px);
`;

const StyledMargin = styled.div`
    width: 100%;
    height: 113px; 
`;


const StyledBackGround = styled.div`
    width: 100vw;
    height: 100vh;
    background: black;
    opacity: 0.5;
    position: fixed;
    top: 0px;
    left: 0;
    z-index: 1000;
`;