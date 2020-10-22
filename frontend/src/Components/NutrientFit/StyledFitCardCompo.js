import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles";
import styled, { css } from "styled-components";

const StyledFitCardCompo = ({ item }) => {
  const {
    nutrient,
    name,
    cnt,
    standard_amount,
    recommend_amount,
    recom_min,
    recom_max,
  } = item;
  const whole_amount =
    Math.round((parseFloat(recom_max) * 10) / parseFloat(recom_min)) / 10;
  const fit_amount =
    (parseFloat(recommend_amount) * cnt) / parseFloat(recom_min); //얘는 우리의 현재갯수
  const fit_amount_deci = Math.round(fit_amount * 10) / 10; // 그갯수를 소수점으로 나타냄
  console.log(recommend_amount, "asdasdasdasdasd");
  let fit_amount_percent = (fit_amount_deci * 100) / whole_amount; //내 현재 용량이 전체 갯수의 몇퍼센트를 차지하나 확인
  if (isNaN(fit_amount_percent)) {
    fit_amount_percent = 5;
  } else if (fit_amount_percent > 100) {
    fit_amount_percent = 100;
  }
  return (
    <StyledFitCard>
      <header>
        <span>{name ? name : nutrient}</span>
        <span>
          {cnt}개 ( {standard_amount * cnt}g )
        </span>
      </header>
      <div>적정용량</div>
      <StyledCardTriangle pos={fit_amount_percent}></StyledCardTriangle>
      <StyledCardFitBar
        variant="determinate"
        value={fit_amount_percent} //이렇게 표시해주면 현재 양이 계산된다
      />
      <StyledCardFitBarLabel>
        <span>
          최소 (
          {Math.round(
            (parseFloat(recom_min) * 10) / parseFloat(recommend_amount)
          ) / 10}
          개)
        </span>
        <span>추천 (1개)</span>
        <span>
          최대 (
          {Math.round(
            (parseFloat(recom_max) * 10) / parseFloat(recommend_amount)
          ) / 10}
          개)
        </span>
      </StyledCardFitBarLabel>
    </StyledFitCard>
  );
};

export default StyledFitCardCompo;

const StyledFitCard = styled.div`
  display: inline-block;
  padding: 15px;
  box-sizing: border-box;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 10px;
  opacity: 1;
  width: 250px;
  height: 135px;

  & > div {
    text-align: left;

    font-size: 15px;
    letter-spacing: -0.75px;
    color: #333333;
    font-weight: bold;
    opacity: 1;
  }
  & + & {
    margin-left: 20px;
  }

  & > header {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    font-weight: bold;
    margin-bottom: 10px;
    letter-spacing: -0.65px;
    opacity: 1;
  }
  & > header span:nth-child(1) {
    color: #2b428e;
  }
`;
const StyledCardFitBar = withStyles((theme) => ({
  root: {
    height: 15,
    borderRadius: 7,
  },
  colorPrimary: {
    backgroundColor: "#F2F2F2 ",
  },
  bar: {
    borderRadius: 7,
    backgroundColor: "#E16A49",
  },
}))(LinearProgress);

const StyledCardFitBarLabel = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  font-weight: bold;
  color: #a5a4a4;
  margin-top: 5px;
  & :nth-child(2) {
    color: #e16a49;
  }
`;

const StyledCardTriangle = styled.div`
  width: 0;
  height: 0;
  border-left: 7.5px solid transparent;
  border-right: 7.5px solid transparent;
  border-top: 15px solid #e16a49;
  margin-left: calc(${({ pos }) => pos}% - 7.5px);
`;
