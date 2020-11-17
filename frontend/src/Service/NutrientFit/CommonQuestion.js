import React from 'react';
import styled, { css } from "styled-components";

const CommonQuestion = () => {
    return (
      <>
        <>
          <StyledSurveyInfoWrapper>
            <StyledSurveyStep>Q) 공통질문</StyledSurveyStep>
            <StyledSurveyInfo>
              해당되는 사항을 네 또는 아니요 에 체크해주세요.
            </StyledSurveyInfo>
            <StyledCheckWrapper>
              {/* {mySurveyList[step - 2].question.map((item) => (
                <StyledCheckItem key={item.survey_question_pk}>
                  {item.state ? (
                    <OrangeCheckBox
                      item={item}
                      onChange={_onChange}
                      outline={true}
                    />
                  ) : (
                    <OrangeCheckBox item={item} onChange={_onChange} />
                  )}
                </StyledCheckItem>
              ))} */}
              
            </StyledCheckWrapper>
          </StyledSurveyInfoWrapper>
          <StyledButtonWrapper>
            <StyledPrevButton
              step={step - 1 - noQuestionCnt}
              moveStep={moveStep}
            >
              이전
            </StyledPrevButton>
            <StyledNextButton
              step={step + 1}
              moveStep={moveStep}
              disabled={isDisabled.current}
            >
              적합도 측정하기
            </StyledNextButton>
          </StyledButtonWrapper>
        </>
      </>
    );
};

export default CommonQuestion;


const StyledSurveyInfoWrapper = styled.div`
  margin-top: 30px;
`;

const StyledSurveyStep = styled.div`
  font-weight: bold;
  font-size: 18px;
`;

const StyledSurveyInfo = styled.div`
  font-size: 22px;
  margin: 5px 0;

  span {
    color: #e16a49;
    font-weight: bold;
  }
`;

const StyledCheckWrapper = styled.div`
  margin-top: 30px;
`;

const StyledCheckItem = styled.div`
  display: flex;
  text-align: left;
  font-weight: 300;
  letter-spacing: -0.85px;
  color: #333333;
  letter-spacing: -0.85px;
  color: #a5a4a4;

  & + & {
    margin-top: 20px;
  }
`;



const StyledButtonWrapper = styled.div`
  margin-top: 15px;
  display: flex;
`;
