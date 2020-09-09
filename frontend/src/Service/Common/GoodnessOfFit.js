import React from "react";
import styled, { css } from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import LinearProgress from "@material-ui/core/LinearProgress";

import { withStyles } from "@material-ui/core/styles";
import StyledPrevButton from "../../Components/button/StyledPrevButton";
import StyledNextButton from "../../Components/button/StyledNextButton";

const GoodnessOfFit = () => {
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
      <StyledFitCardWrapper>
        <StyledFitCardLabel>기능성원료</StyledFitCardLabel>
        <CardList>
          <StyledFitCard>
            <header>
              <span>이눌린 / 치커리추출물</span>
              <span>2개 ( 10g )</span>
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
          <StyledFitCard>
            <header>
              <span>이눌린 / 치커리추출물</span>
              <span>2개 ( 10g )</span>
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
          <StyledFitCard>
            <header>
              <span>이눌린 / 치커리추출물</span>
              <span>2개 ( 10g )</span>
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
          <StyledFitCard>
            <header>
              <span>이눌린 / 치커리추출물</span>
              <span>2개 ( 10g )</span>
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
          <StyledFitCard>
            <header>
              <span>이눌린 / 치커리추출물</span>
              <span>2개 ( 10g )</span>
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
        </CardList>
      </StyledFitCardWrapper>

      <StyledFitCardWrapper>
        <StyledFitCardLabel>기능성원료</StyledFitCardLabel>
        <CardList>
          <StyledFitCard>
            <header>
              <span>이눌린 / 치커리추출물</span>
              <span>2개 ( 10g )</span>
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
          <StyledFitCard>
            <header>
              <span>이눌린 / 치커리추출물</span>
              <span>2개 ( 10g )</span>
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
          <StyledFitCard>
            <header>
              <span>이눌린 / 치커리추출물</span>
              <span>2개 ( 10g )</span>
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
          <StyledFitCard>
            <header>
              <span>이눌린 / 치커리추출물</span>
              <span>2개 ( 10g )</span>
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
          <StyledFitCard>
            <header>
              <span>이눌린 / 치커리추출물</span>
              <span>2개 ( 10g )</span>
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
        </CardList>
      </StyledFitCardWrapper>

      <StyledFitCardWrapper>
        <StyledFitCardLabel>기능성원료</StyledFitCardLabel>
        <CardList>
          <StyledFitCard>
            <header>
              <span>이눌린 / 치커리추출물</span>
              <span>2개 ( 10g )</span>
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
          <StyledFitCard>
            <header>
              <span>이눌린 / 치커리추출물</span>
              <span>2개 ( 10g )</span>
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
          <StyledFitCard>
            <header>
              <span>이눌린 / 치커리추출물</span>
              <span>2개 ( 10g )</span>
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
          <StyledFitCard>
            <header>
              <span>이눌린 / 치커리추출물</span>
              <span>2개 ( 10g )</span>
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
          <StyledFitCard>
            <header>
              <span>이눌린 / 치커리추출물</span>
              <span>2개 ( 10g )</span>
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
        </CardList>
      </StyledFitCardWrapper>

      <StyledButtonWrapper>
        <StyledPrevButton step={"/Servey-result"}>다시 선택</StyledPrevButton>
        <StyledNextButton path={"/goodness-of-fit"}>
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

const StyledFitCardWrapper = styled.div`
  & + & {
    margin-top: 20px;
  }
`;

const StyledFitCardLabel = styled.div`
  text-align: left;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: -0.9px;
  color: #333333;
  opacity: 1;
  margin-bottom: 5px;
`;
const CardList = styled.div`
  overflow-x: auto;
  white-space: nowrap;
  padding-bottom: 10px;
  ::-webkit-scrollbar {
    height: 5px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background-color: #f2f2f2;
    border-radius: 10px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background-color: #e16a49;
    border-radius: 5px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background-color: #ba563a;
  }
`;
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

const StyledButtonWrapper = styled.div`
  margin-top: 15px;
  display: flex;
`;
