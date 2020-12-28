import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
// import StyledPrevButton from "../../Components/button/StyledPrevButton";
import StyledNextButton from "../../Components/button/StyledNextButton";

import { BACKEND } from "../../config";
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
import axios from "axios";

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
    // console.log("여기는 돌아가고있을까");
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
const PaymentPage = ({
  petName,
  petAge,
  petWeight,
  final_mateiral,
  makeHistory,
  changeOptional,
  final_order_list,
  setFlag,
  isSelfMake,
}) => {
  const [year, month] = [parseInt(petAge/12), parseInt(petAge%2)]
  // useEffect(() => {
  //   if(isSelfMake) {
  //     alert("맞춤형임!")
  //   } else {
  //     alert("추천형임!")
  //   }
  // })
  useEffect(() => {
    try {
      async function startKakao() {
        const result = await importKakaoScript();
        console.log(result);

        const temptext = await initKakao(result);
        console.log(temptext);
        makeHistory(final_mateiral);
      }
      startKakao();
    } catch (e) {
      console.log(e);
    }
    setInterval(() => setShowgif(false), 2000);
    return () => setFlag("none");

    // setTimeout(initKakao, 300);
  }, []);
  const [showgif, setShowgif] = useState(true);
  const [modalVisible, setmodalVisible] = useState(false);

  const [tabIndex, setTabIndex] = React.useState(0);
  const total_composition = {
    조단백질: 0,
    조지방: 0,
    조섬유: 0,
    조회분: 0,
    칼슘: 0,
    인: 0,
    수분: 0,
  };
  // console.log("yayayayayayayayayay", final_order_list);
  const theme = useTheme();
  if (final_order_list !== null) {
    Object.keys(final_order_list).map((cate) =>
      Object.keys(final_order_list[cate]).map((item) => {
        //여기는 구성성분 합쳐주는 곳이다
        final_order_list[cate][item].composition.split(",").map((item) => {
          const tmp = item.substring(0, item.indexOf("%")).trim().split(" ");
          total_composition[tmp[0]] =
            total_composition[tmp[0]] +
            Math.round(parseFloat(tmp[1]) * 100) / 100;
        });
      })
    );
  }
  let total_weight = 0;
  if (final_order_list !== null) {
    Object.keys(final_order_list).map((item) =>
      Object.keys(final_order_list[item]).map((mat) => {
        if (final_order_list[item][mat].category !== "추가급여") {
          total_weight =
            total_weight +
            final_order_list[item][mat].standard_amount *
              final_order_list[item][mat].cnt;
        }
      })
    );
  }
  // console.log(total_weight, "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

  const [predictModal, setPredictModal] = React.useState(false);
  function _onIncrease(name) {
    changeOptional("increase", name);
  }
  function _onDecrease(name) {
    changeOptional("decrease", name);
  }

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };
  const handleChangeIndex = (index) => {
    setTabIndex(index);
  };

  const sendBasketSignal = () => {
    console.log("파올리!", final_order_list)

    let final_order_list_for_basket = []

    Object.keys(final_order_list).map((cate) => {
      Object.keys(final_order_list[cate]).map((item)=> {
        if (final_order_list[cate][item].target_id !== null) {   // 이 line이 유산균 & 오메가 3를 제거하는 구간인데, 기본적으로 유산균 & 오메가 3는 cnt 0에 포함이 되어가지구 일단 뺐음! 
          // 이거 해결하려면, 유산균 전용 페이지를 닥터맘마에서 생성하던가, 옵션까지 선택해서 줄 수 있게 함수를 다시 짜던가
          // 아니면 아예 없애야함.
          // 아니면 닥맘에서 아예 없애도 괜찮구.
          // 마음에는 안들지만 
        final_order_list_for_basket.push({ 
          target_id: final_order_list[cate][item].target_id, 
          target_category_id: final_order_list[cate][item].target_category_id,
          product_code: final_order_list[cate][item].product_code, 
          cnt: final_order_list[cate][item].cnt
        })
      }
      })
      
    })

    console.log(final_order_list_for_basket)
    window.parent.postMessage({doctorfit_signal: final_order_list_for_basket}, "*");
    // window.parent.postMessage("helloworld", "*");
    // window.parent.postMessage({temp: "helloworld"}, "*");

    // window.parent.postMessage(
    //   { target_id: "436", target_category_id: "239", product_code: "P00000QU" }, "*"); // 뉴트리핏셀레늄


    // window.parent.postMessage({ target_id : '437', target_category_id : '239', product_code:  'P00000QV'}, '*'); // 뉴트리핏실리마린
    // window.parent.postMessage({ target_id : '438', target_category_id : '239', product_code:  'P00000QW'}, '*'); // 뉴트리핏철분
  };
  const BuyBasket = () => {
    sendBasketSignal();
  };

  const saveHistoryAndSendBuySignal = () => {
    // console.log("저장중이니까 기대해주세요");
    if (isSelfMake) {
    axios.post(`${BACKEND}/save_history`, {
      // 수정중
      source: "커스텀 영양제",
      pet: petName,
      nutrient: {
        ...final_order_list,
        배합용파우더: {
          "배합용 파우더": {
            category: "배합용파우더",
            id: 999,
            name: "배합용 파우더",
            kor_name: "배합용 파우더",
            price: 2800,
            recommend_amount: 0,
            related_question: "",
            score: "0",
            standard_amount: 5000,
            cnt: parseInt((60000 - total_weight) / 5000),
          },
        },
      },
      // 여기까지 끊김
    });
    } else {
      axios.post(`${BACKEND}/save_history`, {
        // 수정중
        source: "추천 영양제",
        pet: petName,
        nutrient: {
          ...final_order_list,
          배합용파우더: {
            "배합용 파우더": {
              category: "배합용파우더",
              id: 999,
              name: "배합용 파우더",
              kor_name: "배합용 파우더",
              price: 2800,
              recommend_amount: 0,
              related_question: "",
              score: "0",
              standard_amount: 5000,
              cnt: parseInt((60000 - total_weight) / 5000),
            },
          },
        },
        // 여기까지 끊김
      });

    }
    // console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$", res.data);
    BuyBasket();
  };

  let total_cnt = 0;
  let first_material = "";
  let total_cost = 0;
  if (final_order_list !== null) {
    if (
      Object.keys(final_order_list).length !== 0 &&
      final_order_list.constructor === Object
    ) {
      Object.keys(final_order_list).map((cate) => {
        if (cate !== "추가급여") {
          Object.keys(final_order_list[cate]).map((item) => {
            total_cnt++;
            total_cost =
              total_cost +
              final_order_list[cate][item].price *
                final_order_list[cate][item].cnt;
            first_material = item;
          });
        }
      });
    }
  }
  if (showgif) {
    return (
      <PaymentLoadingContainer>
        <PaymentLoadingText>
          추천 원료로 <b>맞춤 영양제</b>를<br />
          만들고 있습니다.
        </PaymentLoadingText>
        <PaymentLoading
          src={require(`../../Images/NutrientFit/gif/manufacture2.gif`)}
        />
      </PaymentLoadingContainer>
    );
  }

  return (
    <>
      <StyledBackGround></StyledBackGround>
      <StyledResultWrapper>
        <div>{petName}의 추천 영양제</div>
        <span>
          나이 : {year}살 {month === 0 ? '' : `${month}개월`} | 체중 : {petWeight} kg
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
          materialList={final_order_list}
          basepowder={[
            parseInt((60000 - total_weight) / 5000) === 0
              ? null
              : {
                  category: "배합용파우더",
                  id: 999,
                  name: "배합용 파우더",
                  kor_name: "배합용 파우더",
                  price: 2800,
                  recommend_amount: 0,
                  related_question: "",
                  score: "0",
                  standard_amount: 5000,
                  cnt: parseInt((60000 - total_weight) / 5000),
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
            <span>
              {first_material.length > 9
                ? first_material.substring(0, 6) + "..."
                : first_material + " "}
              외 {" " + total_cnt - 1}개
            </span>
          </div>
          <div>
            <span>가격</span>
            <span>{total_cost}원</span>
          </div>
        </StyledHeaderInfoCard>
      </StyledPaymentHeader>
      {/* <StyledPaymentGraph></StyledPaymentGraph> */}
      <StyledFeatureSection>
        <StyledFeatureItem
          setPredictModal={setPredictModal}
          item={final_order_list}
        />
      </StyledFeatureSection>

      {predictModal && (
        <>
          <StyledpredictModalBg />

          <StyleddpredictModal>
            <header>배합시 예상치</header>
            {Object.keys(total_composition).map(
              (ele) =>
                ele && (
                  <div>
                    {" "}
                    <span>{ele}</span>{" "}
                    {["조섬유", "조회분", "수분"].indexOf(ele) !== -1 ? (
                      <span>
                        {Math.round(total_composition[ele] * 100) / 100}% 이하
                      </span>
                    ) : (
                      <span>
                        {Math.round(total_composition[ele] * 100) / 100}% 이상
                      </span>
                    )}
                  </div>
                )
            )}

            {/* <div>
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
            </div> */}
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
        {final_order_list !== null
          ? Object.keys(final_order_list).length !== 0
            ? Object.keys(final_order_list["추가급여"]).map((item) => (
                <div key={final_order_list["추가급여"][item].name}>
                  <img
                    src={require("../../Images/Basic/유산균.png")}
                    alt="유산균"
                  />
                  <span>
                    {final_order_list["추가급여"][item].name} (
                    {final_order_list["추가급여"][item].cnt}개)
                    <br /> {final_order_list["추가급여"][item].price}원
                  </span>
                  <StyledCntButton>
                    <div
                      onClick={() =>
                        _onDecrease(final_order_list["추가급여"][item].name)
                      }
                    >
                      -
                    </div>
                    <div>{final_order_list["추가급여"][item].cnt}</div>
                    <div
                      onClick={() =>
                        _onIncrease(final_order_list["추가급여"][item].name)
                      }
                    >
                      +
                    </div>
                  </StyledCntButton>
                </div>
              ))
            : "정보를 불러오는데 실패!"
          : "정보를 불러오는데 실패했습니다"}
      </StyledPairWrapper>
      <StyledSubTitle>Check Up</StyledSubTitle>
      <ReturnInfo />
      <StyledOtherInfo>
        <div>
          <span>기타안내</span>
          <head>아래</head>
        </div>
        <section>
          <header>상품결제정보</header>
          <p>
            - 고액결제의 경우 안전을 위해 카드사에서 확인전화를 드릴 수도
            있습니다. 확인과정에서 도난 카드의 사용이나 타인 명의의 주문등
            정상적인 주문이 아니라고 판단될 경우 임의로 주문을 보류 또는 취소할
            수 있습니다. - 무통장 입금은 상품 구매 대금은 PC뱅킹, 인터넷뱅킹,
            텔레뱅킹 혹은 가까운 은행에서 직접 입금하시면 됩니다. 주문시 입력한
            입금자명과 실제입금자의 성명이 반드시 일치하여야 하며, 7일 이내로
            입금을 하셔야 하며 입금되지 않은 주문은 자동취소 됩니다.
          </p>
        </section>

        <section>
          <header>배송정보</header>
          <p>
            배송 방법 : 택배
            <br /> 배송 지역 : 전국지역 <br />
            배송 비용 : 3,000원 <br />
            배송 기간 : 2일 ~ 3일 <br />
            배송 방법 : 택배 배송
            <br /> 지역 : 전국지역 <br />
            배송 비용 : 3,000원 <br />
            배송 기간 : 발송일로부터 2-3일 (주말, 공휴일 제외)
            <br /> - 산간벽지나 도서지방은 별도의 추가금액을 지불하셔야 하는
            경우가 있습니다. 고객님께서 주문하신 상품은 입금 확인후 배송해
            드립니다. 단, 상품종류에 따라서 상품의 배송이 다소 지연될 수
            있습니다.
          </p>
        </section>
        <section>
          <header>서비스문의</header>
          <p>
            - 닥터맘마 사이트 내 채팅상담 <br /> - 닥터맘마 사이트 내 Q&A <br />{" "}
            - 고객센터 (070-4109-8200)
            <br /> - 운영 시간 월 - 금AM 10:00 - PM 6:00 │점심시간AM 12:00 - PM
            1:30 토, 일, 공휴일 OFF
          </p>
        </section>
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
        {/* <StyledButton onClick={AddBasket}>장바구니</StyledButton> */}
        {/* <StyledNextButton onClick={BuyBasket}>바로구매</StyledNextButton> */}
        {/* <StyledPrevButton onclick={() => saveHistory()} to={"/payment-page"}>
          장바구니
        </StyledPrevButton> */}
        <StyledNextButton onClick={saveHistoryAndSendBuySignal}>
          바로구매
        </StyledNextButton>
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
  padding-top: 50px;

  div {
    text-align: left;
    font-size: 28px;
    letter-spacing: -1.4px;
    color: #ffffff;
    opacity: 1;
    margin-bottom: 5px;
  }
  span {
    margin-top: 5px;
    text-align: left;
    font-size: 15px;
    letter-spacing: -0.75px;
    color: #ffffff;
    font-weight: 300;
  }
`;

const StyledPaymentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  height: 100%;
  height: 100%;
  @media (max-width: 500px) {
    padding: 0 5px;
  }
`;

const StyledMedicineWrap = styled.div`
  /* border: 1px solid green; */
  position: relative;
  width: 200px;
  height: 230px;
  @media (max-width: 500px) {
    width: 180px;
  }
  @media (max-width: 455px) {
    width: 120px;
  }
  /* @media (max-width: 383px ) {
    width: 90px;
    left: -10px;
  } */
`;
const StyledMedicineChest = styled.img`
  position: absolute;
  width: 200px;
  top: 0;
  left: 0;
  @media (max-width: 500px) {
    left: -5%;
  }
  @media (max-width: 455px) {
    left: -40px;
  }
  /* @media (max-width: 383px ) {
  }  */
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
  @media (max-width: 395px) {
    width: 200px;
  }
  @media (max-width: 360px) {
    width: 180px;
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
  /* padding: 15px; */
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
  margin-top: 20px;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 5px;
  opacity: 1;
  padding: 15px;
  box-sizing: border-box;
  margin-bottom: 40px;
  color: #333333;
  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-top: 20px;
    margin-bottom: 25px;

    span {
      font-size: 15px;
      font-weight: bold;
      letter-spacing: -0.75px;
      color: #333333;
      opacity: 1;
    }
  }
  & > section > header {
    margin: 0;
    text-align: left;
    font-size: 13px;
    letter-spacing: -0.65px;
    color: #2b428e;
    margin-top: 10px;
    font-weight: 600;
  }
  & > section > p {
    margin: 0;
    margin-top: 5px;
    text-align: left;
    font-size: 13px;
    letter-spacing: -0.65px;
    color: #333333;
    line-break: normal;
    word-break: break-all;
    word-wrap: break-word;
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

const PaymentLoadingText = styled.div`
  text-align: left;
  letter-spacing: -1.4px;
  color: #333333;
  font-size: 28px;
  padding: 0 15px;

  @media (max-width: 500px) {
    font-size: 20px;
  }
`;
const PaymentLoading = styled.img`
  margin-top: 40px;
  width: 100%;
  margin-left: -30px;
  height: 100%;
  @media (max-width: 500px) {
    margin-top: 120px;
    margin-left: 0px;
  }
`;

const PaymentLoadingContainer = styled.div`
  padding-top: 25px;
`;
