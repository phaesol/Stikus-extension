import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import MaterialCard from "../../Components/NutrientFit/MaterialCard";
import NutrientPreviewModal from "../../Components/NutrientFit/NutrientPreviewModal/NutrientPreviewModal";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles";
import MaterialDetailPage from "./MaterialDetailPage";
import MAIN_TOP_BG from "../../Images/NutrientFit/common/main-top-bg.svg";

const SelfMakeList = ({
  final_order_nutrient,
  finalOrder,
  finalOrderEdit,
  finalOrderRemove,
  petName,
  petAge,
  petWeight
}) => {
  console.log("흠 오더 뉴트리", final_order_nutrient);
  const [modalVisible, setmodalVisible] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [detailMaterial, setDetailMaterial] = useState("");
  useEffect(() => {
    try {
      finalOrder();
    } catch (e) {}
  }, []);
  if (detailVisible) {
    return (
      <MaterialDetailPage
        detailMaterial={detailMaterial}
        setDetailMaterial={setDetailMaterial}
        setDetailVisible={setDetailVisible}
        finalOrderEdit={finalOrderEdit}
        finalOrderRemove={finalOrderRemove}
        detailVisible={detailVisible}
      />
    );
  } else {
    return (
      <>
        <StyledBackGround>
          <p>
            <b>{petName}의 맞춤 영양제</b>
          </p>
          <p>{petName} 반려인님이 선택한 원료입니다.</p>
        </StyledBackGround>
        <StyledMaterialWrapper>
          <header>
            <div>
              {petName}에게 <span>필요한 원료 구성입니다.</span>
            </div>
            <div>
              <span>
                나이 : {petAge}개월 | 체중 : {petWeight} kg
              </span>
              <button onClick={() => setmodalVisible(!modalVisible)}>
                이미지로 보기
              </button>
            </div>
          </header>
          <NutrientPreviewModal
            modalVisible={modalVisible}
            closeModal={setmodalVisible}
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
              setDetailVisible={setDetailVisible}
              setDetailMaterial={setDetailMaterial}
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
            setDetailVisible={setDetailVisible}
            setDetailMaterial={setDetailMaterial}
          />

          <StyledResultCost>
            <span>금액 총합</span>
            <span>{"돈 넣어야함"}원</span>
          </StyledResultCost>
          <StyledBtnBox>
            {/* <StyledPrevBtn to="/self-make">이전</StyledPrevBtn> */}
            <StyledNextBtn to="/common-question">
              원료간 적합도 측정하기
            </StyledNextBtn>
          </StyledBtnBox>
        </StyledMaterialWrapper>
      </>
    );
  }
};

export default SelfMakeList;

const StyledMaterialWrapper = styled.div`
  padding-top: 200px;
  header {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 25px;
    letter-spacing: -1.1px;
    color: #333333;

    div {
      font-size: 22px;
      width:100%;
    }
    & > div + div {
      margin-top: 15px;
    }
    div:nth-child(2) {
      display: flex;
      justify-content: space-between;
      span {
        letter-spacing: -0.75px;
        color: #333333;
        font-size:15px;
        font-weight:300;
      }
    }
    span {
      font-size: 22px;
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


const StyledBackGround = styled.div`
  position: absolute;
  z-index: -1;
  top: 0;
  right: 0;
  width: 100%;
  height: 180px;
  background-image: url(${MAIN_TOP_BG});
  background-repeat: no-repeat;
  background-size: cover;
  padding: 50px 15px 0px 15px;
  border-radius: 0 0 25px 25px;
  & > p {
    text-align: left;
    font-size: 15px;
    letter-spacing: -0.75px;
    color: #ffffff;
    opacity: 1;
    font-weight:300;
  }
  & > p + p {
    margin-top: 20px;
  }
  & > p > b {
    color: #ffffff;

    font-size: 28px;
    font-weight: 700;
  }
`;