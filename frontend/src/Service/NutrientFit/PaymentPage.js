import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import StyledPrevButton from "../../Components/button/StyledPrevButton";
import StyledNextButton from "../../Components/button/StyledNextButton";

import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { withStyles, useTheme } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";

import TabPanel from "../../Components/lib/TabPanel";
import StyledFeatureItem from "../../Components/NutrientFit/StyledFeatureItem";
import FeedMethod from "../../Components/NutrientFit/FeedMethod";
import StyledPairWrapper from "../../Components/NutrientFit/StyledPairWrapper";
import StyledProductInfo from "../../Components/NutrientFit/StyledProductInfo";
import ReturnInfo from "../../Components/NutrientFit/ReturnInfo";
import SharingButton from "../../Components/Useful/SharingButton";
import NutrientPreviewModal from "../../Components/NutrientFit/NutrientPreviewModal/NutrientPreviewModal";
import MAIN_TOP_BG from "../../Images/NutrientFit/common/main-top-bg.svg";

function importKakaoScript() {
  const promise = new Promise((resolve, reject) => {
    // let flag = true;
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    console.log("이건 돌아가고있을까");

    document.head.appendChild(script);

    // const addscript = setInterval(
    //   () => {
    //     if (flag === false) clearInterval(addscript);
    //     if (
    //       document.querySelector(
    //         'script[src="https://developers.kakao.com/sdk/js/kakao.js"]'
    //       )
    //     )
    //     flag = false;
    //     console.log("여기는 돌아가고있을까");
    //   },

    //   500
    // );
    resolve("OK");
    console.log("여기는 돌아가고있을까");
  });

  return promise;
}
function initKakao(result) {
  const tryInit = setInterval(() => {
    if (result === "OK" && window.Kakao) {
      window.Kakao.init("4ae351a71b795f78bdad26663efad1cb");
      console.log(window.Kakao.isInitialized());
      clearInterval(tryInit);
    }
  }, 3000);

  return "please";
}
const PaymentPage = ({ petName, petAge, petWeight, final_mateiral }) => {
  useEffect(() => {
    try {
      async function startKakao() {
        const result = await importKakaoScript();
        console.log(result);

        const temptext = await initKakao(result);
        console.log(temptext);
      }
      startKakao();
    } catch (e) {
      console.log(e);
    }
    // setTimeout(initKakao, 300);
  }, []);
  const [modalVisible, setmodalVisible] = useState(false);

  const [tabIndex, setTabIndex] = React.useState(0);
  const theme = useTheme();
  const [optionProduct, setOptionProduct] = React.useState([
    { name: "유산균", cnt: 1, amount: "1Box", cost: "35,000" },
    { name: "오메가3", cnt: 1, amount: "30ml", cost: "13,000" },
  ]);
  const [predictModal, setPredictModal] = React.useState(false);
  function _onIncrease(name) {
    setOptionProduct(
      optionProduct.map((item) =>
        item.name === name ? { ...item, cnt: item.cnt + 1 } : item
      )
    );
  }
  function _onDecrease(name) {
    setOptionProduct(
      optionProduct.map((item) =>
        item.name === name && item.cnt !== 1
          ? { ...item, cnt: item.cnt - 1 }
          : item
      )
    );
  }

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };
  const handleChangeIndex = (index) => {
    setTabIndex(index);
  };


  const sendBasketSignal = () => {

    window.parent.postMessage({ target_id : 436, target_category_id : 239, product_code:  'P00000QU'}, '*');
    // setTimeout(() => {
    //   window.parent.postMessage({ target_id : 437, target_category_id : 239, product_code:  'P00000QV'}, '*');
    // }, [5000])
    }

  const AddBasket = () => {
    console.log(final_mateiral)
    sendBasketSignal() 
  }
  return (
    <>
      <StyledBackGround></StyledBackGround>
      <StyledResultWrapper>
        <div>{petName}의 추천 영양제</div>
        <span>
          나이 : {petAge}개월 | 체중 : {petWeight} kg
        </span>
      </StyledResultWrapper>
      <StyledPaymentHeader>
        <StyledMedicineWrap>
          <StyledMedicineChest
            src={require(`../../Images/Basic/composition.png`)}
          />
          <ShowMaterialBtn onClick={() => setmodalVisible(!modalVisible)}>
            구성품 보기
          </ShowMaterialBtn>
        </StyledMedicineWrap>
        <NutrientPreviewModal
          modalVisible={modalVisible}
          closeModal={setmodalVisible}
          // materialList={Object.keys(order_nutrient).map((key) =>
          //   Object.keys(order_nutrient[key]).filter(
          //     (item) => order_nutrient[key][item].cnt > 0
          //   )
          // )}
          materialList={final_mateiral}
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
        <StyledHeaderInfoCard>
          <header>{petName}의 영양제</header>
          <div>
            <span>구성</span>
            <span>30일분</span>
          </div>
          <div>
            <span>구성품</span>
            <span>치커리 10g외 10개</span>
          </div>
          <div>
            <span>가격</span>
            <span>35,000원</span>
          </div>
        </StyledHeaderInfoCard>
      </StyledPaymentHeader>
      <StyledPaymentGraph></StyledPaymentGraph>
      <StyledFeatureSection>
        <StyledFeatureItem setPredictModal={setPredictModal} />
      </StyledFeatureSection>

      {predictModal && (
        <>
          <StyledpredictModalBg />

          <StyleddpredictModal>
            <header>배합시 예상치</header>
            <div>
              {" "}
              <span>조단백질</span> <span>5.9%이상</span>
            </div>
            <div>
              {" "}
              <span>조단백질</span> <span>5.9%이상</span>
            </div>
            <div>
              {" "}
              <span>조단백질</span> <span>5.9%이상</span>
            </div>
            <div>
              {" "}
              <span>조단백질</span> <span>5.9%이상</span>
            </div>
            <div>
              {" "}
              <span>조단백질</span> <span>5.9%이상</span>
            </div>
            <div>
              {" "}
              <span>조단백질</span> <span>5.9%이상</span>
            </div>
            <button onClick={() => setPredictModal(false)}>확인</button>
          </StyleddpredictModal>
        </>
      )}
      <SharingButton>카카오톡으로 결과 보내기</SharingButton>

      <StyledSubTitle>급여방법</StyledSubTitle>
      <StyledPairWrapper>
        <FeedMethod />
      </StyledPairWrapper>
      <StyledSubTitle>보관방법</StyledSubTitle>
      <StyledKeepInfo>
        <span>- 직사광선이 없는 곳에서 실온보관</span>
        <span>
          - 개봉 후에는 변질의 우려가 있으니 되도록 빠른 시일 내 급여하여
          주십시오.
        </span>
      </StyledKeepInfo>
      <StyledSubTitle>제품 정보</StyledSubTitle>
      <StyledProductInfo />
      <StyledSubTitle>같이 먹으면 좋아요!</StyledSubTitle>
      <StyledPairWrapper>
        {optionProduct.map((item) => (
          <div key={item.name}>
            <img src={require("../../Images/Basic/유산균.png")} alt="유산균" />
            <span>
              {item.name} ({item.amount})
              <br /> {item.cost}원
            </span>
            <StyledCntButton>
              <div onClick={() => _onDecrease(item.name)}>-</div>
              <div>{item.cnt}</div>
              <div onClick={() => _onIncrease(item.name)}>+</div>
            </StyledCntButton>
          </div>
        ))}
      </StyledPairWrapper>
      <StyledSubTitle>Check Up</StyledSubTitle>
      <ReturnInfo />
      <StyledOtherInfo>
        <span>기타 안내</span>
        <span>아래</span>
      </StyledOtherInfo>

      <Paper>
        <StyledTabs
          value={tabIndex}
          onChange={handleChange}
          variant="fullWidth"
        >
          <StyledTab value={0} label="Review" />
          <StyledTab value={1} label="Q&A" />
          <StyledTab value={2} label="FAQ" />
        </StyledTabs>
      </Paper>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={tabIndex}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={tabIndex} index={0} dir={theme.direction}>
          리뷰가 들어가는 부분
        </TabPanel>
        <TabPanel value={tabIndex} index={1} dir={theme.direction}>
          Item Two
        </TabPanel>
        <TabPanel value={tabIndex} index={2} dir={theme.direction}>
          Item Three
        </TabPanel>
      </SwipeableViews>

      <StyledButtonWrapper>
        <StyledButton onClick={AddBasket}>장바구니</StyledButton>
        <StyledNextButton path={"/payment-page"}>바로구매</StyledNextButton>
      </StyledButtonWrapper>
    </>
  );
};

export default PaymentPage;

const StyledBackGround = styled.div`
  position: absolute;
  z-index: -1;
  top: 0;
  right: 0;
  width: 100%;
  height: 150px;
  background-image: url(${MAIN_TOP_BG});
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 0 0 25px 25px;
`;

const StyledResultWrapper = styled.div`
  width: 100%;
  height: 150px;
  div {
    margin-top: 50px;
    text-align: left;
    font-size: 28px;
    letter-spacing: -1.4px;
    color: #ffffff;
    opacity: 1;
  }
  span {
    margin-top: 5px;
    text-align: left;
    font-size: 15px;
    letter-spacing: -0.75px;
    color: #ffffff;
  }
`;

const StyledPaymentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
  height:100%;
  height:100%;
`;

const StyledMedicineWrap = styled.div`
  position: relative;
  width: 200px;
  height: 230px;
`;
const StyledMedicineChest = styled.img`
  position: absolute;
  width: 200px;
  top: 0;
  left: 0;
`;

const StyledHeaderInfoCard = styled.div`
  width: 235px;
  height: 150px;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 10px;
  opacity: 1;
  padding: 15px;
  box-sizing: border-box;
  header {
    font-size: 18px;
    letter-spacing: -0.9px;
    color: #333333;
    opacity: 1;
    font-weight: bold;
  }
  div {
    font-size: 15px;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    letter-spacing: -0.75px;
    opacity: 1;
    span:nth-child(1) {
      color: #a5a4a4;
    }
  }
`;

const StyledPaymentGraph = styled.div`
  width: 100%;
  height: 440px;

  background: #f2f2f2 0% 0% no-repeat padding-box;
  opacity: 1;
`;

const StyledFeatureSection = styled.div`
  header {
    margin-top: 20px;

    display: flex;
    justify-content: space-between;

    span:nth-child(1) {
      font-size: 18px;
      font-weight: bold;
      letter-spacing: -0.9px;
      color: #333333;
      opacity: 1;
    }
    span:nth-child(2) {
      font-size: 18px;
      font-weight: bold;
      letter-spacing: -0.9px;
      color: #333333;
      opacity: 1;
    }
    b {
      font-size: 15px;
      font-weight: bold;
      letter-spacing: -0.75px;
      color: #e16a49;

      opacity: 1;
      cursor: pointer;
    }
  }
`;

const StyledButtonWrapper = styled.div`
  margin-top: 15px;
  display: flex;
  width: 100%;
  position: sticky;
  bottom: 0px;
  padding: 15px;
  box-sizing: border-box;
  background-color: white;
`;

const StyledSubTitle = styled.div`
  margin-top: 20px;
  text-align: left;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: -0.9px;
  color: #333333;
  opacity: 1;
`;

const StyledKeepInfo = styled.div`
  height: 110px;
  padding: 15px;
  box-sizing: border-box;
  width: 100%;
  margin-top: 15px;

  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 10px;
  text-align: left;
  font-size: 15px;
  letter-spacing: -0.75px;
  opacity: 1;
  span + span {
    display: block;
    margin-top: 15px;
  }
`;

const StyledCntButton = styled.div`
  margin-top: 15px;
  display: flex;
  div:nth-child(1),
  div:nth-child(3) {
    width: 25px;
    height: 25px;
    background: #ffffff 0% 0% no-repeat padding-box;
    border: 1px solid #a5a4a4;
    border-radius: 3px;
    opacity: 1;
  }
  div {
    font-size: 17px;
    letter-spacing: -0.85px;
    color: #333333;
  }
  div + div {
    margin-left: 15px;
  }
  div:nth-child(1),
  div:nth-child(3) {
    cursor: pointer;
  }
`;

const StyledOtherInfo = styled.div`
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 5px;
  opacity: 1;
  cursor: pointer;
  height: 45px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  box-sizing: border-box;
  margin-top: 20px;
  margin-bottom: 30px;
  span {
    font-size: 15px;
    letter-spacing: -0.75px;
    color: #333333;
    opacity: 1;
  }
`;

const StyledTabs = withStyles({
  indicator: {
    backgroundColor: "#FC6E51",
  },
})(Tabs);

const StyledTab = withStyles({
  textColorInherit: {
    fontWeight: "500",
    color: "#FC6E51",
  },
})(Tab);

const ShowMaterialBtn = styled.button`
  position: absolute;
  left: calc(50% - 50px);
  top: 115px;
  background: none;
  border: none;
  background: #e16a49 0% 0% no-repeat padding-box;
  border: 1px solid #e16a49;
  border-radius: 5px;
  opacity: 1;
  width: 100px;
  padding: 8px 0;
  letter-spacing: -0.75px;
  color: #ffffff;
  cursor: pointer;
`;

const StyledpredictModalBg = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #080808 0% 0% no-repeat padding-box;
  opacity: 0.4;
  z-index: 10;
`;

const StyleddpredictModal = styled.div`
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 10px;
  opacity: 1;
  width: 300px;
  z-index: 15;

  position: fixed;
  top: 150px;
  left: calc(50% - 150px);
  padding: 15px;

  & > header {
    text-align: left;
    font-size: 17px;
    letter-spacing: -0.85px;
    color: #333333;
    opacity: 1;
    font-weight: bold;
    margin-bottom: 15px;
  }
  & > div {
    display: flex;
    justify-content: space-between;
  }
  & > div + div {
    margin-top: 10px;
  }
  & > div > span:nth-child(1) {
    text-align: left;
    font-size: 15px;
    letter-spacing: -0.75px;
    color: #a5a4a4;
    opacity: 1;
  }
  button {
    margin-top: 20px;
    width: 100%;
    border: 1px solid var(--unnamed-color-2b428e);
    background: #ffffff 0% 0% no-repeat padding-box;
    border: 1.5px solid #2b428e;
    border-radius: 5px;
    opacity: 1;
    color: #2b428e;
    padding: 10px 0;
    font-weight: bold;
    cursor: pointer;
    outline: none;
  }
`;








const BtnStyle = css`
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

const StyledButton = styled.button`
  ${BtnStyle}
`;