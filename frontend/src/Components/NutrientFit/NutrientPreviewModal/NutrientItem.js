import React from "react";
import styled, { css } from "styled-components";

function NutrientItem({ item }) {
  return (
    item.category !== "추가급여" && (
      <>
        <StyledItemWrapper category={item.category}>
          <StyledItem1>{item.nutrient}</StyledItem1>
          <StyledItem2>{item.standard_amount}g</StyledItem2>
          <StyledItem3>{item.price}원</StyledItem3>
        </StyledItemWrapper>
      </>
    )
  );
}

export default React.memo(NutrientItem);

const StyledItemWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid #ffffff;
  flex-direction: row;
  justify-content: flex-end;
  font-size: 13px;
  letter-spacing: -0.65px;
  color: #ffffff;
  padding: 2px 6px;
  border-radius: 6px;

  ${(props) =>
    props.category === "기능성원료" &&
    css`
      background-color: #fc6e51;
    `}
  ${(props) =>
    props.category === "비타민" &&
    css`
      background-color: #8cc152;
    `}
    ${(props) =>
    props.category === "미네랄" &&
    css`
      background-color: #5d9cec;
    `}
    ${(props) =>
    props.category === "배합용파우더" &&
    css`
      background-color: #fcbb42;
    `}
`;

const StyledItem1 = styled.div`
  flex: 1;
  text-align: left;
`;
const StyledItem2 = styled.div`
  width: 100px;
`;

const StyledItem3 = styled.div`
  width: 40px;
`;
