import React from 'react';
import styled from "styled-components";

const StyledPairWrapper = ({children}) => {
    return (
        <StyledPairCard>
            {children}
        </StyledPairCard>
    );
};

export default StyledPairWrapper;

const StyledPairCard = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  & > div {
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    width: 48%;
    padding: 20px;
    box-sizing: border-box;
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 10px;
    opacity: 1;

    font-size: 15px;
    letter-spacing: 0px;
    color: #333333;
    font-weight: bold;
    svg {
      margin-bottom: 20px;
    }
    span {
      margin-top: 15px;
    }
  }
`;
