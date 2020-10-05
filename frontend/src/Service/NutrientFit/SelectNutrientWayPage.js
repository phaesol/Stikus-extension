import React, { useState, useCallback } from "react";
import styled from "styled-components";
import QUESTION_BG from "../../Images/NutrientFit/question-bg.svg";
import StyledNextButton from "../../Components/button/StyledNextButton";
import { Link } from "react-router-dom";

function SelectNutrientWayPage() {
  const [way, setWay] = useState("");

  const handleChange = useCallback(
    (event) => {
      setWay(event.target.name);
    },
    [way]
  );
  // function choiceSurveyType(path) {
  //   history.push(path);
  // }
  // const goToSurveyPage = () => {
  //   // history.push('')
  //   // 여기서 way에 따라 분기해서 push해주면 된다!
  //   console.log(way);
  // };

  return (
    <>
      <StyledMainInfo>
        <span>2가지 중 선택</span>해 주세요.
      </StyledMainInfo>

      <StyledSurveyTypeWrapper>
        <StyledSurveyType to="Recommend-survey/">
          건강 맞춤
          <br />
          <span>
            설문으로 맞춤 <br />
            추천받기
          </span>
        </StyledSurveyType>
        <StyledSurveyType to="free-make">
          원료 맞춤 <br />
          <span>
            자유롭게 맞춤 <br />
            구성하기
          </span>
        </StyledSurveyType>
      </StyledSurveyTypeWrapper>
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
  width: 100%;
  height: 85vh;
  background-image: url(${QUESTION_BG});
  background-repeat: no-repeat;
  background-position: bottom;
  background-size: contain;
`;

const StyledMainInfo = styled.div`
  text-align: center;
  letter-spacing: -1.4px;
  color: #333333;
  opacity: 1;
  font-size: 28px;
  font-weight: 300;
  padding: 40px 0;
  span {
    font-weight: bold;
  }
`;

const StyledSurveyTypeWrapper = styled.div`
  display: flex;
  justify-content: center;
  a + a {
    margin-left: 15px;
  }

  a:nth-child(1) {
    border: 2px solid #e16a49;
    color: #e16a49;
  }
  a:nth-child(2) {
    border: 2px solid #2b428e;
    color: #2b428e;
  }
`;
const StyledSurveyType = styled(Link)`
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 10px;
  opacity: 1;
  font-size: 18px;
  padding: 20px;
  cursor: pointer;
  span {
    font-size: 22px;
    font-weight: 500;
  }
`;
