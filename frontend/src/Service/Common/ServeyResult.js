import React from "react";
import styled, { css } from "styled-components";
import ImageCard from "../../Components/Useful/ImageCard";
import { useState } from "react";
import MaterialCard from "../../Components/Useful/MaterialCard";
import StyledNextButton from "../../Components/button/StyledNextButton";

const ServeyResult = () => {
  const [cards, setCards] = useState([
    { name: "h-bone", choice: true },
    { name: "h-brain", choice: true },
    { name: "h-diabetes", choice: true },
  ]);
  const [material, setMaterial] = useState([
    {
      type: "기능성 원료",
      amount: "5",
      weight: "20",
      components: [
        { name: "이눌린/치커리", amount: 3, weight: 10, cost: 2800 },
        { name: "이눌린/치커리", amount: 3, weight: 10, cost: 2800 },
        { name: "이눌린/치커리", amount: 3, weight: 10, cost: 2800 },
        { name: "이눌린/치커리", amount: 3, weight: 10, cost: 2800 },
      ],
      toggle: false,
    },
    {
      type: "비타민",
      amount: "3",
      weight: "10",
      components: [
        { name: "이눌린/치커리", amount: 3, weight: 10, cost: 2800 },
        { name: "이눌린/치커리", amount: 3, weight: 10, cost: 2800 },
        { name: "이눌린/치커리", amount: 3, weight: 10, cost: 2800 },
        { name: "이눌린/치커리", amount: 3, weight: 10, cost: 2800 },
      ],
      toggle: false,
    },
    {
      type: "미네랄",
      amount: "3",
      weight: "10",
      components: [
        { name: "이눌린/치커리", amount: 3, weight: 10, cost: 2800 },
        { name: "이눌린/치커리", amount: 3, weight: 10, cost: 2800 },
        { name: "이눌린/치커리", amount: 3, weight: 10, cost: 2800 },
        { name: "이눌린/치커리", amount: 3, weight: 10, cost: 2800 },
      ],
      toggle: false,
    },
    {
      type: "배합용 파우더",
      amount: "1",
      weight: "10",
      components: [
        { name: "이눌린/치커리", amount: 3, weight: 10, cost: 2800 },
        { name: "이눌린/치커리", amount: 3, weight: 10, cost: 2800 },
        { name: "이눌린/치커리", amount: 3, weight: 10, cost: 2800 },
        { name: "이눌린/치커리", amount: 3, weight: 10, cost: 2800 },
      ],
      toggle: false,
    },
  ]);
  function _onToggle(type) {
    setMaterial(
      material.map((item) =>
        item.type === type ? { ...item, toggle: !item.toggle } : item
      )
    );
  }

  return (
    <>
      <StyledResultWrapper>
        <div>토토리의 설문결과 입니다.</div>
        <span>나이 : 2년 2개월 | 체중 : 2.3 kg</span>
        <StyledResultCardWrapper>
          {cards.map((item) => (
            <ImageCard key={item.name} item={item} />
          ))}
        </StyledResultCardWrapper>
      </StyledResultWrapper>
      <StyledMaterialWrapper>
        <header>
          <span>설문기반의 추천된 원료에요!</span>
          <button>이미지로 보기</button>
        </header>

        {material.map((item) => (
          <MaterialCard key={item.type} item={item} onClick={_onToggle} />
        ))}
        <StyledResultCost>
          <span>금액 총합</span>
          <span>59,400원</span>
        </StyledResultCost>
      </StyledMaterialWrapper>
      <StyledNextButton path={"/goodness-of-fit"}>
        완료간 적합도 측정하기
      </StyledNextButton>
    </>
  );
};

export default ServeyResult;

const StyledResultWrapper = styled.div`
  margin-top: 30px;
  div {
    font-size: 20px;
    font-weight: bold;
  }
  span {
    display: block;
    margin-top: 10px;
    letter-spacing: -0.75px;
    color: #333333;
    font-weight: 300;
  }
`;

const StyledResultCardWrapper = styled.div`
  margin-top: 20px;
  padding: 0;
  img {
    width: 22.5%;
  }
`;

const StyledMaterialWrapper = styled.div`
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
    span {
      font-size: 20px;
      font-weight: bold;
    }
    button {
      background: #e16a49 0% 0% no-repeat padding-box;
      border: 1px solid #e16a49;
      border-radius: 5px;
      opacity: 1;
      padding: 6px 8px;
      letter-spacing: -0.75px;
      color: #ffffff;
      cursor: pointer;
    }
  }
`;

const StyledResultCost = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 25px;
  margin-bottom: 25px;
  text-align: left;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: -1px;
  color: #333333;
  opacity: 1;
  span:nth-child(2) {
    color: #e16a49;
  }
`;
