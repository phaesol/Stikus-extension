import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import MaterialCard from "../../Components/NutrientFit/MaterialCard";
import NutrientPreviewModal from "../../Components/NutrientFit/NutrientPreviewModal/NutrientPreviewModal";

const SelfMakeList = ({ final_order_nutrient, finalOrder }) => {
  console.log("흠 오더 뉴트리", final_order_nutrient);
  const [modalVisible, setmodalVisible] = useState(false);
  useEffect(() => {
    try {
      finalOrder();
    } catch (e) {}
  }, []);
  return (
    <>
      <StyledMaterialWrapper>
        <header>
          <span>직접 만든 영양제 원료 리스트</span>
          <button onClick={() => setmodalVisible(!modalVisible)}>
            이미지로 보기
          </button>
        </header>

        <NutrientPreviewModal
          modalVisible={modalVisible}
          closeModal={setmodalVisible}
          // materialList={Object.keys(order_nutrient).map((key) =>
          //   Object.keys(order_nutrient[key]).filter(
          //     (item) => order_nutrient[key][item].cnt > 0
          //   )
          // )}
          materialList={final_order_nutrient}
          basepowder={[
            {
              category: "배합용파우더",
              id: 999,
              name: "배합용 파우더",
              price: 2800,
              recommend_amount: 0,
              related_question: "",
              score: "0",
              standard_amount: 60, //@@TODO 여기서 standard_amount 조절해야함
              cnt: 1,
            },
          ]}
          usercustom
        />
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
        <StyledResultCost>
          <span>금액 총합</span>
          <span>{"돈 넣어야함"}원</span>
        </StyledResultCost>
        <StyledBtnBox>
          <StyledPrevBtn to="/self-make">이전</StyledPrevBtn>
          <StyledNextBtn to="/goodness-of-fit">
            원료간 적합도 측정하기
          </StyledNextBtn>
        </StyledBtnBox>
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

const StyledPrevBtn = styled(Link)`
  display: inline-block;
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
const StyledBtnBox = styled.div`
  display: flex;
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

const StyledNextBtn = styled(Link)`
  flex: 1;
  display: flex;
  align-items: center;
  border: none;
  justify-content: center;
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
