import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import MaterialCard from "../../Components/NutrientFit/MaterialCard";

const SelfMakeList = ({ final_order_nutrient, finalOrder }) => {
  console.log("흠 오더 뉴트리", final_order_nutrient);
  useEffect(() => {
    try {
      finalOrder();
    } catch (e) {}
  }, []);
  return (
    <>
      잠시기다려봐
      <StyledMaterialWrapper>
        <header>
          <span>직접 만든 영양제 원료 리스트</span>
          <button onClick={() => console.log("비빙")}>이미지로 보기</button>
        </header>
        {Object.keys(final_order_nutrient).map((item) => (
          <MaterialCard
            key={item}
            category={item}
            item={final_order_nutrient[item]}
            usercustom
          />
        ))}

        <MaterialCard
          key={"배합용 파우더"}
          category={"배합용 파우더"}
          item={{
            배합용파우더: {
              category: "배합용 파우더",
              id: 999,
              name: "배합용 파우더",
              price: 2800,
              recommend_amount: 0,
              related_question: "",
              cnt: 1,
              score: "0",
              standard_amount: 60,
            },
          }}
          usercustom
        />
      </StyledMaterialWrapper>
    </>
  );
};

export default SelfMakeList;

const StyledMaterialWrapper = styled.div`
  margin-top: 30px;
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
