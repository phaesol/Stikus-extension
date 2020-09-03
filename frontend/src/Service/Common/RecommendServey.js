import React from "react";
import styled, { css } from "styled-components";
import StyledNextButton from "../../Components/button/StyledNextButton";
import ImageCard from "../../Components/Useful/ImageCard";
import OrangeCheckBox from "../../Components/button/OrangeCheckBox";

const RecommendServey = () => {
  const renderCard = [
    { name: "h-bone", choice: false, recommend: false },
    { name: "h-brain", choice: false, recommend: false },
    { name: "h-diabetes", choice: false, recommend: false },
    { name: "h-eyes", choice: false, recommend: false },
    { name: "h-growth", choice: false, recommend: false },
    { name: "h-heart", choice: false, recommend: false },
    { name: "h-intestine", choice: false, recommend: false },
    { name: "h-kidney", choice: false, recommend: false },
    { name: "h-liver", choice: false, recommend: false },
    { name: "h-obesity", choice: false, recommend: false },
    { name: "h-respirator", choice: false, recommend: false },
    { name: "h-skin", choice: false, recommend: false },
    { name: "h-tooth", choice: false, recommend: false },
    { name: "h-tumor", choice: false, recommend: false },
    { name: "h-urinary", choice: false, recommend: false },
  ];

  function onToggle(id) {
    console.log(id);
  }
  // 장건강만 카드색갈 다른거 처리해야함

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
            <OrangeCheckBox name="" label="아토피가 있어요" />
          </StyledCheckItem>
          <StyledCheckItem>
            <OrangeCheckBox name="" label="아토피가 있어요" />
          </StyledCheckItem>
          <StyledCheckItem>
            <OrangeCheckBox name="" label="아토피가 있어요" />
          </StyledCheckItem>
          <StyledCheckItem>
            <OrangeCheckBox name="" label="아토피가 있어요" />
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

        {/* recommend, 만약 선택한 state랑같으면 해당 card item만 checked로 옵션변경,
        총 max 3개까지만 들어갈수 있게
        그리고 눌렀던것 재클릭하면 사라지게, 파란색 + 색깔은 색ㄲ라만 보여주게 */}
        <StyledServeyCardWrapper>
          {renderCard.map((item) => (
            <ImageCard key={item.name} item={item} onToggle={onToggle} />
          ))}
          {/* <ImageCard /> */}
        </StyledServeyCardWrapper>
        <StyledNextButton>다음페이지</StyledNextButton>
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
    cursor: pointer;
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
