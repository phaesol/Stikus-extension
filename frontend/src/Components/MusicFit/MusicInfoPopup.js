import React from "react";

import styled from 'styled-components';
import MUSIC_BG from '../../Images/MusicFit/music-bg.png';
import GUIDE_DOG_CAT from '../../Images/MusicFit/guide-dog-cat.svg';
import JAZZ_ICON from '../../Images/MusicFit/icon/music-type/icon-jazz.png'; 
import BAND_ICON from '../../Images/MusicFit/icon/music-type/icon-band.png';
import FAST_ICON from '../../Images/MusicFit/icon/music-type/icon-fast.png';

function MusicInfoPopup ({ toggleInfoPopup }) {
    return (
        <>
            <StyledMusicInfoWrapper>
                <StyledTopBackground src={MUSIC_BG} />
                <StyledTopIcon src={GUIDE_DOG_CAT} />
                
                <StyledText1>음악이 반려동물에게 왜 필요할까요?</StyledText1>


                <StyledMainSection>
                    <StyledText2>
                    음악은 뇌에 의해 처리되는 음파(vibration)를 보내는데, 이는 결국 동물에게 광범위한 생리적 변화를 일으킬 수 있는 반응을 만들어 낼 수 있습니다. 크고 갑작스러운 소음은 아드레날린의 증가를 유발할 수 있는 반면, 반복적이고 온화한 소리는 신경계를 이완시킬 수 있습니다.
                    </StyledText2>
                    
                    <StyledTypeDiv>
                        <StyledTypeBox>
                            <StyledTypeIcon src={JAZZ_ICON}/>
                            <StyledText3>재즈</StyledText3>
                        </StyledTypeBox>
                        <StyledTypeBox>
                            <StyledTypeIcon src={BAND_ICON}/>
                            <StyledText3>밴드</StyledText3>
                        </StyledTypeBox>
                        <StyledTypeBox>
                            <StyledTypeIcon src={FAST_ICON}/>
                            <StyledText3>빠른템포</StyledText3>
                        </StyledTypeBox>
                    </StyledTypeDiv>

                    <StyledText2>
                    테마와 곡에 따라 장르와 악기, 리듬을 다양하게 사용하여 반려동물의 상태를 완화 혹은 고조 시키는데 도움을 줍니다. 예를 들면, 궂은 날씨로 인해 산책을 하지 못한 경우 반려견의 우울함과 무기력함 해소를 위해 경쾌한 리듬의 재즈밴드와 빠른템포의 곡이 도움이 됩니다.
                    </StyledText2>

                    <StyledText4>이용 방법</StyledText4>

                    <StyledText2>
                    모바일에서 백그라운드 음악 재생이 가능하여, 타 어플 및 프로그램 사용시에도 음악 재생이 가능합니다.
                    </StyledText2>
                </StyledMainSection>
                <StyledConfirmBtn onClick={toggleInfoPopup}>확인</StyledConfirmBtn>
            </StyledMusicInfoWrapper>
        </>
    )
}

export default MusicInfoPopup;

const StyledMusicInfoWrapper = styled.div`
    box-sizing: border-box;
    position: absolute;
    max-width: 600px;
    width: 100%;
    height: 100vh;
    background: #ffffff;
    padding: 0 15px 15px 15px;
    z-index: 2001;
    border: 1px solid green;
`;

const StyledConfirmBtn = styled.div`
    width: calc(100% - 30px);
    height: 45px; 
    border: 1px solid #2b428e;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    color: #2b428e;
    font-size: 18px;
    letter-spacing: -0.9px;
    font-weight: medium;
    cursor: pointer;
    position: absolute;
    bottom: 9px;
`;








const StyledTopBackground = styled.img`
    width: 100%;
    position: absolute;
    left: 0;
    z-index: -1;
`;


const StyledTopIcon = styled.img`
    position: absolute;
    right: 10px;
    top: -16px;
`;


const StyledTypeIcon = styled.img`
    width: 60px;
    height: 60px;
`;


const StyledMainSection = styled.div`
    position: absolute;
    left: 0;
    width: 100%;
    border-radius: 20px 20px 0 0;
    top: 120px;
    background: #ffffff;
    overflow-y: scroll;
    padding: 15px;
    height: calc(100vh - 185px);
    &::-webkit-scrollbar { 
        display: none !important; 
    }
`;


const StyledTypeDiv = styled.div`
    display: flex;
    margin: 25px 0;
`;

const StyledTypeBox = styled.div`
    margin-right: 20px;
`;



// text Styles
const StyledText1 = styled.div`
    font-size: 22px;
    text-align: left;
    letter-spacing: -1.1px;
    color: #FFFFFF;
    width: 185px;
    margin-top: 23px;
`;


const StyledText2 = styled.div`
    background: #f2f2f2;
    border-radius: 10px;
    padding: 13px;
    font-size:  15px;
    letter-spacing: -0.75px;
    color: #333333;
`;


const StyledText3 = styled.div`
    text-align: center;
    font-size: 13px;
    letter-spacing: -0.65px;
    color: #2B428E;
`;

const StyledText4 = styled.div`
    margin: 15px 0;
    text-align: left;
    font-size: 18px;
    letter-spacing: -0.9px;
    color: #2B428E;
    font-weight: 500;
`;