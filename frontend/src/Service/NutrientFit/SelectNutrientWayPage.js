import React, { useState, useCallback } from "react";
import styled from "styled-components";
import QUESTION_BG from "../../Images/NutrientFit/question-bg.svg";
import StyledNextButton from "../../Components/button/StyledNextButton";
import OrangeCheckBox from "../../Components/button/OrangeCheckBox";
function SelectNutrientWayPage() {
  const [way, setWay] = useState("");

  const handleChange = useCallback(
    (event) => {
      setWay(event.target.name);
    },
    [way]
  );

  const goToSurveyPage = () => {
    // history.push('')
    // 여기서 way에 따라 분기해서 push해주면 된다!
    console.log(way);
  };

  return (
    <>
      <StyledMainInfo>2가지 중 선택해 주세요.</StyledMainInfo>

      <StyledSelectWrapper>
        <OrangeCheckBox
          onChange={handleChange}
          checked={way === "recommend" ? true : false}
          id="recommend"
          name="recommend"
          label="건강 맞춤으로 선택 / 설문으로 맞춤 추천받기"
        />
      </StyledSelectWrapper>
      <StyledSelectWrapper>
        <StyledSelectInput
          onChange={handleChange}
          checked={way === "self" ? true : false}
          id="self"
          name="self"
        />
        <StyledLabel htmlFor="self">
          원료 맞춤으로 선택 / 자유롭게 맞춤 구성하기
        </StyledLabel>
      </StyledSelectWrapper>
      <StyledNextButton path={"/Recommend-servey"}>다음</StyledNextButton>

      <StyledBackGround></StyledBackGround>
    </>
  );
}

export default React.memo(SelectNutrientWayPage);

const StyledBackGround = styled.div`
  position: absolute;
  z-index: -1;
  bottom: 0;
  right: 0;
  width: 100vw;
  height: 85vh;
  background-image: url(${QUESTION_BG});
  background-repeat: no-repeat;
  background-position: bottom;
  background-size: contain;
`;

const StyledMainInfo = styled.div`
  display: flex;
  margin: 25px 0 30px 0;
  font-size: 28px;
  font-weight: 700;
  color: #e16a49;
  letter-spacing: -1.4px;
`;

const StyledSelectWrapper = styled.div`
  padding: 15px 0;
`;

const StyledSelectInput = styled.input.attrs({
  type: "checkbox",
})`
  cursor: pointer;
`;

const StyledLabel = styled.label`
  letter-spacing: -0.85px;
  color: #333333;
  font-size: 17px;
  cursor: pointer;
`;
