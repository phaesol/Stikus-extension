import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function PageNotFound () {
    return (
        <StyledErrorWrapper>
            <StyledText1>404</StyledText1>
            <StyledText2>Page Not Found</StyledText2>
            {/* <img src={GUIDE_DOG_CAT} /> */}
            
            <StyledLink to="/music">
                <StyledText3>Route to Music Fit</StyledText3>
            </StyledLink>

            <StyledText3 onClick={() => {alert("준비중입니다.")}}>Route to Nutrient Fit</StyledText3>

            <StyledText4>🐶🐺🐯🦊🦒we are stickus🐰🐹🐭🐷🦝</StyledText4>
        </StyledErrorWrapper>
    )
}

export default PageNotFound;

const StyledErrorWrapper = styled.div`
    height: 100vh;
    text-align: center;
    color: #777777;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const StyledText1 = styled.div`
    font-size: 70px;
    color: rgb(43, 66, 142);
    font-weight: bold;
    text-shadow: 4px 4px 2px gray;
`;

const StyledText2 = styled.div`
    font-size: 30px;
    color: rgb(89, 109, 165);
    font-weight: 500;
    text-shadow: 2px 2px 2px #dddddd;
    margin-bottom: 10px;
`;


const StyledText3 = styled.div`
    cursor: pointer;
    display: inline-block;
    font-size: 20px;
    padding: 5px;
    background: rgb(89, 109, 165);;
    width: 100%;
    font-weight: 300;
    border-radius: 15px;
    width: 300px;
    color: #ffffff;
    box-shadow: 1px 0px 10px 3px rgba(0,0,0,0.05);
    border: none;
`;

const StyledText4 = styled.div`
    margin-top: 30px;
    color: black;
    margin-bottom: 70px;
    font-size: 0.9rem;
    letter-spacing: -1px;
`;


const StyledLink = styled(Link)`
    position: relative;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
        color: black;
    }
`;