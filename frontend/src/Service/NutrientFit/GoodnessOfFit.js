import React from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";

import { withStyles } from "@material-ui/core/styles";
import StyledPrevButton from "../../Components/button/StyledPrevButton";
import StyledNextButton from "../../Components/button/StyledNextButton";
import StyledFitCardRow from "../../Components/NutrientFit/StyledFitCardRow";

import { useState } from "react";

const GoodnessOfFit = ({ choosecards, materialList }) => {
  return (
    <div>
      <StyledFitHeader>
        <p>
          선택하신 원료들은
          <br />
          <b>적합</b> 합니다.
        </p>
        <ProgressBox>
          <StyledProgressLabel>
            적합도
            <b>{3.8}</b>
          </StyledProgressLabel>
          <StyledCircularProgressBack size={85} variant="static" value={100} />
          <StyledCircularProgress size={85} variant="static" value={85} />
        </ProgressBox>
      </StyledFitHeader>

      {Object.keys(materialList).map((item) => (
        <StyledFitCardRow
          key={item}
          title={item}
          material={materialList[item]}
        />
      ))}

      <StyledButtonWrapper>
        <StyledPrevButton path={"/Survey-result"}>다시 선택</StyledPrevButton>
        <StyledNextButton path={"/payment-page"}>
          그대로 만들기
        </StyledNextButton>
      </StyledButtonWrapper>
    </div>
  );
};

export default GoodnessOfFit;

const StyledCircularProgress = withStyles({
  colorPrimary: {
    color: "#E16A49 ",
  },
  svg: {
    strokeLinecap: "round",
  },
})(CircularProgress);

const StyledCircularProgressBack = withStyles({
  root: {
    position: "absolute",
    left: "0px",
  },
  colorPrimary: {
    color: "#F2F2F2",
  },
})(CircularProgress);

const ProgressBox = styled.div`
  position: relative;
`;

const StyledProgressLabel = styled.div`
  position: absolute;
  width: 85px;
  height: 85px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  letter-spacing: -0.65px;
  color: #333333;
  b {
    text-align: center;
    font-size: 18px;
    letter-spacing: -0.9px;
    color: #e16a49;
  }
`;

const StyledFitHeader = styled.div`
  margin-top: 40px;
  text-align: left;
  font-size: 20px;
  letter-spacing: -1px;
  color: #333333;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  & > p > b {
    text-align: left;
    font-size: 28px;
    letter-spacing: -1.4px;
    color: #e16a49;
  }
`;

const StyledButtonWrapper = styled.div`
  margin-top: 15px;
  display: flex;
`;
