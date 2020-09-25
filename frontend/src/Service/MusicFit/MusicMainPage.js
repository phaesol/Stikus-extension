import React, { useState, useEffect, useCallback } from 'react';
// import { MUSICTHEME1, MUSICTHEME2 } from '../../Music/THEME/MUSICTHEME';
import MusicPlayer from '../../Components/MusicFit/MusicPlayer';
import MusicFooter from '../../Components/MusicFit/MusicFooter';
import styled, { createGlobalStyle } from 'styled-components';
import MUSIC_BG from '../../Images/MusicFit/music-bg.png';

import MUSIC_THEME_LIST from '../../Music/THEME/MUSICTHEME';
import MusicTheme from '../../Components/MusicFit/MusicTheme';

import MusicMainHeader from '../../Components/MusicFit/header/MusicMainHeader';
import MusicDetailHeader from '../../Components/MusicFit/header/MusicDetailHeader';

import { setPetPlayList } from '../../Redux/Actions/petMusicActions';

import { connect } from 'react-redux';

// import THEME_IMG_1 from '../../Images/MusicFit/thema1.png';
// Redux Store에 playList 저장할 것
// 최대 담을 수 있는 곡 제한두기(30개 정도?)
// 음악 다운로드 불가하게 nginx에서 src내에 permission 주기(chown)?

function MusicMainPage ({ petPlayList ,dispatchPetPlayList }) {
    // console.log(MUSIC_THEME_LIST)
    const [playList, setPlayList] = useState([])
    const [isDetail, setIsDetail] = useState(false);
    const [selectMusicMode, setSelectMusicMode] = useState(false);
    const [theme, setTheme] = useState(null);
    
    
    // play Music func
    const playOneMusic = useCallback((event) => {
        const [themeIndex, musicIndex] = event.target.id.split('/')
        setPlayList([...playList, MUSIC_THEME_LIST[themeIndex-1].music[musicIndex]])
    }, [playList])

    const playMultiMusic = useCallback((event) => {
        const { id } = event.target;
        setPlayList([...playList, ...MUSIC_THEME_LIST[id-1].music])
    }, [playList])

    const playRecomMusic = useCallback((music1, music2) => {
        setPlayList([...playList, music1, music2])
    }, [playList])

    const playSelectMusic = useCallback((selectedMusicList) => {
        console.log(selectedMusicList)
    })

    const selectThemeDetail = useCallback((event) => {
        const { id } = event.target;
        setTheme(MUSIC_THEME_LIST[id-1]);
        setIsDetail(true);
    }, [theme, isDetail])


    // Footer routing func
    const goToHome = useCallback(() => {
        setIsDetail(false)
    }, [isDetail])

    
    // Effects
    useEffect(() => {
        document.title = "펫디 :: 음악 만들기"
    }, [])
    
    useEffect(() => {
        dispatchPetPlayList(playList)
        // console.log("디스패치된 playList :   ", petPlayList)
        // console.log("그냥 현재 playList :    ", playList)
    }, [playList])
    // useEffect(() => {
    //     // 음악 없으면 play icon 숨기기
    //     if(playList.length > 0) {
    //         document.querySelector('.music-player').style.display = "block";
    //     } else { 
    //         document.querySelector('.music-player').style.display = "none";
    //     }
    // }, [playList])

    return (
        <StyledMainWrapper> <MusicCustomStyle />
            { !isDetail ? 
            <>
                <MusicMainHeader playRecomMusic={playRecomMusic} /> 
                <StyledMainSection>
                    <StyledMainSubject>테마별 추천 음악</StyledMainSubject>
                    <StyledThemeWrapper>
                        {
                            MUSIC_THEME_LIST.map(THEME => 
                                <StyledContentBox key={"music-theme-list"+THEME.info.id}>
                                    <StyledThemeImg1 id={THEME.info.id} onClick={selectThemeDetail} src={THEME.info.coverImg} />
                                    {THEME.info.name}
                                </StyledContentBox>
                            )
                        }
                    </StyledThemeWrapper>
                </StyledMainSection>
            </>
            : 
            <>
                <MusicDetailHeader theme={theme} /> 
                <StyledMainSection>
                    <MusicTheme theme={theme} playOneMusic={playOneMusic} playMultiMusic={playMultiMusic} setSelectMusicMode={setSelectMusicMode} playSelectMusic={playSelectMusic} />
                </StyledMainSection>
            </> }
            
            <MusicPlayer playList={petPlayList} />       

            <MusicFooter isDetail={isDetail} goToHome={goToHome} selectMusicMode={selectMusicMode} />
        </StyledMainWrapper>
    )
}

const mapStateToProps = state => {
    return { petPlayList: state.petMusic.playList } 
}

const mapDispatchToProps = dispatch => {
    return { dispatchPetPlayList: playList => dispatch(setPetPlayList(playList)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(MusicMainPage));

const MusicCustomStyle = createGlobalStyle`
    .react-jinke-music-player-mobile {
        background: black !important;
    }
    .light-theme > .react-jinke-music-player-mobile {
        background: white !important;
    }
    .react-jinke-music-player-mobile-cover {
        border-radius: 0 !important;
    }
    .react-jinke-music-player-mobile-cover .cover {
        width: 95% !important;
    }
    .react-jinke-music-player-mobile-cover > img {
        animation: none !important;
    }
    .react-jinke-music-player-main .music-player-panel .panel-content .img-rotate {
        animation: none;
    } 
    .img-rotate {
        @media(max-width: 425px) { 
            display: none !important; }
    }

    .react-jinke-music-player-main .music-player-panel{
        max-width: 600px;
        height: 55px;
        bottom: 55px;
        left: 50% !important;
        transform: translate(-50%, 0) !important;
    }           
`;



/*
    1. 뮤직 리스팅
    2. Redux-persist 연결해서 현재 playList추가
    3. 
*/


const StyledMainWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: url(${MUSIC_BG}); 
    background-repeat: no-repeat;
    background-size: 100% 45vh;
`;

const StyledMainSection = styled.div`
    position: absolute;
    top: 250px;
    left: 0;
    width: 100%;
    padding: 15px;
    height: calc(100vh - 250px);
    background: white;
    border-radius: 20px 20px 0 0;
    z-index: 1;
`;



const StyledMainSubject = styled.div`
    margin-top: 15px;
    margin-bottom: 25px;
    font-size: 22px;
    text-align: left;
    letter-spacing: -1.1px;
    color: #2B428E;
    font-weight: 500;
`;

// 박스 컨트롤 

const StyledThemeWrapper = styled.div`
    display: inline-flex;
    flex-wrap: wrap;
    justify-content: space-between;
    letter-spacing: -0.65px;
    color: #080808;
    font-weight: 500;
    @media (max-width: 500px) {
        font-size: 13px;
    }
    @media (max-width: 440px) {
        font-size: 11px;
    }  
    @media (max-width: 360px) {
        font-size: 9px;
    }
`;

const StyledContentBox = styled.div`
    display: inline-block;
    width: 31%;
    margin: 2% 1%;
`;

const StyledThemeImg1 = styled.img`
    cursor: pointer;
    width: 100%;
`;

