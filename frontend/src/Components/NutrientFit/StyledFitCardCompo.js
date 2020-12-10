import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles";
import styled, { css } from "styled-components";

const StyledFitCardCompo = ({ item, caution, weight }) => {
  const {
    nutrient,
    name,
    cnt,
    standard_amount,
    recommend_amount,
    recom_min,
    recom_max,
  } = item;
  // const whole_amount =
  //   Math.round((parseFloat(recom_max) * 10) / parseFloat(recom_min)) / 10;
  // const fit_amount =
  //   (parseFloat(recommend_amount) * cnt) / parseFloat(recom_min); //얘는 우리의 현재갯수
  // const fit_amount_deci = Math.round(fit_amount * 10) / 10; // 그갯수를 소수점으로 나타냄
  // let fit_amount_percent = (fit_amount_deci * 100) / whole_amount; //내 현재 용량이 전체 갯수의 몇퍼센트를 차지하나 확인
  // if (isNaN(fit_amount_percent)) {
  //   fit_amount_percent = 5;
  // } else if (fit_amount_percent > 100) {
  //   fit_amount_percent = 100;
  // }
  const cur_vol =
    Math.round((recommend_amount * cnt * 100) / (recom_max - recom_min)) >= 100
      ? 100
      : Math.round((recommend_amount * cnt * 100) / (recom_max - recom_min));
  console.log("컬 보르", cur_vol);
  return (
    <StyledFitCard caution={caution}>
      <header>
        <span>
          {name
            ? name.length > 16
              ? name.substring(0, 14) + "..."
              : name
            : nutrient.length > 16
            ? nutrient.substring(0, 14) + "..."
            : nutrient}
        </span>
        <span>
          {cnt}개 ( {(standard_amount * cnt) / 1000}g )
        </span>
      </header>
      {caution ? (
        <>
          <CautionMsg>{"현재 상태에 추천하지 않습니다."}</CautionMsg>
          <StyledCardFitBar
            variant="determinate"
            value={0} //이렇게 표시해주면 현재 양이 계산된다
          />
        </>
      ) : (
        <>
          <div>적정용량</div>
          <StyledCardTriangle pos={cur_vol}></StyledCardTriangle>
          <StyledCardFitBar
            variant="determinate"
            value={cur_vol} //이렇게 표시해주면 현재 양이 계산된다
          />
        </>
      )}

      <StyledCardFitBarLabel caution={caution}>
        <span>추천 ({weight >= 5 ? 2 : 1}개)</span>
        <span>
          최대 ({Math.round(recom_max / recommend_amount)}
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
  border: 3px solid none;
  ${(props) =>
    props.caution &&
    css`
      box-shadow: 0px 3px 6px none;
      border: 3px solid #e16a49;
    `}

  border-radius: 10px;
  opacity: 1;
  width: 250px;
  height: 135px;
  & > div {
    text-align: left;

    font-size: 15px;
    letter-spacing: -0.75px;
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
  ${(props) =>
    !props.caution &&
    css`
      & :nth-child(1) {
        color: #e16a49;
      }
    `}
`;

const StyledCardTriangle = styled.div`
  width: 0;
  height: 0;
  border-left: 7.5px solid transparent;
  border-right: 7.5px solid transparent;
  border-top: 15px solid #e16a49;
  margin-left: calc(${({ pos }) => pos}% - 7.5px);
`;

const CautionMsg = styled.div`
  font-size: 15px;
  letter-spacing: -0.75px;
  color: #e16a49;
  opacity: 1;
  margin-bottom: 15px;
`;
