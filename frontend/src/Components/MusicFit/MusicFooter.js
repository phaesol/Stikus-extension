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
import PLAYER_MODE1 from '../../Images/MusicFit/icon/player-mode1.png';
import PLAYER_MODE2 from '../../Images/MusicFit/icon/player-mode2.png';
import PLAYER_MODE3 from '../../Images/MusicFit/icon/player-mode3.png';





import { setPlaySelectedMusicFlag } from '../../Redux/Actions/petMusicActions';
import { connect } from 'react-redux';
import { width } from '../../../node_modules/dom-helpers/cjs/index';


const PLAYER_MODE_ICON = [PLAYER_MODE1, PLAYER_MODE2, PLAYER_MODE3]

function MusicFooter (props) {
    const { dispatchPetPlaySelectedMusicFlag, currentSelected, isDetail, goToHome, selectMusicMode, responsive, setResponsive } = props;
    const [mode, setMode] = React.useState(1);
    // 선택곡 담기
    const clickPlayIcon = React.useCallback(() => {
        dispatchPetPlaySelectedMusicFlag(false)
    }, [])

    const changePlayerMode = () => {
        const miniMode = document.querySelector('.controller-title')
        const lineMode = document.querySelector('.hide-panel')
        const screenMode = document.querySelector('.react-jinke-music-player-mobile-header-right')
        
        // 첫 번째 if문은 pc화면에서 풀스크린모드를 보여주지 않게하는 함수 
        if (lineMode && window.screen.width >= 768) {
            setResponsive(false)
            lineMode.click();
            setMode(1)
            return;
        }
        
        // 플레이어 모드 변경
        if (screenMode){
            screenMode.click();
            setMode(1)
        } else if (miniMode) {
            miniMode.click();
            setResponsive(false)
            setMode(2)
        } else if (lineMode) {
            setResponsive(true)
            setMode(3)
        }  
    }

    const goToDrMamma = () => {
        window.open('https://drmamma.co.kr');
    }

    if (!selectMusicMode)
    return (
        <StyledFooterWrapper>
            <StyldeMenuItem onClick={goToHome}>
                {isDetail ? 
                    <StyledIcon src={HOME_ICON} />
                : <StyledIcon src={HOME_ICON2} /> }
                닥터뮤직 홈
            </StyldeMenuItem>
            <StyldeMenuItem onClick={goToDrMamma}>
                <StyledIcon src={PETDY_ICON} />
                닥터맘마 바로가기
            </StyldeMenuItem>
            <StyldeMenuItem onClick={changePlayerMode}>
                <StyledModeIcon mode={mode} />
                플레이어 모드
            </StyldeMenuItem>
        </StyledFooterWrapper>
    )

    return (
        <StyledSelectFooterWrapper>
            <StyledFooterPlayBtn onClick={clickPlayIcon}>
                선택곡 재생하기 ({currentSelected}) 곡
            </StyledFooterPlayBtn>
        </StyledSelectFooterWrapper>

    )
    // 아래껀 일단 keep이라서!!
    // return (
    //     <StyledFooterWrapper>
    //         <StyldeMenuItem onClick={clickPlayIcon}>
    //             <StyledIcon src={SELECT_PLAY_ICON}/>
    //             선택곡담기
    //         </StyldeMenuItem>
            
    //         <StyldeMenuItem>
    //             <StyledIcon src={ADD_SELECTED_ICON} />
    //             추가
    //         </StyldeMenuItem>
            
    //         <StyldeMenuItem>
    //             <StyledIcon src={KEEP_SELECTED_ICON} />
    //             선택곡보관
    //         </StyldeMenuItem>
            
    //         <StyldeMenuItem>
    //             <StyledIcon src={KEEP_THEME_ICON} />
    //             테마보관
    //         </StyldeMenuItem>
    //     </StyledFooterWrapper>
    // )
}

const mapStateToProps = state => {
    return { currentSelected: state.petMusic.currentSelected } 
}

const mapDispatchToProps = dispatch => {
    return { dispatchPetPlaySelectedMusicFlag: bool => dispatch(setPlaySelectedMusicFlag(bool))}
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(MusicFooter));


// Styled-Components
const StyledFooterWrapper = styled.div`
    width: 100%;
    height: 55px;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 2000;
    box-shadow: 0px -3px 4px #00000029;
    background: #ffffff;
    display: flex;
    justify-content: space-around;
`;

const StyledSelectFooterWrapper = styled.div`
    width: 100%;
    height: 55px;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 2;
    box-shadow: 0px -3px 4px #00000029;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const StyledFooterPlayBtn = styled.div`
    width: calc(100% - 30px);
    display: flex;
    justify-content: center;
    align-items: center;
    /* width: calc(100% - 80px); */
    background: #2B428E;
    border-radius: 5px;
    height: 45px;
    color: #FFFFFF;
    font-size: 18px;
    letter-spacing: -0.9px;
    
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
const StyledModeIcon = styled.img.attrs(props => ({
    src: PLAYER_MODE_ICON[props.mode-1]
}))`
    width: 22px;
    margin-bottom: 2px;
`;