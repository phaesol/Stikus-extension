import React from "react";
import StyledNextButton from "../../Components/button/StyledNextButton";
import styled from "styled-components";
import ImageCard from "../../Components/NutrientFit/ImageCard";
import MaterialCard from "../../Components/NutrientFit/MaterialCard";

const SelfMake = ({ choosecards, choicecard }) => {
  //@TODO 카드 토글도 넣어놨는데 이것도 나중에 따로 빼야함
  function onToggle(name) {
    if (choosecards.filter((ele) => ele.choice === true).length < 3) {
      choicecard(name);
      console.log("계속 돌아갈 부분");
    } else {
      const changeIndex = choosecards.findIndex((ele) => ele.name === name);
      if (choosecards[changeIndex].choice == true) {
        choicecard(name);
        console.log("삭제할 애들", name);
      } else {
        console.log("얘는 그냥 추가하면 안되고 무시해야함");
      }
    }
  }

  return (
    <>
      <StyledSelfMakeTitle>
        영양제 직접 만들기
        <span>원하시는 원료를 추가하여 영양제를 직접 만들어보세요.</span>
      </StyledSelfMakeTitle>

      <StyledSurveyCardWrapper>
        {choosecards.map((item) => (
          <ImageCard key={item.name} item={item} onToggle={onToggle} />
        ))}
      </StyledSurveyCardWrapper>
      <StyledMaterialWrapper>
        <span>직접 추가하신 원료에요!</span>
        <button>한눈에 보기</button>
      </StyledMaterialWrapper>
      <StyledMaterialInfo>
        ※ <span>원료목록을 터치</span>하여 삭제 또는 수량을 조정할 수 있습니다.
      </StyledMaterialInfo>

      <StyledMaterialListItem key={"배합용 파우더"}>
        <span>
          {"배합용 파우더"} {1}개 ({`10g`})
        </span>
        <span>{2800}원</span>
      </StyledMaterialListItem>

      <StyledNextButton>선택완료</StyledNextButton>
    </>
  );
};

export default SelfMake;

const StyledSelfMakeTitle = styled.header`
  text-align: left;
  font-size: 20px;
  letter-spacing: -1px;
  color: #333333;
  opacity: 1;

  margin-top: 30px;
  font-weight: bold;
  span {
    display: block;
    letter-spacing: -0.75px;
    color: #080808;
    font-size: 15px;
    margin-top: 15px;
    font-weight: 400;
  }
`;

// @TODO 여기 컴포넌트 분리가능
const StyledSurveyCardWrapper = styled.div`
  margin-top: 15px;
  display: flex;
  flex-wrap: wrap;

  img {
    width: 25%;
    cursor: pointer;
  }
`;

const StyledMaterialWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  span {
    font-size: 20px;
    font-weight: bold;
  }
  button {
    background: #e16a49 0% 0% no-repeat padding-box;
    border: 1px solid #e16a49;
    border-radius: 5px;
    opacity: 1;
    padding: 6px 8px;
    letter-spacing: -0.75px;
    color: #ffffff;
    cursor: pointer;
  }
`;

const StyledMaterialInfo = styled.div`
  font-size: 13px;
  letter-spacing: -0.65px;
  opacity: 1;
  margin-bottom: 15px;
  span {
    color: #e16a49;
  }
`;
// @TODO 여기 밑에 있는 listitem도 compo로 분리해서 빼내야할것 같다
const StyledMaterialListItem = styled.div`
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 5px;
  height: 45px;
  padding: 12px;
  opacity: 1;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;

  margin-bottom: 20px;
`;
