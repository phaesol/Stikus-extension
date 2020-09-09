import React, { useState, useEffect, useCallback } from 'react';
import { MUSICTHEME1, MUSICTHEME2 } from '../../Music/THEME/MUSICTHEME';
import MusicPlayer from '../../Components/MusicFit/MusicPlayer';
import MusicFooter from '../../Components/MusicFit/MusicFooter';
import styled from 'styled-components';
import MUSIC_BG from '../../Images/MusicFit/music-bg.png';
import THEME_IMG_1 from '../../Images/MusicFit/thema1.png';
// Redux Store에 playList 저장할 것
// 최대 담을 수 있는 곡 제한두기(30개 정도?)
// 음악 다운로드 불가하게 nginx에서 src내에 permission 주기(chown)?

function MusicMainPage () {

    const [playList, setPlayList] = useState([])
    const [isDetail, setIsDetail] = useState(false);
    const [theme, setTheme] = useState(null);
    
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

    const selectTheme = () => {
        console.log("테마선택");
        setTheme(MUSICTHEME1);
        setIsDetail(true);
    }


    // Footer routing func
    const goToHome = useCallback(() => {
        setIsDetail(false)
    }, [isDetail])

    const goToDetail = useCallback(() => {
        setIsDetail(true)
    }, [isDetail])

    

    // Effects
    useEffect(() => {
        document.title = "음악 만들기"
    }, [])
    
    return (
        <StyledMainWrapper>
            <StyledMainSection>
                { !isDetail ? 
                    <>
                        <StyledMainSubject>테마별 추천 음악</StyledMainSubject>
                        <StyledThemeWrapper>
                            {/* 이 박스도 Component로 빼야함 */}
                            <StyledContentBox onClick={selectTheme}>
                                <StyledThemeImg1 src={THEME_IMG_1}></StyledThemeImg1>
                                꿀잠이 필요해 zzz
                            </StyledContentBox>
                            <StyledContentBox>
                                <StyledThemeImg1 src={THEME_IMG_1}></StyledThemeImg1>
                                혼자 있어 외로워요
                            </StyledContentBox>
                            <StyledContentBox>
                                <StyledThemeImg1 src={THEME_IMG_1}></StyledThemeImg1>
                                산책 못가 우울해요
                            </StyledContentBox>
                            <StyledContentBox>
                                <StyledThemeImg1 src={THEME_IMG_1}></StyledThemeImg1>
                                IQ 관리는 지금부터
                            </StyledContentBox>
                            <StyledContentBox>
                                <StyledThemeImg1 src={THEME_IMG_1}></StyledThemeImg1>
                                간식 못 먹어 마음이 심란할 때
                            </StyledContentBox>
                            <StyledContentBox>
                                <StyledThemeImg1 src={THEME_IMG_1}></StyledThemeImg1>
                                몸과 마음, 힐링 중
                            </StyledContentBox>
                        </StyledThemeWrapper>
                        
                        <button onClick={playMusicTheme} id="MUSICTHEME1">테마 1</button>
                        <button onClick={playMusicTheme} id="MUSICTHEME2">테마 2</button>
                    </>
                : 
                    <>
                        <StyledMainSubject>디테일 페이지</StyledMainSubject>
                        { theme &&
                            theme.map(music => (
                                <div>{music.name}</div>
                            ))
                        }
                    </>
                }
            </StyledMainSection>
            
            
            
            <MusicPlayer 
                playList={playList} 
            />       


            <MusicFooter goToHome={goToHome} goToDetail={goToDetail} />
                 

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

// 박스 컨트롤 

const StyledThemeWrapper = styled.div`
    /* border: 1px pink solid; */
    display: inline-flex;
    flex-wrap: wrap;
    justify-content: space-between;
    letter-spacing: -0.65px;
    color: #080808;
    font-size: 17px;
    font-weight: 600;
    @media (max-width: 500px) {
        font-size: 13px
    }
    @media (max-width: 440px) {
        font-size: 11px
    }  
    @media (max-width: 360px) {
        font-size: 9px
    }
`;

const StyledContentBox = styled.div`
    display: inline-block;
    width: 33%;
`;

const StyledThemeImg1 = styled.img`
    cursor: pointer;
    width: 100%;
    /* height: %; */
`;