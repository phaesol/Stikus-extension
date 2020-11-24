import styled, { css } from "styled-components";
import React from "react";
import { withRouter, Link } from "react-router-dom";

const BtnStyle = css`
  border: none;
  background: none;
  background: #f2f2f2 0% 0% no-repeat padding-box;
  border-radius: 5px;
  opacity: 1;
  text-align: center;
  font-size: 18px;
  padding: 10px 0;
  width: 150px;
  letter-spacing: -0.9px;
  color: #2b428e;
  opacity: 1;
  margin-right: 15px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    color: #3854b0;
    background-color: #c9c9c9;
  }
`;

const StyledButton = styled.button`
  ${BtnStyle}
`;
const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;

  ${BtnStyle}
`;
const StyledPrevButton = ({ children, path, history, step, moveStep, to }) => {
  if (to) {
    return <StyledLink to={to}>{children}</StyledLink>;
  } else {
    //이거솓 나중에 switch문으로 바꿎
    if (path) {
      function handlePath(moveStep) {
        history.push(path);
      }
      return <StyledButton onClick={handlePath}>{children}</StyledButton>;
    }

    if (step && moveStep) {
      return (
        <StyledButton onClick={() => moveStep(step)}>{children}</StyledButton>
      );
    }
    return <StyledButton>{children}</StyledButton>;
  }
};

export default withRouter(StyledPrevButton);
