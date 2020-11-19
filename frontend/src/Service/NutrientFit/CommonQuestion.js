import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import styled, { css } from "styled-components";
import OrangeCheckBox from "../../Components/button/OrangeCheckBox";
import StyledNextButton from "../../Components/button/StyledNextButton";
import StyledPrevButton from "../../Components/button/StyledPrevButton";

const CommonQuestion = ({ history }) => {
  const [commonSurvey, setCommonSurvey] = useState([
    { id: 1, name: "1) 반려동물이 임신 중 인가요?", state: false },
    { id: 2, name: "2) 반려동물이 신장질환을 앓고 있나요?", state: false },
    { id: 3, name: "3) 반려동물에게 결석이 있나요?", state: false },
  ]);

  const [kidneySurvey, setKidneySurvey] = useState([
    {
      health: "신장건강",
      question: [
        {
          survey_question: 27,
          content: "신장에는 문제가 없지만 예방을 원해요",
          state: false,
        },
        {
          survey_question: 28,
          content: "신장에 문제가 있지만 초기라고 진단 받았어요",
          state: false,
        },
        {
          survey_question: 29,
          content: "신장에 문제가 있고 인 수치가 높아요",
          state: false,
        },
        {
          survey_question: 30,
          content: "신장에 문제가 있고 빈혈도 있어요",
          state: false,
        },
      ],
    },
  ]);
  function changeState(id) {
    setCommonSurvey(
      commonSurvey.map((item) =>
        item.id === id ? { ...item, state: !item.state } : item
      )
    );
  }
  function _onChange(id) {
    // checkSurvey(id);
    console.log("야!");
  }
  function commonSurveySubmit(path) {
    console.log("이거 실행하고 푸시해줄거임");
    history.push(path);
  }
  return (
    <>
      <StyledSurveyInfoWrapper>
        <StyledSurveyStep>Q1) 공통질문</StyledSurveyStep>
        <StyledSurveyInfo>
          해당되는 사항을 <br />
          <span>네</span> 또는 <span>아니요</span> 에 <span>체크</span>
          해주세요.
        </StyledSurveyInfo>

        {commonSurvey.map((item) => (
          <StyledOXRow key={item.id}>
            <span>{item.name}</span>
            <br />
            <StyledButtonWrapper>
              {item.state ? (
                <>
                  <StyledButton onClick={() => changeState(item.id)} active>
                    네
                  </StyledButton>
                  <StyledButton onClick={() => changeState(item.id)}>
                    아니요
                  </StyledButton>
                </>
              ) : (
                <>
                  <StyledButton onClick={() => changeState(item.id)}>
                    네
                  </StyledButton>
                  <StyledButton onClick={() => changeState(item.id)} active>
                    아니요
                  </StyledButton>
                </>
              )}
            </StyledButtonWrapper>
            {item.id === 2 && item.state === true && (
              <StyledSurveyInfoWrapper>
                <StyledSurveyInfo>
                  2-1) <span>신장질환</span>에 해당하는 증상을 모두 선택하세요.
                </StyledSurveyInfo>
                <StyledCheckWrapper>
                  {kidneySurvey[0].question.map((item) => (
                    <StyledCheckItem key={item.survey_question_pk}>
                      {item.state ? (
                        <OrangeCheckBox
                          item={item}
                          onChange={() => {
                            console.log("dididididididididi");

                            setKidneySurvey([
                              {
                                health: "신장건강",
                                question: kidneySurvey[0].question.map((q) =>
                                  q.survey_question === item.survey_question
                                    ? { ...q, state: !q.state }
                                    : q
                                ),
                              },
                            ]);
                          }}
                          common
                          outline={1}
                        />
                      ) : (
                        <OrangeCheckBox
                          item={item}
                          common
                          onChange={() => {
                            console.log("dididididididididi");
                            setKidneySurvey([
                              {
                                health: "신장건강",
                                question: kidneySurvey[0].question.map((q) =>
                                  q.survey_question === item.survey_question
                                    ? { ...q, state: !q.state }
                                    : q
                                ),
                              },
                            ]);
                          }}
                        />
                      )}
                    </StyledCheckItem>
                  ))}
                </StyledCheckWrapper>
              </StyledSurveyInfoWrapper>
            )}
          </StyledOXRow>
        ))}
      </StyledSurveyInfoWrapper>

      <StyledButtonWrapper>
        <StyledPrevButton to="/selfmakelist">이전</StyledPrevButton>
        <FuncWithNextBtn
          // to="/goodness-of-fit"
          onClick={() => commonSurveySubmit("/goodness-of-fit")}
        >
          다음페이지
        </FuncWithNextBtn>
      </StyledButtonWrapper>
    </>
  );
};

export default withRouter(CommonQuestion);

const StyledSurveyInfoWrapper = styled.div`
  margin-top: 30px;
`;

const StyledSurveyStep = styled.div`
  font-weight: bold;
  font-size: 18px;
`;

const StyledSurveyInfo = styled.div`
  font-size: 18px;
  margin: 5px 0;

  & > span {
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

const StyledOXRow = styled.div`
  margin-top: 30px;

  & > span {
    text-align: left;
    letter-spacing: -0.85px;
    font-size: 17px;

    color: #333333;
    opacity: 1;
  }
`;

const StyledButtonWrapper = styled.div`
  margin-top: 15px;
  display: flex;
`;

const StyledButton = styled.button`
  border: none;
  background: none;
  flex: 1;
  border: 1px solid #a5a4a4;
  border-radius: 5px;

  padding: 10px 0;
  opacity: 1;
  cursor: pointer;

  text-align: center;
  font-size: 17px;
  letter-spacing: -0.85px;
  opacity: 1;
  color: #a5a4a4;
  transition: 0.2s all ease-out;
  outline: none;

  & + & {
    margin-left: 15px;
  }

  &:hover {
    background: #ddd 0% 0% no-repeat padding-box;
    color: #737373;
    transition: 0.2s all ease-out;
  }

  ${(props) =>
    props.active &&
    css`
      border: 2px solid #e16a49;
      font-weight: bold;
      background: #ffffff 0% 0% no-repeat padding-box;
      color: #e16a49;
      &:hover {
        background: #a64b32;
        color: #ffffff;
        transition: 0.2s all ease-out;
      }
    `}
`;

const FuncWithNextBtn = styled.button`
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

  ${(props) =>
    props.disabled &&
    css`
      background: #7787ba;

      cursor: not-allowed;
    `}
`;
