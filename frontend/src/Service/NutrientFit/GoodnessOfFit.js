import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withRouter } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import StyledPrevButton from "../../Components/button/StyledPrevButton";
import StyledNextButton from "../../Components/button/StyledNextButton";
import StyledFitCardRow from "../../Components/NutrientFit/StyledFitCardRow";

const GoodnessOfFit = ({
  choosecards,
  check_final_order_nutrient,
  history,
  caution_nutrient,
  weight,
}) => {
  console.log("확인해보자아아아아아아아", check_final_order_nutrient);
  const fitscore = 5 - caution_nutrient.length;
  const [visible, setVisible] = useState(false);
  return (
    <>
      {visible && (
        <>
          <BlackBg></BlackBg>
          <CautionModal>
            <p>
              추천하지 않는 원료가
              <br /> 포함되어있습니다.
              <br /> 그래도{" "}
              {caution_nutrient.map((item) => (
                <span>{item}</span>
              ))}
              를 선택하시겠습니까?
            </p>
            <StyledButtonWrapper>
              <StyledPrevButton to={"/payment-page"}>만들기</StyledPrevButton>
              <StyledReButton onClick={() => setVisible(false)}>
                다시 선택
              </StyledReButton>
            </StyledButtonWrapper>
          </CautionModal>
        </>
      )}
      <StyledFitHeader>
        <p>
          선택하신 원료들은
          <br />
          <b>{fitscore > 2.5 ? "적합" : "부적합"}</b> 합니다.
        </p>
        <ProgressBox>
          <StyledProgressLabel>
            적합도
            <b>{fitscore}</b>
          </StyledProgressLabel>
          <StyledCircularProgressBack size={85} variant="static" value={100} />
          <StyledCircularProgress
            size={85}
            variant="static"
            value={fitscore * 20}
          />
        </ProgressBox>
      </StyledFitHeader>

      {Object.keys(check_final_order_nutrient).map((item) => {
        console.log(check_final_order_nutrient[item], "야야야야약");
        return (
          <StyledFitCardRow
            weight={weight}
            key={item}
            title={item}
            material={check_final_order_nutrient[item]}
            caution_nutrient={caution_nutrient}
            caution={caution_nutrient.some(
              (ele) => ele in check_final_order_nutrient[item]
            )}
          />
        );
      })}

      <StyledButtonWrapper>
        <StyledBackBtn onClick={() => history.goBack()}>
          다시 선택
        </StyledBackBtn>
        {caution_nutrient.length >= 1 ? (
          <StyledReButton onClick={() => setVisible(true)}>
            그대로 만들기
          </StyledReButton>
        ) : (
          <StyledNextButton to={"/payment-page"}>
            그대로 만들기
          </StyledNextButton>
        )}
      </StyledButtonWrapper>
    </>
  );
};

export default withRouter(GoodnessOfFit);

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

const StyledBackBtn = styled.button`
  border: none;
  background: none;
  background: #f2f2f2 0% 0% no-repeat padding-box;
  border-radius: 5px;
  opacity: 1;
  text-align: center;
  font-size: 18px;
  padding: 10px 0;
  width: 150px;
  letter-spacing: -0.9px;
  color: #2b428e;
  opacity: 1;
  margin-right: 15px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    color: #3854b0;
    background-color: #c9c9c9;
  }
`;

const BlackBg = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background-color: #080808;
  opacity: 0.4;
  z-index: 10;
`;

const CautionModal = styled.div`
  width: 320px;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 10px;
  opacity: 1;
  padding: 15px;
  box-sizing: border-box;
  color: #333333;
  margin-top: 100px;
  position: fixed;
  left: calc(50% - 160px);
  top: 0;
  background-color: white;
  & > p {
    text-align: center;
    padding: 30px 0;
  }
  & > p > span {
    color: #e16a49;
  }
  z-index: 15;
  & span + span:before {
    content: "\\2C";
    padding-right: 5px;
  }
`;

const StyledReButton = styled.button`
  border: none;
  background: none;
  font-size: 17px;
  width: 100%;
  height: 45px;
  background: #2b428e;
  border-radius: 5px;
  letter-spacing: -0.9px;
  color: #ffffff;
  cursor: pointer;
`;
