import React, { useState, useEffect, useCallback } from 'react';
import { MUSICTHEME1, MUSICTHEME2 } from '../../Music/THEME/MUSICTHEME';
import MusicPlayer from '../../Components/MusicFit/MusicPlayer';
import styled from 'styled-components';
import MUSIC_BG from '../../Images/MusicFit/music-bg.png';
import THEME_IMG_1 from '../../Images/MusicFit/thema1.png';
// Redux Store에 playList 저장할 것
// 최대 담을 수 있는 곡 제한두기(30개 정도?)
// 음악 다운로드 불가하게 nginx에서 src내에 permission 주기(chown)?

function MusicMainPage () {

    const [playList, setPlayList] = useState([])
    
    const playMusicTheme = (event) => {
        const { id } = event.target;

        switch (id) {
            case "MUSICTHEME1":
                setPlayList([...playList, ...MUSICTHEME1])
                break;

            case "MUSICTHEME2":
                setPlayList([...playList, ...MUSICTHEME2])
                break;

            default:
                return;
        }
    }

    const addMusic = (event) => {
        setPlayList([...playList, MUSICTHEME1[event.target.id]])
    }
    
    // console.log(playList)
    return (
        <StyledMainWrapper>
            <StyledMainSection>
                <StyledMainSubject>테마별 추천 음악</StyledMainSubject>
                <StyledThemeWrapper>
                    <StyledThemeImg1 src={THEME_IMG_1}></StyledThemeImg1>
                    <StyledThemeImg1 src={THEME_IMG_1}></StyledThemeImg1>
                    <StyledThemeImg1 src={THEME_IMG_1}></StyledThemeImg1>
                    <StyledThemeImg1 src={THEME_IMG_1}></StyledThemeImg1>
                    <StyledThemeImg1 src={THEME_IMG_1}></StyledThemeImg1>
                    <StyledThemeImg1 src={THEME_IMG_1}></StyledThemeImg1>
                </StyledThemeWrapper>
                
                {
                    MUSICTHEME1.map((music, key) => <button onClick={addMusic} id={key}>{music.name}</button>)
                }
                <button onClick={playMusicTheme} id="MUSICTHEME1">테마 1</button>
                <button onClick={playMusicTheme} id="MUSICTHEME2">테마 2</button>
            </StyledMainSection>
            
            
            
            <MusicPlayer 
                playList={playList} 
            />        

        </StyledMainWrapper>
    )
}

export default React.memo(MusicMainPage);

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
    top: 220px;
    left: 0;
    width: 100%;
    padding: 15px;
    height: calc(100vh - 220px);
    border: 2px solid green;
    background: white;
    border-radius: 20px 20px 0 0;
    z-index: 1;

`;

const StyledMainSubject = styled.div`
    margin-top: 15px;
    margin-bottom: 25px;
    font-size: 22px;
    letter-spacing: -1.1px;
    color: #2B428E;
`;

const StyledThemeWrapper = styled.div`
    /* border: 1px pink solid; */
    display: inline-flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const StyledThemeImg1 = styled.img`
    cursor: pointer;
    width: 33%;
    height: 33%;
`;