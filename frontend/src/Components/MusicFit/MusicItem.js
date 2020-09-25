import React, { useState, useRef, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import PLAY_CHOICE_ICON from '../../Images/MusicFit/icon/play-choice.svg';
import MUSIC_THEME_LIST from '../../Music/THEME/MUSICTHEME';

function MusicItem (props) {
    const [selected, setSelected] = useState(false);
    const { music, themeId, themeName, playOneMusic, setSelectMusicMode, playSelectMusic, targetMusicList, setTargetMusicList, checkTargetMusicList } = props;
    const targetMusicPk = themeId + "/" + music.index

    // console.log("타겟뮤직>>>", targetMusicList)
    const checkAndSetParentMusicList = () => {
        // 만약 targetMusicList에 targetMusicPk 가 있으면
        // targetMusicList를 복사하고, targetMusicPk를 뺀 새로운 array를 만들어서
        // setTargetMusicList() 로 설정시킨다.

        // ELSE이면
        // 단순히 setTargetMusic(...targetMusicList, [targetMusicPk])
    }

    const toggleSelect = () => {
        selected ? setSelected(false) : setSelected(true)
        checkAndSetParentMusicList();
    }
    useEffect(() => {
        targetMusicList.length !== 0 ? setSelectMusicMode(true) : setSelectMusicMode(false)
    }, [targetMusicList])

    return (
        <StyledItemWrapper selected={selected}>
            <StyledSection1>
                { music.index < 9 ? "0" + (music.index+1) : music.index+1 }
            </StyledSection1>

            <StyledSection2 onClick={toggleSelect}>
                <StyledMusicName>{music.name}</StyledMusicName>
                <StyledSubInfo>{themeName}</StyledSubInfo>
            </StyledSection2>

            <StyledPlayBtn id={themeId + "/" + music.index} onClick={playOneMusic} src={PLAY_CHOICE_ICON} />
        </StyledItemWrapper>
    )
}

export default React.memo(MusicItem);

const StyledItemWrapper = styled.div`
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    position: relative;
    border-bottom: 1px solid #ddd;
    background: ${(props) => props.selected ? "#ddd" : "transparent"};
`;

const StyledSection1 = styled.div`
    font-size: 28px;
    width: 29px;
    margin-right: 15px;
    letter-spacing: -1.4px;
    color: #333333;
`;

const StyledSection2 = styled.div`
    width: 70vw;
`;

const StyledMusicName = styled.div`
    font-size: 15px;
    letter-spacing: -0.75px;
    color: #333333;
`;

const StyledSubInfo = styled.div`
    font-size: 13px;
    letter-spacing: -0.65px;
    color: #A5A4A4;
`;


const StyledPlayBtn = styled.img`
    cursor: pointer;
    position: absolute;
    right: 0;

`;