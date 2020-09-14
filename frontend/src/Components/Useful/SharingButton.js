import React from "react";
import styled from "styled-components";

const SharingButton = () => {
  return <StyledSharingButton>카카오톡으로 결과 보내기</StyledSharingButton>;
};

export default SharingButton;

const StyledSharingButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  height: 45px;
  width: 100%;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  border: 1px solid #e16a49;
  border-radius: 5px;
  opacity: 1;

  font-size: 17px;
  font-weight: bold;
  letter-spacing: -0.85px;
  color: #e16a49;
  opacity: 1;

  cursor: pointer;
`;
