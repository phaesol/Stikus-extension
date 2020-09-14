import React from "react";
import styled from "styled-components";
import StyledPrevButton from "../../Components/button/StyledPrevButton";
import StyledNextButton from "../../Components/button/StyledNextButton";
import { ReactComponent as UseFeed } from "../../Images/Basic/use-feed.svg";
import { ReactComponent as UseMix } from "../../Images/Basic/use-mix.svg";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { withStyles, useTheme } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";



const PaymentPage = () => {
  const [tabIndex, setTabIndex] = React.useState(0);
  const theme = useTheme();
  const [optionProduct, setOptionProduct] = React.useState([
    { name: "유산균", cnt: 1, amount: "1Box", cost: "35,000" },
    { name: "오메가3", cnt: 1, amount: "30ml", cost: "13,000" },
  ]);

  function _onIncrease(name){
    setOptionProduct(
      optionProduct.map((item) =>
        item.name === name ? { ...item, cnt: item.cnt + 1 } : item
      )
    );
  }
  function _onDecrease(name) {
    setOptionProduct(
      optionProduct.map((item) =>
        item.name === name && item.cnt!== 1 ? { ...item, cnt: item.cnt -1 } : item
      )
    );
  }
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };
    const handleChangeIndex = (index) => {
      setTabIndex(index);
    };
  return (
    <>
      <StyledPaymentHeader>
        <StyledMedicineChest
          src={require(`../../Images/Basic/composition.png`)}
        />
        <StyledHeaderInfoCard>
          <header>토토리의 영양제</header>
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
        <header>
          <span>원료별 특징</span>
          <b>배합시 예상치 보기</b>
        </header>
        <StyledFeatureCard>
          <div>
            <span>글루코사민</span>
            <span>캐나다 로셀의 특허인증 원료</span>
          </div>
          <div>
            <span>코엔자임 큐텐</span>
            <span>심혈관 관리에 탁월</span>
          </div>
          <div>
            <span>유산균</span>
            <span>장관리에 특화된 유산균 11종</span>
          </div>
          <div>더보기 </div>
        </StyledFeatureCard>

        <header>
          <span>Active Ingredients</span>
          <span>(하루 2스푼 기준)</span>
        </header>
        <StyledFeatureCard>
          <div>
            <span>글루코사민</span>
            <span>33.3mg</span>
          </div>
          <div>
            <span>코엔자임 큐텐</span>
            <span>15mg</span>
          </div>
          <div>
            <span>유산균</span>
            <span>10mg</span>
          </div>
          <div>더보기 </div>
        </StyledFeatureCard>
      </StyledFeatureSection>
      <StyledSharingButton>카카오톡으로 결과 보내기</StyledSharingButton>

      <StyledSubTitle>급여방법</StyledSubTitle>
      <StyledPairCard>
        <div>
          <UseMix />
          동봉된 빈용기에
          <br /> 원료를 혼합
        </div>
        <div>
          <UseFeed />
          동봉된 스푼(1회 분)
          <br /> 1일 2회 급여
        </div>
      </StyledPairCard>
      <StyledSubTitle>보관방법</StyledSubTitle>
      <StyledKeepInfo>
        <span>- 직사광선이 없는 곳에서 실온보관</span>
        <span>
          - 개봉 후에는 변질의 우려가 있으니 되도록 빠른 시일 내 급여하여
          주십시오.
        </span>
      </StyledKeepInfo>
      <StyledSubTitle>제품 정보</StyledSubTitle>
      <StyledProductInfo>
        <div>이미지자리</div>
        <div>
          <div>
            <span>사이즈</span>
            <span>지름 5.5cm, 높이 10.1cm의 원형</span>
          </div>
          <div>
            <span>무게</span>
            <span>60g</span>
          </div>
          <div>
            <span>급여가능연령</span>
            <span>생 후 3개월 이후부터</span>
          </div>
          <div>
            <span>제조일자</span>
            <span>유통기한으로부터 24개월 전</span>
          </div>
          <div>
            <span>유통기한</span>
            <span>별도표기</span>
          </div>
        </div>
      </StyledProductInfo>
      <StyledSubTitle>같이 먹으면 좋아요!</StyledSubTitle>
      <StyledPairCard>
        {optionProduct.map((item) => (
          <div key={item.name}>
            <img src={require("../../Images/Basic/유산균.png")}  alt="유산균"/>
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
      </StyledPairCard>
      <StyledSubTitle>Check Up</StyledSubTitle>
      <StyledReturnInfo>
        <div>교환 / 반품 안내</div>
        <div>
          <span>교환 및 반품이 가능한 경우</span>
          <span>
            1. 구매자 단순 변심은 상품 수령 후 7일 이내
            <br /> {"\u00A0\u00A0\u00A0"}(구매자 반품배송비 부담)
          </span>
          <span>
            2. 표시/광고와 상이, 상품 하자의 경우 상품 수령 후 3개월 이내, 그
            사실을 안 날로부터 30일 이내 (판매자 반품배송비 부담)
          </span>
          <span>3. 제품 교환은 포장을 훼손하지 않아야 가능</span>
          <span>
            ※ 구매자의 단순 변심으로 교환/반품을 하실 경우 상품 반송 비용은
            구매자가 부담해야 합니다.
          </span>
          <span>
            ※ 교환이나 반품 의사를 밝히지 않고 일방적으로 반품을 보내실 경우
            교환/반품이 제대로 처리되지 않을 수 있습니다.
          </span>
        </div>
        <div>
          <span>교환 및 반품이 불가능한 경우</span>
          <span>1. 교환 및 반품 요청 기간이 지난 경우</span>
          <span>
            2. 구매자의 책임 있는 사유로 상품 등이 멸실 또는 훼손된 경우
          </span>
          <span>3. 제품의 포장이 훼손되어 상품 가치가 현저히 훼손된 경우 </span>
          <span>
            4. 구매자의 사용 또는 일부 소비에 의해 상품 가치가 현저히 감소한
            경우
          </span>
          <span>
            5. 시간의 경과에 의하여 재판매가 곤란할 정도로 상품 등의 가치가
            현저히 감소한 경우
          </span>
          <span>6. 복제가 가능한 상품 등의 포장을 훼손한 경우</span>
        </div>
      </StyledReturnInfo>
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
        <StyledPrevButton path={"/payment-page"}>장바구니</StyledPrevButton>
        <StyledNextButton path={"/payment-page"}>바로구매</StyledNextButton>
      </StyledButtonWrapper>
    </>
  );
};

export default PaymentPage;
const StyledPaymentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
`;
const StyledMedicineChest = styled.img``;

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
    }
  }
`;

const StyledFeatureCard = styled.div`
  width: 100%;
  height: 160px;
  margin-top: 15px;
  padding: 15px;
  box-sizing: border-box;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 10px;
  opacity: 1;

  & > div {
    display: flex;
    justify-content: space-between;
    span:nth-child(1) {
      color: #a5a4a4;
    }
  }
  & > div + div {
    margin-top: 10px;
  }

  & > div:nth-child(4) {
    margin-top: 25px;
    display: block;
    text-align: center;

    font-size: 15px;
    font-weight: bold;
    letter-spacing: -0.75px;
    color: #2b428e;
    opacity: 1;
    cursor: pointer;
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

const StyledSharingButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  height: 45px;
  width: 100%;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  border: 1px solid #e16a49;
  border-radius: 5px;
  opacity: 1;

  font-size: 17px;
  font-weight: bold;
  letter-spacing: -0.85px;
  color: #e16a49;
  opacity: 1;

  cursor: pointer;
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

const StyledPairCard = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  & > div {
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    width: 48%;
    padding: 20px;
    box-sizing: border-box;
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 10px;
    opacity: 1;

    font-size: 15px;
    letter-spacing: 0px;
    color: #333333;
    font-weight: bold;
    svg {
      margin-bottom: 20px;
    }
    span {
      margin-top: 15px;
    }
  }
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

const StyledProductInfo = styled.div`
  margin-top: 15px;
  padding: 15px;
  box-sizing: border-box;
  height: 340px;
  width: 100%;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 10px;
  opacity: 1;

  & > div:nth-child(1) {
    height: 135px;
    border: 1px solid black;
  }
  & > div:nth-child(2) {
    margin-top: 25px;
  }
  & > div:nth-child(2) div {
    display: flex;
    justify-content: space-between;
  }
  & > div:nth-child(2) div + div {
    margin-top: 10px;
  }

  & > div:nth-child(2) div span {
    font-size: 15px;
    letter-spacing: -0.75px;
    color: #333333;
    font-weight: 600;
  }
  & > div:nth-child(2) div span:nth-child(1) {
    color: #a5a4a4;
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

const StyledReturnInfo = styled.div`
  margin-top: 15px;
  padding: 15px;
  box-sizing: border-box;
  div:nth-child(1) {
    font-weight: bold;
    font-size: 15px;
    letter-spacing: -0.75px;
    color: #333333;
    opacity: 1;
  }
  div {
    margin-top: 20px;
  }
  div > span {
    display: block;
    font-size: 13px;
  }
  div > span + span {
    margin-top: 5px;
  }
  div:nth-child(2) span:nth-child(1) {
    color: #2b428e;
    font-weight: bold;
  }
  div:nth-child(3) span:nth-child(1) {
    color: #e16a49;
    font-weight: bold;
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
    fontWeight:"500",
    color: "#FC6E51",
  },
})(Tab);
