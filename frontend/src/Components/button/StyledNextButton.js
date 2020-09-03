import styled from "styled-components";
import React, { useState, useCallback } from "react";
import { withRouter } from "react-router-dom";

const StyledButton = styled.button`
  font-size: 17px;
  width: 100%;
  height: 45px;
  background: #2b428e;
  border-radius: 5px;
  letter-spacing: -0.9px;
  color: #ffffff;
  cursor: pointer;
`;

const StyledNextButton = ({ children, path, history }) => {
  function handlePath() {
    console.log(path);
    if (path) history.push(path);
  }

  return <StyledButton onClick={handlePath}>{children}</StyledButton>;
};

export default withRouter(StyledNextButton);
