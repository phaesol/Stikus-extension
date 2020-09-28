import React, { useState, useRef, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import PLAY_CHOICE_ICON from '../../Images/MusicFit/icon/play-choice.svg';
import MUSIC_THEME_LIST from '../../Music/THEME/MUSICTHEME';

function MusicItem (props) {
    const [selected, setSelected] = useState(false);
    const { music, themeId, themeName, playOneMusic, setSelectMusicMode, playSelectMusic, targetMusicList, setTargetMusicList } = props;
    const targetMusicPk = {themeId:themeId, index: music.index}

    const toggleSelect = () => {
        // 음악 클릭 시 선택 토글
        selected ? setSelected(false) : setSelected(true)
    }

    const toggleSetParentMusicList = () => {
        // 부모 컴포넌트의 임시 선택 뮤직 리스트에 선택된 item 넣고, 빼주는 함수
        if (selected) {
            setTargetMusicList([...targetMusicList, targetMusicPk])
        } else {
            if (targetMusicList.length === 1) { return setTargetMusicList([]) }
            const idx = targetMusicList.findIndex(item => {return item.index === music.index}) 
            if (idx > -1) {
                targetMusicList.splice(idx, 1) // splice 함수를 사용하면, 적용된 array "자체"가 바뀐다.
                setTargetMusicList(targetMusicList)
            }
        }
    }

    useEffect(() => {
        // 아래 함수 실행
        toggleSetParentMusicList();
    }, [selected])

    useEffect(() => {
        // 하단 푸터 toggle
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