import React from 'react';
import styled from 'styled-components';

function MusicDetailHeader ({ theme }) {
    return (
         <StyledHeaderSection>
                <StyledDetailCoverBox>
                    {theme && <StyledThemeImg1 src={theme.info.coverImg} />}
                </StyledDetailCoverBox>
                <StyledDetailCoverName>
                    {theme && theme.info.name}
                </StyledDetailCoverName>
                <StyledDetailTagWrapper>
                    {[1,2,3,4,5].map(_ => 
                        <StyledTagBox key={_}>#개꿀잠</StyledTagBox>        
                    )}
                </StyledDetailTagWrapper>
            </StyledHeaderSection>
    )

}

export default MusicDetailHeader;


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
    color: #FFFFFF;
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

