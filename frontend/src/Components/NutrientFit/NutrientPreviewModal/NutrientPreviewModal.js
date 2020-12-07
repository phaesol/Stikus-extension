import React, { useState, useEffect, useCallback } from "react";
import BOTTLE_IMG from "../../../Images/NutrientFit/preview-bottle.png";
import styled from "styled-components";
import NutrientItem from "./NutrientItem";

// 최대 15개

function NutrientPreviewModal({
  modalVisible,
  closeModal,
  materialList,
  basepowder,
  usercustom,
}) {
  //   const showPreview = useCallback(() => {
  //     setModalVisible(true);
  //   }, [modalVisible]);
  //   const closePreview = useCallback(() => {
  //     setModalVisible(false);
  //   }, [modalVisible]);
  let nutrientList = [];
  if (usercustom) {
    {
      Object.keys(materialList).map((key) =>
        Object.keys(materialList[key]).map((item) => {
          if (materialList[key][item].cnt > 0) {
            nutrientList = nutrientList.concat(materialList[key][item]);
          }
        })
      );
    }
  } else {
    Object.keys(materialList).map((item) => {
      Object.keys(materialList[item]).map(
        (material) =>
          (nutrientList = nutrientList.concat(materialList[item][material]))
      );
    });
  }
  nutrientList = nutrientList.concat(basepowder);

  return (
    <>
      {/* <button onClick={showPreview}>한눈에 보기</button> */}
      {modalVisible && (
        <>
          {/* <StyledModalBackGround></StyledModalBackGround> */}
          <StyledModalContainer>
            <StyledModalInnerContainer>
              <StyledModalWrapper>
                <StyledItemWrapper>
                  <StyledTopInfo>원료를 60g까지 채워주세요</StyledTopInfo>
                  {usercustom
                    ? nutrientList &&
                      nutrientList.map((item) => (
                        <NutrientItem key={item.id} item={item} usercustom />
                      ))
                    : nutrientList &&
                      nutrientList.map((item) => (
                        <NutrientItem key={item.id} item={item} />
                      ))}
                </StyledItemWrapper>
              </StyledModalWrapper>

              <StyledFlexDiv1>
                <StyledColorLabel color="#FCBB42"></StyledColorLabel>
                <StyledColorDesc>배합용 파우더</StyledColorDesc>
                <StyledColorLabel color="#FC6E51"></StyledColorLabel>
                <StyledColorDesc>기능성원료</StyledColorDesc>
                <StyledColorLabel color="#8cc152"></StyledColorLabel>
                <StyledColorDesc>비타민</StyledColorDesc>
                <StyledColorLabel color="#5d9cec"></StyledColorLabel>
                <StyledColorDesc>미네랄</StyledColorDesc>
              </StyledFlexDiv1>

              <StyledSubInfo>
                ※ 60g까지 채워지지 않는 원료는{" "}
                <StyledPointColor>배합용 파우더</StyledPointColor>로 보충됩니다.
              </StyledSubInfo>

              <StyledFlexDiv2>
                <StyledConfirmBtn onClick={() => closeModal(false)}>
                  확인
                </StyledConfirmBtn>
              </StyledFlexDiv2>
            </StyledModalInnerContainer>
          </StyledModalContainer>
        </>
      )}
    </>
  );
}

export default NutrientPreviewModal;

// const StyledModalBackGround = styled.div`
//   // width: 100vw;
//   // height: 100vh;
//   // background: #080808;
//   // position: absolute;
//   // top: 0;
//   // left: 0;
//   // opacity: 0.4;
//   // iframe 때문에 background 회색되는걸 일단 빼야할 것 같음!
// `;
const StyledModalContainer = styled.div`
  // border: 1px solid blue;
  box-sizing: border-box;
  position: fixed;
  max-width: 600px;
  padding: 0 12px;
  width: 100%;
  top: 0;
  left: 50%;
  transform: translate(-50%);
  min-height: 99vh;
  z-index: 100;
`;

const StyledModalInnerContainer = styled.div`
  box-sizing: border-box;
  border-radius: 10px;
  background: white;
  box-shadow: 0px 3px 6px #00000029;
  padding: 15px 0;
  min-height: 100vh;
`;

const StyledModalWrapper = styled.div`
  position: relative;
  max-width: 520px;
  // border: 1px solid green;
  width: 100%;
  height: 75vh !important;
  background: url(${BOTTLE_IMG});
  background-repeat: round;
  z-index: 999;
  margin: 0 auto;
  margin-top: 25px;
`;

const StyledItemWrapper = styled.div`
  /* padding: 0 8%; */
  width: 80%;
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translate(-50%);
  /* display: flex;   //이부분은 300px로 고정시키면서 생기는 overflow부분을 처리하려고 넣었는데 max-height를 쓰면되지..
  flex-direction: column;
  justify-content: flex-end; */
  max-height: 300px;
  overflow-y: scroll;
`;

const StyledTopInfo = styled.div`
  position: absolute;
  width: 180px;
  top: -30px;
  left: 50%;
  transform: translate(-50%);
  letter-spacing: -0.75px;
  color: #333333;
  font-size: 15px;
  font-weight: 600;
`;

const StyledSubInfo = styled.div`
  letter-spacing: -0.65px;
  color: #333333;
  font-size: 13px;
  margin: 12px 0 15px 2.5%;
  // margin-bottom: 15px;
  // margin-left: 2.5%;

  @media only screen and (max-width: 390px) {
    font-size: 12px;
  }
  @media only screen and (max-width: 360px) {
    font-size: 11px;
  }
`;

const StyledFlexDiv1 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
  margin-bottom: 10px;
`;

const StyledColorLabel = styled.div`
  display: inline-block;
  background: ${({ color }) => color};
  width: 15px;
  height: 15px;
  border-radius: 3px;
`;

const StyledColorDesc = styled.span`
  font-size: 13px;
  letter-spacing: -0.65px;
  color: #333333;
  margin: 0 5px;

  @media only screen and (max-width: 350px) {
    font-size: 11px;
  }
`;

const StyledPointColor = styled.strong`
  color: #e16a49;
`;

const StyledFlexDiv2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledConfirmBtn = styled.button`
  height: 45px;
  width: 95%;
  background: #ffffff;
  border: 1px solid #2b428e;
  border-radius: 5px;
  opacity: 1;
  font-size: 18px;
  font-weight: normal;
  letter-spacing: -0.9px;
  color: #2b428e;
  cursor: pointer;
`;
