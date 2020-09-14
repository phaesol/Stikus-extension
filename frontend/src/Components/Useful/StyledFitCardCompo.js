import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles";
import styled from "styled-components";

const StyledFitCardCompo = ({ item }) => {
  const { name, amount, weight } = item;
  return (
    <StyledFitCard>
      <header>
        <span>{name}</span>
        <span>
          {amount}개 ( {weight}g )
        </span>
      </header>
      <div>적정용량</div>
      <StyledCardTriangle></StyledCardTriangle>
      <StyledCardFitBar variant="determinate" value={50} />
      <StyledCardFitBarLabel>
        <span>최소 ({0}개)</span>
        <span>추천 ({2}개)</span>
        <span>최대 ({5}개)</span>
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
  margin: 0 auto;
`;
