import styled, { css } from "styled-components";
import React from "react";
import { withRouter, Link } from "react-router-dom";

const BtnStyle = css`
  border: none;
  background: none;
  font-size: 17px;
  width: 100%;
  height: 45px;
  background: #2b428e;
  border-radius: 5px;
  letter-spacing: -0.9px;
  color: #ffffff;
  cursor: pointer;

  ${(props) =>
    props.disabled &&
    css`
      background: #7787ba;

      cursor: not-allowed;
    `}
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
const StyledNextButton = ({
  children,
  path,
  history,
  step,
  moveStep,
  disabled,
  to,
  onClick,
}) => {
  if (to) {
    return (
      <StyledLink to={to}>
        {children}
      </StyledLink>
    );
  } else {
    //이거솓 나중에 switch문으로 바꿎
    if (path) {
      function handlePath() {
        history.push(path);
      }
      return (
        <StyledButton disabled={disabled} onClick={handlePath}>
          {children}
        </StyledButton>
      );
    }

    if (step && moveStep) {
      return (
        <StyledButton disabled={disabled} onClick={() => moveStep(step)}>
          {children}
        </StyledButton>
      );
    }
    if (onClick) {
      return (
        <StyledButton onClick={onClick}>
          {children}
        </StyledButton>
      )
    }
    return <StyledButton>{children}</StyledButton>;
  }
};

export default withRouter(StyledNextButton);
