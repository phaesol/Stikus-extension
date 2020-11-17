import React from 'react';
import styled from 'styled-components';
import GOBACK_ICON from '../../../Images/MusicFit/icon/icon-go-back.png';

function MusicDetailHeader ({ theme, goToHome }) {
    return (
         <StyledHeaderSection>
            <StyledGoBackIcon onClick={goToHome} src={GOBACK_ICON} />
            <StyledDetailCoverBox>
                {theme && <StyledThemeImg1 src={theme.cover} />}
            </StyledDetailCoverBox>
            <StyledDetailCoverName>
                {theme && theme.music_theme_display}
            </StyledDetailCoverName>
            <StyledDetailTagWrapper>
                {theme.tag.split('/').map((t, index) => 
                    <StyledTagBox key={index+t}>#{t}</StyledTagBox>        
                )}
            </StyledDetailTagWrapper>
        </StyledHeaderSection>
    )

}

export default React.memo(MusicDetailHeader);


const FLEX_CENTER = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;


const StyledHeaderSection = styled(FLEX_CENTER)`
    height: 235px;
`;


const StyledDetailCoverBox = styled(FLEX_CENTER)`
    flex: 3;
    width: 105px;
    justify-content: flex-end;
`;

const StyledDetailCoverName = styled(FLEX_CENTER)`
    flex: 0.8;
    font-size: 18px;
    font-weight: 300;
    letter-spacing: -0.9px;
    color: #FFFFFF;
    cursor: default;
`;

const StyledDetailTagWrapper = styled.div`
    flex: 1.5;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    width: 90%;
    cursor: default;
`;

const StyledTagBox = styled.span`
    height: 35px;
    font-size: 17px;
    font-weight: 300;
    color: #f2f2f2;
    background: #596da5;
    border: 1px solid #707070;
    padding: 11px;
    display: flex;
    align-items: center;
    
    @media(max-width: 550px) {
        font-size: 13px;
        padding: 8px;
    }

    @media(max-width: 480px) {
        font-size: 12px;
        padding: 6px;
    }

    @media(max-width: 410px) {
        font-size: 11px;
        padding: 5px;
    }

    @media(max-width: 380px) {
        padding: 4px;
    }
    
    @media(max-width: 330px) {
        padding: 2px;
    }
`;


const StyledThemeImg1 = styled.img`
    width: 100%;
`;

const StyledGoBackIcon = styled.img`
    position: absolute;
    width: 40px;
    height: 40px;
    top: 20px;
    left: 10px;
    cursor: pointer;
`;