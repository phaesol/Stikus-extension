import React from "react";
import styled, { css } from "styled-components";
import StyledNextButton from "../../Components/button/StyledNextButton";
import ImageCard from "../../Components/Useful/ImageCard";
import OrangeCheckBox from "../../Components/button/OrangeCheckBox";
import { useState } from "react";
import StyledPrevButton from "../../Components/button/StyledPrevButton";

const RecommendServey = () => {
  const [health, setHealth] = useState([]);

  const [cards, setCards] = useState([
    { name: "h-bone", choice: false, recommend: true },
    { name: "h-brain", choice: false, recommend: false },
    { name: "h-diabetes", choice: false, recommend: false },
    { name: "h-eyes", choice: false, recommend: false },
    { name: "h-growth", choice: false, recommend: false },
    { name: "h-heart", choice: false, recommend: true },
    { name: "h-intestine", choice: false, recommend: false },
    { name: "h-kidney", choice: false, recommend: false },
    { name: "h-liver", choice: false, recommend: true },
    { name: "h-obesity", choice: false, recommend: false },
    { name: "h-respirator", choice: false, recommend: false },
    { name: "h-skin", choice: false, recommend: false },
    { name: "h-tooth", choice: false, recommend: false },
    { name: "h-tumor", choice: false, recommend: false },
    { name: "h-urinary", choice: false, recommend: false },
  ]);
  const [step, setStep] = useState(3);
  const [specific, setSpecific] = useState([
    { id: 1, name: "아토피가 있어요", state: true },
    { id: 2, name: "피부가 건조하고 각질이 많아요", state: false },
  ]);
  const [common, setCommon] = useState([
    { id: 1, name: "1) 반려동물이 임신 중 인가요?", state: true },
    { id: 2, name: "2) 반려동물이 신장질환을 앓고 있나요?", state: true },
  ]);
  // 지금은 구조를 이렇게 짰지만 data를 주고 받는 과정에서 name으로 설정해야할 부분을 생각해봐야할것 같다.
  function onToggle(name) {
    if (health.indexOf(name) !== -1) {
      console.log("야야야야야", health.indexOf(name));

      setHealth(health.filter((item) => item !== name));
      setCards(
        cards.map((card) =>
          card.name === name ? { ...card, choice: !card.choice } : card
        )
      );
    }
    //이조건 체크부분 나중에 따로 함수로 분리해서 좀더 이쁘게 해줄수 있을듯
    else {
      if (health.length < 3) {
        console.log("야야야야야");
        setHealth(health.concat(name));
        setCards(
          cards.map((card) =>
            card.name === name ? { ...card, choice: !card.choice } : card
          )
        );
      }
    }
  }

  function moveStep(step) {
    console.log("??");
    if (health.length === 3) {
      setStep((step = step));
      console.log(step);
    } else alert("3개 선택을 마쳐주세요");
  }

  function _onChange(id) {
    setSpecific(
      specific.map((item) =>
        item.id === id ? { ...item, state: !item.state } : item
      )
    );
  }

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
      return (
        <>
          <StyledServeyInfoWrapper>
            <StyledServeyStep>Q1) 건강관리 항목 선택</StyledServeyStep>
            <StyledServeyInfo>
              현재 불편하거나 걱정이 되는
              <br />
              <span>3가지 건강을 선택</span>
              하세요
            </StyledServeyInfo>
            <StyledServeyInfo sub={true}>
              ( 나이에 따라 추천 항목은 파란선으로 표시됩니다. )
            </StyledServeyInfo>
            <StyledCardInfo>
              <div>
                <div></div>추천항목
              </div>
              <div>
                <div></div>선택
              </div>
            </StyledCardInfo>
          </StyledServeyInfoWrapper>

          {/* recommend, 만약 선택한 state랑같으면 해당 card item만 checked로 옵션변경,
        총 max 3개까지만 들어갈수 있게
        그리고 눌렀던것 재클릭하면 사라지게, 파란색 + 색깔은 색ㄲ라만 보여주게 */}
          <StyledServeyCardWrapper>
            {cards.map((item) => (
              <ImageCard key={item.name} item={item} onToggle={onToggle} />
            ))}
            {/* <ImageCard /> */}
          </StyledServeyCardWrapper>
          <StyledNextButton step={2} moveStep={moveStep}>
            다음페이지
          </StyledNextButton>
        </>
      );
    case 2:
      return (
        <>
          <StyledServeyInfoWrapper>
            <StyledServeyStep>Q2) 피부건강 항목 선택</StyledServeyStep>
            <StyledServeyInfo>
              <span>피부건강</span>에 해당하는 증상을
              <br /> 모두 선택하세요.
            </StyledServeyInfo>
            <StyledCheckWrapper>
              {specific.map((item) => (
                <StyledCheckItem>
                  <OrangeCheckBox item={item} onChange={_onChange} />
                </StyledCheckItem>
              ))}
            </StyledCheckWrapper>
          </StyledServeyInfoWrapper>
          <StyledButtonWrapper>
            <StyledPrevButton step={1} moveStep={moveStep}>
              이전
            </StyledPrevButton>
            <StyledNextButton step={3} moveStep={moveStep}>
              다음페이지
            </StyledNextButton>
          </StyledButtonWrapper>
        </>
      );
    case 3:
      return (
        <>
          <StyledServeyInfoWrapper>
            <StyledServeyStep>Q3) 마지막 설문이에요</StyledServeyStep>
            <StyledServeyInfo>
              해당되는 사항을 <br />
              <span>네</span> 또는 <span>아니요</span> 에 <span>체크</span>
              해주세요.
            </StyledServeyInfo>

            {common.map((item) => (
              <StyledOXRow>
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
          </StyledServeyInfoWrapper>

          <StyledButtonWrapper>
            <StyledPrevButton step={2} moveStep={moveStep}>
              이전
            </StyledPrevButton>
            <StyledNextButton step={3} moveStep={moveStep}>
              다음페이지
            </StyledNextButton>
          </StyledButtonWrapper>
        </>
      );
  }
};

export default RecommendServey;

const StyledServeyInfoWrapper = styled.div`
  margin-top: 30px;
`;

const StyledServeyStep = styled.div`
  font-weight: bold;
  font-size: 18px;
`;

const StyledServeyInfo = styled.div`
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

const StyledServeyCardWrapper = styled.div`
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
