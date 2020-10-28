import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import MaterialCard from "../../Components/NutrientFit/MaterialCard";
import NutrientPreviewModal from "../../Components/NutrientFit/NutrientPreviewModal/NutrientPreviewModal";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles";

const SelfMakeList = ({ final_order_nutrient, finalOrder }) => {
  console.log("흠 오더 뉴트리", final_order_nutrient);
  const [modalVisible, setmodalVisible] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [detailMaterial, setDetailMaterial] = useState("");
  useEffect(() => {
    try {
      finalOrder();
    } catch (e) {}
  }, []);
  return detailVisible ? (
    <MaterialDetailPage>
      <header>다음과 같은 건강기능에 도움이 됩니다.</header>
      <section>
        <CardWrapper>
          {detailMaterial.health_related.map((item) => (
            <img
              src={require(`../../Images/Disease/h-${item}01.png`)}
              alt={`선택된 ${item}카드`}
            />
          ))}
        </CardWrapper>
        <FakeCircleWrapper>
          <BackgroundCircle />

          <ImgWrapper>
            <img
              src={require(`../../Images/NutrientFit/${detailMaterial.category}x2.png`)}
              alt={`선택된 ${detailMaterial.category}카드`}
            />
          </ImgWrapper>
        </FakeCircleWrapper>
      </section>
      <DetailInfoSection>
        <header>
          {detailMaterial.name} <span>{detailMaterial.recommend_amount}g</span>
        </header>
        <ControlSection>
          <ControlSectionLabel>
            <span>적정용량</span>
            <StyledCntButton>
              <div>-</div>
              <div>{detailMaterial.cnt}</div>
              <div>+</div>
            </StyledCntButton>
          </ControlSectionLabel>

          <StyledCardTriangle pos={50}></StyledCardTriangle>
          <StyledCardFitBar
            variant="determinate"
            value={50} //이렇게 표시해주면 현재 양이 계산된다
          />
          <StyledCardFitBarLabel>
            <span>최소 ( 1 개)</span>
            <span>추천 (1개)</span>
            <span>최대 ( 5 개)</span>
          </StyledCardFitBarLabel>
        </ControlSection>
        <MaterialDesc>
          {detailMaterial.desc.split("\n").map((line) => (
            <span>
              {line}
              <br />
            </span>
          ))}
        </MaterialDesc>
        <AdditionalInfo>
          ※ 성분, 원산지 및 제조원 표시
          <br />
          조단백 10.% 이상, 조지방 3.0%이상,조섬요2.0% 이하,
          <br />
          조섬유 2.0%이하, 조회분 7.0% 이하 칼슘1.0% 이상,인 0.6% 이상, 수분
          14.0% 이하
          <br />
          원산지 : 국내산 │ 제조원 : 스티커스코퍼레이션
        </AdditionalInfo>
      </DetailInfoSection>
      <StyledBtnBox>
        <StyledPrevBtn to="/self-make">삭제</StyledPrevBtn>
        <StyledNextBtn onClick={() => setDetailVisible(false)}>
          확인
        </StyledNextBtn>
      </StyledBtnBox>
    </MaterialDetailPage>
  ) : (
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
  padding-top: 30px;
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

// 여기부터 재료 디테일 정보가 들어가는 페이지 들이다.
const MaterialDetailPage = styled.div`
  padding: 0 15px;

  padding-top: 50px;
  position: absolute;
  top: 0;
  background: white;
  border: 2px solid green;
  width: 100%;
  max-width: 600px;
  margin-left: -15px;
  min-height: 100vh;

  & > header {
    text-align: left;
    font: normal normal medium 15px/22px Noto Sans KR;
    letter-spacing: -0.75px;
    color: #333333;
    opacity: 1;
    font-weight: 700;
    margin-bottom:15px;
  }
  & > section {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    height: 250px;
  }
`;

const CardWrapper = styled.div`
  height: 100%;
  margin-right: 20px;
  width: 140px;
  & > img{
    width:50%;
    margin-bottom:-5px;
  }
`;
const FakeCircleWrapper = styled.div`
  width: 220px;
  height: 100%;
  position: relative;
  margin-right: -15px;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
`;

const BackgroundCircle = styled.div`
  position: absolute;
  top: 0;
  right: -100px;
  background-color: #f1bbab;
  height: 250px;
  width: 250px;
  border-radius: 50%;
  z-index: 0;
`;

const ImgWrapper = styled.div`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  z-index: 1;
  & >img{
    width: 100%;
  }
`;

const DetailInfoSection = styled.div`
  & > header {
    display: flex;
    justify-content: space-between;
  }
  margin-top: 30px;
  text-align: left;
  font: normal normal bold 22px/33px Noto Sans KR;
  letter-spacing: 0px;
  color: #333333;
  opacity: 1;
  font-weight: bold;
  & > span {
    text-align: right;
    font-size: 18px;
    letter-spacing: -0.75px;
  }
`;

const ControlSection = styled.div`
  width: 100%;
`;

const ControlSectionLabel = styled.div`
  display: flex;
  align-items: center;
  span:nth-child(1) {
    display: inline-block;
    flex: 1;
  }
`;

const StyledCntButton = styled.div`
  display: flex;
  align-items: center;
  & > div:nth-child(1),
  & > div:nth-child(3) {
    width: 25px;
    height: 25px;
    background: #ffffff 0% 0% no-repeat padding-box;
    border: 1px solid #a5a4a4;
    border-radius: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 1;
  }
  & > div {
    font-size: 17px;
    letter-spacing: -0.85px;
    color: #333333;
  }
  div + div {
    margin-left: 15px;
  }
  & > div:nth-child(1),
  & > div:nth-child(3) {
    cursor: pointer;
  }
`;

const StyledCardFitBar = withStyles((theme) => ({
  root: {
    height: 15,
    borderRadius: 7,
  },
  colorPrimary: {
    backgroundColor: "#F2F2F2 ",
  },
  bar: {
    borderRadius: 7,
    backgroundColor: "#E16A49",
  },
}))(LinearProgress);

const StyledCardFitBarLabel = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  font-weight: bold;
  color: #a5a4a4;
  margin-top: 5px;
  & :nth-child(2) {
    color: #e16a49;
  }
`;

const StyledCardTriangle = styled.div`
  width: 0;
  height: 0;
  border-left: 7.5px solid transparent;
  border-right: 7.5px solid transparent;
  border-top: 15px solid #e16a49;
  margin-left: calc(${({ pos }) => pos}% - 7.5px);
`;

const MaterialDesc = styled.div`
  margin: 20px 0;
  text-align: left;
  font: normal normal 300 15px/22px Noto Sans KR;
  letter-spacing: -0.75px;
  color: #333333;
  opacity: 1;
  line-height: 1.6;
  font-weight: 500;
`;

const AdditionalInfo = styled.div`
  margin-bottom: 20px;
  text-align: left;
  font: normal normal 300 13px/23px Noto Sans KR;
  letter-spacing: -0.65px;
  color: #a5a4a4;
  opacity: 1;
`;
