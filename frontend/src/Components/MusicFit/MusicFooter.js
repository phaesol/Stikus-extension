import React from 'react';
import styled from 'styled-components';


function MusicFooter ({ goToHome, goToDetail }) {
    const routeToHome = () => {
        goToHome();
        console.log('실행')
    }
    const routeToDetail = () => {
        goToDetail();
    }
    return (
        <StyledFooterWrapper>
            <button onClick={routeToHome}>홈</button>
            <button onClick={routeToDetail}>디테일</button>/펫디/설정/보관함
        </StyledFooterWrapper>
    )
}

export default MusicFooter;

const StyledFooterWrapper = styled.div`
    width: 100%;
    height: 55px;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 2;
    box-shadow: 0px -3px 4px #00000029;
    background: #ffffff;
`;