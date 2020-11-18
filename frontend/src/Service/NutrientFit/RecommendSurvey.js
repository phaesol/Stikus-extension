import React, { useRef } from "react";
import styled, { css } from "styled-components";
import StyledNextButton from "../../Components/button/StyledNextButton";
import ImageCard from "../../Components/NutrientFit/ImageCard";
import OrangeCheckBox from "../../Components/button/OrangeCheckBox";
import { useState } from "react";
import StyledPrevButton from "../../Components/button/StyledPrevButton";
import axios from "axios";

// @TODO back flow시 3개 선택 팝업이 계속 뜨나.
// @TODO 넘어갈때 3개
const RecommendSurvey = ({
  choosecards,
  choicecard,
  mySurveyList,
  responseSurvey,
  checkSurvey,
}) => {
  const [error, setError] = useState(null);

  const [step, setStep] = useState(1);
  const noQuestionCnt = mySurveyList.filter(
    (item) => item.question[0].content === null
  ).length;

  console.log(noQuestionCnt, "###############################");
  let getSurvey = useRef(true);
  let isDisabled = useRef(true);

  const [common, setCommon] = useState([
    { id: 1, name: "1) 반려동물이 임신 중 인가요?", state: false },
    { id: 2, name: "2) 반려동물이 신장질환을 앓고 있나요?", state: false },
  ]);

  // const nullQeustion = mySurveyList.filter(
  //   (item) => item.question[0].content === ""
  // ).length;
  // console.log("비어이;ㅆ는거 확인하실?", nullQeustion);

  //카드 토글
  function onToggle(name) {
    if (choosecards.filter((ele) => ele.choice === true).length < 3) {
      choicecard(name);
      console.log("계속 돌아갈 부분");
    } else {
      const changeIndex = choosecards.findIndex((ele) => ele.name === name);
      if (choosecards[changeIndex].choice == true) {
        choicecard(name);
        console.log("삭제할 애들", name);
      } else {
        console.log("얘는 그냥 추가하면 안되고 무시해야함");
      }
    }
  }
  // step을 이동하기위한 function
  async function moveStep(step) {
    switch (step) {
      case 2:
        if (choosecards.filter((ele) => ele.choice === true).length === 3) {
          if (getSurvey.current)
            try {
              const checkcards = choosecards
                .filter((ele) => ele.choice === true)
                .map((item) => item.name.substring(2));

              const res = await axios.post("http://api.doctorfit.net/survey", {
                selected_health: checkcards,
              });

              responseSurvey(res.data);

              console.log(res);
            } catch (e) {
              setError(e);
            }
          setStep(step);
        } else alert("3개 선택을 마쳐주세요");
        break;
      case 1:
      case 3:
      case 4:
      case 5:
        setStep(step);
        break;

      default:
        break;
    }
  }

  // 말그대로 설문조사 문제 checking toggle설정하기

  function _onChange(id) {
    checkSurvey(id);
  }

  //공통 질문 chagne toggle color
  function changeState(id) {
    setCommon(
      common.map((item) =>
        item.id === id ? { ...item, state: !item.state } : item
      )
    );
  }

  // 장건강만 카드색갈 다른거 처리해야함
  switch (step) {
    case 1:
      getSurvey.current = true;
      return (
        <>
          <StyledSurveyInfoWrapper>
            <StyledSurveyStep>Q1) 건강관리 항목 선택</StyledSurveyStep>
            <StyledSurveyInfo>
              현재 불편하거나 걱정이 되는
              <br />
              <span>3가지 건강을 선택</span>
              하세요
            </StyledSurveyInfo>
            <StyledSurveyInfo sub={true}>
              ( 나이에 따라 추천 항목은 파란선으로 표시됩니다. )
            </StyledSurveyInfo>
            <StyledCardInfo>
              <div>
                <div></div>추천항목
              </div>
              <div>
                <div></div>선택
              </div>
            </StyledCardInfo>
          </StyledSurveyInfoWrapper>

          <StyledSurveyCardWrapper>
            {choosecards.map((item) => (
              <ImageCard key={item.name} item={item} onToggle={onToggle} />
            ))}
            {/* <ImageCard /> */}
          </StyledSurveyCardWrapper>
          <StyledNextButton step={2} moveStep={moveStep}>
            다음페이지
          </StyledNextButton>
        </>
      );
      break;

    case 2:
    case 3:
    case 4:
      getSurvey.current = false;
      isDisabled.current = true;
      console.log(
        mySurveyList[step - 2].question,
        "<====================",
        step
      );

      if (mySurveyList[step - 2].question[0].content !== null) {
        mySurveyList[step - 2].question.map((item) => {
          if (item.state === true) {
            isDisabled.current = false;
          }
        });

        return (
          <>
            <StyledSurveyInfoWrapper>
              <StyledSurveyStep>
                Q2-{step - 1 - noQuestionCnt}) {mySurveyList[step - 2].health}{" "}
                항목 선택
              </StyledSurveyStep>
              <StyledSurveyInfo>
                <span>{mySurveyList[step - 2].health}</span>에 해당하는 증상을
                <br /> 모두 선택하세요.
              </StyledSurveyInfo>
              <StyledCheckWrapper>
                {mySurveyList[step - 2].question.map((item) => (
                  <StyledCheckItem key={item.survey_question_pk}>
                    {item.state ? (
                      <OrangeCheckBox
                        item={item}
                        onChange={_onChange}
                        outline = {true}
                      />
                    ) : (
                      <OrangeCheckBox
                        item={item}
                        onChange={_onChange}
                        
                      />
                    )}
                  </StyledCheckItem>
                ))}
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
                다음페이지
              </StyledNextButton>
            </StyledButtonWrapper>
          </>
        );
      } else {
        moveStep(step + 1);
      }
      break;

    case 5:
      return (
        <>
          <StyledSurveyInfoWrapper>
            <StyledSurveyStep>Q3) 마지막 설문이에요</StyledSurveyStep>
            <StyledSurveyInfo>
              해당되는 사항을 <br />
              <span>네</span> 또는 <span>아니요</span> 에 <span>체크</span>
              해주세요.
            </StyledSurveyInfo>

            {common.map((item) => (
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
              </StyledOXRow>
            ))}
          </StyledSurveyInfoWrapper>

          <StyledButtonWrapper>
            <StyledPrevButton step={4 - noQuestionCnt} moveStep={moveStep}>
              이전
            </StyledPrevButton>
            <StyledNextButton path={"/Survey-result"} moveStep={moveStep}>
              다음페이지
            </StyledNextButton>
          </StyledButtonWrapper>
        </>
      );
      break;

    default:
      console.log("default");
      break;
  }
};

export default RecommendSurvey;

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
  ${(props) =>
    props.sub &&
    css`
      letter-spacing: -0.75px;
      color: #080808;
      font-size: 15px;
      font-weight: 300;
    `}
`;

const StyledCardInfo = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 15px;
  letter-spacing: -0.75px;

  div + div {
    margin-left: 20px;
  }
  div {
    display: flex;
  }
  div:nth-child(1) {
    color: #2b428e;
  }
  div:nth-child(2) {
    color: #e16a49;
  }
  div:nth-child(1) div {
    width: 22px;
    height: 22px;
    border: 2px solid #2b428e;
    border-radius: 3px;
    margin-right: 5px;
  }
  div:nth-child(2) div {
    width: 22px;
    height: 22px;
    background-color: #e16a49;
    border: 2px solid #e16a49;
    border-radius: 3px;

    margin-right: 5px;
  }
`;

const StyledSurveyCardWrapper = styled.div`
  margin-top: 15px;
  display: flex;
  flex-wrap: wrap;

  img {
    width: 25%;
    cursor: pointer;
  }
`;

// Step2
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

// Step3

const StyledOXRow = styled.div`
  margin-top: 30px;

  span {
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
      background: #e16a49 0% 0% no-repeat padding-box;
      color: #ffffff;
      &:hover {
        background: #a64b32;
        color: #ffffff;
        transition: 0.2s all ease-out;
      }
    `}
`;
