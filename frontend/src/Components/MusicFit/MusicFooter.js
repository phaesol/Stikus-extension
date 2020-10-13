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

import { setPlaySelectedMusicFlag } from '../../Redux/Actions/petMusicActions';
import { connect } from 'react-redux';

function MusicFooter (props) {
    const { dispatchPetPlaySelectedMusicFlag, currentSelected, isDetail, goToHome, selectMusicMode } = props;

    // 선택곡 담기
    const clickPlayIcon = React.useCallback(() => {
        dispatchPetPlaySelectedMusicFlag(false)
    }, [])

    const changePlayerMode = () => {
        if (document.querySelector('.react-jinke-music-player')) {
            document.querySelector('.react-jinke-music-player').click();
        }
        // console.log(a)

        if (document.querySelector('.hide-panel')) {
            document.querySelector('.hide-panel').click();
        }
    }

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
            <StyldeMenuItem onClick={changePlayerMode}>
                <StyledIcon src={SETTING_ICON} />
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
    z-index: 2;
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