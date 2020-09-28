import styled, { css } from "styled-components";
import React from "react";
import { withRouter } from "react-router-dom";

const StyledButton = styled.button`
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

const StyledNextButton = ({
  children,
  path,
  history,
  step,
  moveStep,
  disabled,
}) => {
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
  return <StyledButton>{children}</StyledButton>;
};

export default withRouter(StyledNextButton);
