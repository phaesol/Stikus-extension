import React from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";

import { withStyles } from "@material-ui/core/styles";
import StyledPrevButton from "../../Components/button/StyledPrevButton";
import StyledNextButton from "../../Components/button/StyledNextButton";
import StyledFitCardRow from "../../Components/NutrientFit/StyledFitCardRow";

import { useState } from "react";

const GoodnessOfFit = () => {
  const [material, setMaterial] = useState([
    {
      id: 1,
      type: "기능성 원료",
      amount: "4",
      weight: "100",
      components: [
        { name: "힘이세지는/치커리", amount: 2, weight: 10, cost: 2800 },
        { name: "맛있는/치커리", amount: 3, weight: 30, cost: 2800 },
        { name: "냠냐미/치커리", amount: 4, weight: 50, cost: 2800 },
        { name: "후후후/치커리", amount: 5, weight: 10, cost: 2800 },
      ],
      toggle: false,
    },
    {
      id: 2,
      type: "비타민",
      amount: "4",
      weight: "115",
      components: [
        { name: "햇빛/비타D", amount: 7, weight: 30, cost: 2800 },
        { name: "이건비타오백/비타2", amount: 1, weight: 50, cost: 2800 },
        { name: "괴혈병의/비타C", amount: 2, weight: 20, cost: 2800 },
        { name: "구루병의/비타D", amount: 3, weight: 15, cost: 2800 },
      ],
      toggle: false,
    },
    {
      id: 3,
      type: "미네랄",
      amount: "3",
      weight: "90",
      components: [
        { name: "테란/SCV", amount: 10, weight: 15, cost: 2800 },
        { name: "프로토스/프로브", amount: 2, weight: 20, cost: 2800 },
        { name: "저그/드론", amount: 1, weight: 25, cost: 2800 },
        { name: "미네랄/캐기", amount: 5, weight: 30, cost: 2800 },
      ],
      toggle: false,
    },
    {
      id: 4,
      type: "배합용 파우더",
      amount: "2",
      weight: "50",
      components: [
        { name: "베이비/파우더", amount: 3, weight: 25, cost: 2800 },
        { name: "어른용/파우더", amount: 5, weight: 25, cost: 2800 },
      ],
      toggle: false,
    },
  ]);

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

      {material.map((item) => (
        <StyledFitCardRow key={item.id} material={item} />
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
