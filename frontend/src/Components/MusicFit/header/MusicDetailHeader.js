import React from 'react';
import styled from 'styled-components';
import { BACKEND } from '../../../config';

function MusicDetailHeader ({ theme }) {
    return (
         <StyledHeaderSection>
                <StyledDetailCoverBox>
                    {theme && <StyledThemeImg1 src={BACKEND + '/stikus_media/' + theme.cover} />}
                </StyledDetailCoverBox>
                <StyledDetailCoverName>
                    {theme && theme.music_theme}
                </StyledDetailCoverName>
                <StyledDetailTagWrapper>
                    {theme.tag.split('/').map(t => 
                        <StyledTagBox key={t}># {t}</StyledTagBox>        
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
    height: 250px;
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
`;

const StyledDetailTagWrapper = styled.div`
    flex: 1.5;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    width: 90%;
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
    
    @media(max-width: 480px) {
        font-size: 13px;
        padding: 8px;
    }
    @media(max-width: 360px) {
        font-size: 11px;
        padding: 5px;
    }
`;


const StyledThemeImg1 = styled.img`
    cursor: pointer;
    width: 100%;
`;

