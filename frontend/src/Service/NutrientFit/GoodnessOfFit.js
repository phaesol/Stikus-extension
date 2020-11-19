import React from "react";
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
}) => {
  console.log("확인해보자아아아아아아아", check_final_order_nutrient);
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
            <b>{"5.0"}</b>
          </StyledProgressLabel>
          <StyledCircularProgressBack size={85} variant="static" value={100} />
          <StyledCircularProgress size={85} variant="static" value={100} />
        </ProgressBox>
      </StyledFitHeader>

      {Object.keys(check_final_order_nutrient).map((item) => (
        <StyledFitCardRow
          key={item}
          title={item}
          material={check_final_order_nutrient[item]}
        />
      ))}

      <StyledButtonWrapper>
        <StyledBackBtn onClick={() => history.goBack()}>
          다시 선택
        </StyledBackBtn>
        <StyledNextButton path={"/payment-page"}>
          그대로 만들기
        </StyledNextButton>
      </StyledButtonWrapper>
    </div>
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
