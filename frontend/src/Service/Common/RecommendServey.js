import React from "react";
import styled, { css } from "styled-components";

const RecommendServey = () => {
  if (0)
    return (
      <StyledServeyInfoWrapper>
        <StyledServeyStep>Q2) 피부건강 항목 선택</StyledServeyStep>
        <StyledServeyInfo>
          <span>피부건강</span>에 해당하는 증상을
          <br /> 모두 선택하세요.
        </StyledServeyInfo>
        <StyledCheckWrapper>
          <StyledCheckItem>
            <span>네모</span>아토피가 있어요{" "}
          </StyledCheckItem>
          <StyledCheckItem>
            <span>네모</span>아토피가 있어요{" "}
          </StyledCheckItem>
          <StyledCheckItem>
            <span>네모</span>아토피가 있어요{" "}
          </StyledCheckItem>
          <StyledCheckItem>
            <span>네모</span>아토피가 있어요{" "}
          </StyledCheckItem>
        </StyledCheckWrapper>
      </StyledServeyInfoWrapper>
    );
  if (1)
    return (
      <>
        <StyledServeyInfoWrapper>
          <StyledServeyStep>Q1) 건강관리 항목 선택</StyledServeyStep>
          <StyledServeyInfo>
            현재 불편하거나 걱정이 되는
            <br />
            <span>3가지 건강을 선택</span>
            하세요
          </StyledServeyInfo>
          <StyledServeyInfo sub={true}>
            ( 나이에 따라 추천 항목은 파란선으로 표시됩니다. )
          </StyledServeyInfo>
          <StyledCardInfo>
            <div>
              <div></div>추천항목
            </div>
            <div>
              <div></div>선택
            </div>
          </StyledCardInfo>
        </StyledServeyInfoWrapper>
        <StyledServeyCardWrapper>
          <img src={require("../../Images/Disease/h-bone.png")} />
          <img src={require("../../Images/Disease/h-bone.png")} />
          <img src={require("../../Images/Disease/h-bone.png")} />
          <img src={require("../../Images/Disease/h-bone.png")} />
          <img src={require("../../Images/Disease/h-bone.png")} />
          <img src={require("../../Images/Disease/h-bone.png")} />
          <img src={require("../../Images/Disease/h-bone.png")} />
          <img src={require("../../Images/Disease/h-bone.png")} />
          <img src={require("../../Images/Disease/h-bone.png")} />
          <img src={require("../../Images/Disease/h-bone.png")} />
          <img src={require("../../Images/Disease/h-bone.png")} />
          <img src={require("../../Images/Disease/h-bone.png")} />
          <img src={require("../../Images/Disease/h-bone.png")} />
          <img src={require("../../Images/Disease/h-bone.png")} />
          <img src={require("../../Images/Disease/h-bone.png")} />
        </StyledServeyCardWrapper>
        <div>버튼자리</div>
      </>
    );
};

export default RecommendServey;

const StyledServeyInfoWrapper = styled.div`
  margin-top: 30px;
`;

const StyledServeyStep = styled.div`
  font-weight: bold;
  font-size: 18px;
`;

const StyledServeyInfo = styled.div`
  font-size: 22px;
  margin: 5px 0;

  span {
    color: #e16a49;
    font-weight: bold;
  }
  ${(props) =>
    props.sub &&
    css`
      letter-spacing: -0.75px;
      color: #080808;
      font-size: 15px;
      font-weight: 300;
    `}
`;

const StyledCardInfo = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 15px;
  letter-spacing: -0.75px;

  div + div {
    margin-left: 20px;
  }
  div {
    display: flex;
  }
  div:nth-child(1) {
    color: #2b428e;
  }
  div:nth-child(2) {
    color: #e16a49;
  }
  div:nth-child(1) div {
    width: 22px;
    height: 22px;
    border: 2px solid #2b428e;
    border-radius: 3px;
    margin-right: 5px;
  }
  div:nth-child(2) div {
    width: 22px;
    height: 22px;
    background-color: #e16a49;
    border: 2px solid #e16a49;
    border-radius: 3px;

    margin-right: 5px;
  }
`;

const StyledServeyCardWrapper = styled.div`
  margin-top: 15px;
  display: flex;
  flex-wrap: wrap;

  img {
    width: 25%;
  }
`;

const StyledCheckWrapper = styled.div`
  margin-top: 30px;
`;

const StyledCheckItem = styled.div`
  display: flex;
  text-align: left;
  font-weight: 300;
  letter-spacing: -0.85px;
  color: #333333;
  & + & {
    margin-top: 20px;
  }
`;
