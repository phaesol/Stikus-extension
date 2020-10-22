import React, { useState, useRef, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import PLAY_CHOICE_ICON from '../../Images/MusicFit/icon/play-choice.svg';
import MUSIC_MORE from '../../Images/MusicFit/icon/music-more.svg';

function MusicItem (props) {
    const [selected, setSelected] = useState(false);
    const { music, index, themeId, displayInfo, playOneMusic, targetMusicList, setTargetMusicList,
            petPlaySelectedMusicFlag } = props;
    const targetMusicPk = {themeId: themeId, index: index}

    const toggleSelect = useCallback(() => {
        // 음악 클릭 시 선택 토글
        selected ? setSelected(false) : setSelected(true)
    }, [selected])

    const toggleSetParentMusicList = useCallback(() => {
        // 부모 컴포넌트의 임시 선택 뮤직 리스트에 선택된 item 넣고, 빼주는 함수
        if (selected) {
            setTargetMusicList([...targetMusicList, targetMusicPk])
        } else {
            if (targetMusicList.length === 1) { return setTargetMusicList([]) }
            const idx = targetMusicList.findIndex(item => { return item.index === index }) 
            
            if (idx > -1) {
                targetMusicList.splice(idx, 1) 
                // splice 함수를 사용하면, 적용된 array "자체"가 바뀐다. 
                // +++ 근데 react에서 변경된 값을 알아듣지 못함!
                // 그래서 다시 접고 펴준다!
                setTargetMusicList([...targetMusicList])
            }
        }
    }, [selected, targetMusicList])

    const setIdxAtDisplayInfo = useCallback(() => {
        displayInfo(index)
    }, [index])

    useEffect(() => {
        // 아래 함수 실행
        toggleSetParentMusicList();
    }, [selected])

    useEffect(() => {
        // 하단 푸터 선택곡 담기시 회색(selected 초기화)
        if (!petPlaySelectedMusicFlag){
            setSelected(false)
        }
    }, [petPlaySelectedMusicFlag])

    return (
        <StyledItemWrapper selected={selected}><StyledSelectedOverLay selected={selected}></StyledSelectedOverLay>
            <StyledSection1>
                { index < 9 ? "0" + (index+1) : index+1 }
            </StyledSection1>

            <StyledSection2 onClick={toggleSelect}>
                <StyledMusicName>{music.name}</StyledMusicName>
                <StyledSubInfo>{music.singer}</StyledSubInfo>
            </StyledSection2>

            {targetMusicList.length === 0 && 
                <>
                    <StyledMoreInfo onClick={setIdxAtDisplayInfo} src={MUSIC_MORE} />
                    <StyledPlayBtn id={themeId + "/" + index} onClick={playOneMusic} src={PLAY_CHOICE_ICON} />
                </>
            }   
            </StyledItemWrapper>
    )
}

export default React.memo(MusicItem);

// Styled-Components
const StyledItemWrapper = styled.div`
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    position: relative;
    border-bottom: ${(props) => props.selected ? "1px solid transparent" : "1px solid #ddd"};
`;

const StyledSelectedOverLay = styled.div`
    pointer-events: none !important; 
    width: calc(100% + 30px);
    position: absolute;
    opacity: 0.1;
    top:-1px;
    right: -15px;
    z-index: 2;
    height: 60px;
    background: ${(props) => props.selected ? "black" : "transparent"};
`;

const StyledSection1 = styled.div`
    font-size: 28px;
    width: 29px;
    margin-right: 15px;
    letter-spacing: -1.4px;
    color: #333333;
    cursor: default;
`;

const StyledSection2 = styled.div`
    width: 64vw;
    cursor: pointer;
`;

const StyledMusicName = styled.div`
    font-size: 15px;
    letter-spacing: -0.75px;
    color: #333333;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
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

const StyledMoreInfo = styled.img`
    cursor: pointer;
    position: absolute;
    right: 25px;
`;