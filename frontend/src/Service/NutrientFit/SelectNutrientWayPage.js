import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import MAIN_TOP_BG from "../../Images/NutrientFit/common/main-top-bg.svg";
import GO_MAIN_BTN from "../../Images/NutrientFit/icon/go-main-bt.svg";
import PLUS_IMG from "../../Images/NutrientFit/icon/plus.svg";
// import MEDICINE_ICON from "../../Images/NutrientFit/icon/i-make-nutrition.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import IdCard from "../../Components/Useful/IdCard";
import HealthGraph from "../Common/HealthGraph";
import { BACKEND } from "../../config";

// material-ui for [tab-bar]
import { withStyles, useTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import SwipeableViews from "react-swipeable-views";
import TabPanel from "../../Components/lib/TabPanel";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import axios from "axios";

import { setHistory } from "../../Redux/module/payment";

function SelectNutrientWayPage({ petInfo, setHistory }) {
  const [tabIndex, setTabIndex] = useState(0);
  const [makeHistory, setMakeHistory] = useState([]);
  const theme = useTheme();

  const handleChange = useCallback(
    (event, newValue) => {
      setTabIndex(newValue);
    },
    [tabIndex]
  );

  const handleChangeIndex = useCallback(
    (index) => {
      setTabIndex(index);
    },
    [tabIndex]
  );
  useEffect(() => {
    async function fetchData() {
      try {
        if (petInfo.id === "s") {
          const _res = await axios.get(`${BACKEND}/guest_history`);
          console.log("정체히스토리 목록들", _res.data);
          setMakeHistory(_res.data);
        } else {
          const _res = await axios.get(`${BACKEND}/mypet/${petInfo.owner}`);
          // petInfo.owner
          // petInfo.id
          console.log("정체히스토리 목록들", _res.data);
          setMakeHistory(
            _res.data.filter((pet) => pet.id === petInfo.id)[0].makehistory_set
          );
          console.log(
            "예전에 있던걸로 테스트 중임",
            _res.data.filter((pet) => pet.id === petInfo.id)[0].makehistory_set
          );
        }
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
    return console.log("clean up");
  }, []);

  const goToDrmamma = () => {
    window.parent.location.href = "https://m.drmamma.co.kr";
  };

  return (
    <>
      <StyledBackGround></StyledBackGround>
      <StyledMainInfo>영양제 만들기</StyledMainInfo>
      <StyledGoMainButton onClick={goToDrmamma} src={GO_MAIN_BTN} />
      <Link to="/select-mounted">
        <StyledRouteProfileList>프로필 교체 →</StyledRouteProfileList>
      </Link>
      <StyledSubInfo>
        불필요하고 중복되는 영양제는 이제 그만!
        <br />
        내 아이에게 꼭 필요한 영양제를 원한다면
        <br />
        닥터맘마 뉴트리핏!
      </StyledSubInfo>
      <StyledSelectWrapper>
        {petInfo.owner && petInfo.name ? (
          <IdCard petInfo={petInfo} />
        ) : (
          <Link to="/add-my-pet">
            <StyledPetCardBox>
              <StyledPlus></StyledPlus>
            </StyledPetCardBox>
          </Link>
        )}
        <SelectWaySection>
          <Link to="/Recommend-survey">
            <StyledSelectWayBox>
              <StyledSelectInfo color={"#E16A49"}>
                닥터맘마와 함께
                <br />
                영양제 만들기
              </StyledSelectInfo>
              <StyledSelectSubInfo>
                반려동물의 정보와 설문을
                <br />
                기반으로 원료를 쉽게
                <br />
                구성할 수 있습니다.
              </StyledSelectSubInfo>
              <StyledSelectLabel color={"#E16A49"}>
                <StyledSelectLabelInfo>추천해요!</StyledSelectLabelInfo>
              </StyledSelectLabel>
            </StyledSelectWayBox>
          </Link>
          <Link to="/self-make">
            <StyledSelectWayBox>
              <StyledSelectInfo color={"#344B9B"}>
                내가 직접
                <br />
                영양제 만들기
              </StyledSelectInfo>
              <StyledSelectSubInfo>
                다양한 원료를 자유롭게
                <br />
                구성할 수 있어
                <br />
                용량 조절이 가능합니다.
              </StyledSelectSubInfo>
              {/* <StyledSelectLabel color={"#344B9B"}>
                <StyledSelectLabelInfo>구성하기 →</StyledSelectLabelInfo>
              </StyledSelectLabel> */}
            </StyledSelectWayBox>
          </Link>
        </SelectWaySection>
      </StyledSelectWrapper>
      <StyledMainLabel>주의 질환</StyledMainLabel>
      <StyledHealthInfo>
        ※ 기입 정보 기반의 관리 필요 항목입니다.
        <br />
        가장 높은{" "}
        <StyledOrangeStrong>3가지 항목의 영양제 급여가 추천</StyledOrangeStrong>
        됩니다.
      </StyledHealthInfo>
      <HealthGraph />
      <div>
        <StyledUsedInfo fw={500}>맞춤영양제</StyledUsedInfo>
        {petInfo.id === "" ? (
          <StyledUsedInfo fw={300}>이용중입니다.</StyledUsedInfo>
        ) : (
          <StyledUsedInfo fw={300}>이용이력</StyledUsedInfo>
        )}
      </div>

      {petInfo.id === "" && (
        <StyledUsedCnt>
          {makeHistory.length}명의 아이들이 맞춤영양제를 이용중입니다.
        </StyledUsedCnt>
      )}

      <StyledUsedSub>
        {makeHistory.length > 3 ? (
          makeHistory
            .reverse()
            .slice(0, 3)
            .map((item) => {
              if (petInfo.id !== "") {
                return (
                  <Link
                    onClick={() => setHistory(item.historynutrient_set)}
                    to={"/payment-page"}
                  >
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtpK--9JWzhtXwkVeCUr3va5Cv2B7-XkdxXw&usqp=CAU" />

                    <div>
                      <span>강아지 {item.pet}</span>
                      {item.created_at.split("T")[0].substring(2) +
                        " " +
                        item.created_at.split("T")[1].substring(0, 5)}
                    </div>
                  </Link>
                );
              } else {
                return (
                  <div>
                    <img src="https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg" />
                    <p>
                      <span>강아지 {item.pet}</span>
                      {item.created_at.split("T")[0].substring(2) +
                        " " +
                        item.created_at.split("T")[1].substring(0, 5)}
                    </p>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtpK--9JWzhtXwkVeCUr3va5Cv2B7-XkdxXw&usqp=CAU" />
                  </div>
                );
              }
            })
        ) : makeHistory.length === 0 ? (
          <StyledUsedSubInfo>이용이력이 아직 없습니다 :&#41;</StyledUsedSubInfo>
        ) : (
          makeHistory.reverse().map((item) => {
            if (petInfo.id !== "") {
              return (
                <Link
                  onClick={() => setHistory(item.historynutrient_set)}
                  to={"/payment-page"}
                >
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtpK--9JWzhtXwkVeCUr3va5Cv2B7-XkdxXw&usqp=CAU" />

                  <div>
                    <span>강아지 {item.pet}</span>
                    {item.created_at.split("T")[0].substring(2) +
                      " " +
                      item.created_at.split("T")[1].substring(0, 5)}
                  </div>
                </Link>
              );
            } else {
              return (
                <div>
                  <img src="https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg" />
                  <p>
                    <span>강아지 {item.pet}</span>
                    {item.created_at.split("T")[0].substring(2) +
                      " " +
                      item.created_at.split("T")[1].substring(0, 5)}
                  </p>
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtpK--9JWzhtXwkVeCUr3va5Cv2B7-XkdxXw&usqp=CAU" />
                </div>
              );
            }
          })
        )}
        {/* <StyledUsedIcon src={MEDICINE_ICON} />
         */}
      </StyledUsedSub>
      <StyledUsedInfo fw={500}>고객센터</StyledUsedInfo>
      <StyledMargin></StyledMargin>
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
          QNA 들어가는 부분
        </TabPanel>
        <TabPanel value={tabIndex} index={2} dir={theme.direction}>
          FAQ 들어가는 부분
        </TabPanel>
      </SwipeableViews>
    </>
  );
}

// const mapStateToProps = (state) => {
//   return { petInfo: state.petInfo };
// };

// export default connect(mapStateToProps)(React.memo(SelectNutrientWayPage));

export default connect(
  ({ petInfo }) => ({
    petInfo: petInfo,
  }),
  { setHistory }
)(SelectNutrientWayPage);
// Styled-components

// Header
const StyledBackGround = styled.div`
  position: absolute;
  z-index: -1;
  top: 0;
  right: 0;
  width: 100%;
  height: 225px;
  background-image: url(${MAIN_TOP_BG});
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 0 0 25px 25px;
`;

const StyledMainInfo = styled.div`
  display: flex;
  padding: 25px 0 30px 0;
  font-size: 28px;
  font-weight: normal;
  color: #ffffff;
  letter-spacing: -1.4px;
`;

const StyledMainLabel = styled.div`
  font-size: 28px;
  font-weight: normal;
  text-align: left;
  letter-spacing: -1.4px;
  color: #333333;
  opacity: 1;
`;

const StyledHealthInfo = styled.div`
  font-size: 15px;
  letter-spacing: -0.75px;
  color: #333333;
`;

const StyledSubInfo = styled.div`
  font-size: 14px;
  height: 44px;
  font-weight: 200;
  letter-spacing: -0.75px;
  color: #ffffff;
  @media (max-width: 350px) {
    font-size: 13px;
  }
`;

const StyledGoMainButton = styled.img`
  width: 45px;
  height: 45px;
  position: absolute;
  top: 28px;
  right: 13px;
  cursor: pointer;
`;

const StyledRouteProfileList = styled.div`
  position: absolute;
  color: #ffffff;
  top: 134px;
  right: 19px;
  cursor: pointer;
  letter-spacing: -0.75px;
  font-size: 15px;
`;

const StyledSelectWrapper = styled.div`
  padding: 15px 0 35px;
`;

// plus box & pet id card
const StyledPetCardBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  width: 100%;
  height: 100px;
  background: #ffffff;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 10px;
  cursor: pointer;
`;

const StyledPlus = styled.div`
  width: 40px;
  height: 40px;
  padding: 5px;
  justify-content: center;
  background: #2b428e;
  font-size: 33px;
  color: #fff;
  border-radius: 50%;
  text-align: center;
  background-image: url(${PLUS_IMG});
  background-size: 26px;
  background-repeat: no-repeat;
  background-position: center;
`;

const SelectWaySection = styled.div`
  display: flex;
  justify-content: space-between;
`;
const StyledSelectWayBox = styled.div`
  position: relative;
  width: 48%;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 20px;
  padding: 26px 15px;
  margin-top: 15px;
  cursor: pointer;
  span {
    font-size: 22px;
    font-weight: 500;
  }
`;

const StyledSelectInfo = styled.div`
  color: ${(props) => props.color};
  letter-spacing: -1.1px;
  font-size: 22px;
  font-weight: normal;
  margin-bottom: 10px;
  @media (max-width: 385px) {
    font-size: 18px;
  }
  @media (max-width: 330px) {
    font-size: 17px;
  }
`;

const StyledSelectSubInfo = styled.div`
  font-size: 13px;
  font-weight: 300;
  letter-spacing: -0.65px;
  color: #333333;
  margin-bottom: 30px;
  @media (max-width: 365px) {
    font-size: 11px;
  }
`;

const StyledSelectLabel = styled.div`
  position: absolute;
  bottom: 15px;
  right: 0;
  width: 100px;
  background: ${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  border-radius: 20px 0 0 20px;
`;

const StyledSelectLabelInfo = styled.div`
  font-size: 15px;
  letter-spacing: -0.75px;
  color: #ffffff;
  opacity: 1;
`;

const StyledOrangeStrong = styled.span`
  color: #e16a49;
`;

// usage history
const StyledUsedInfo = styled.span`
  font-weight: ${(props) => props.fw};
  font-size: 22px;
  color: #333333;
  margin-right: 4px;
  letter-spacing: -1.1px;
`;
const StyledUsedCnt = styled.div`
  font: normal normal 300 15px/22px Noto Sans KR;
  letter-spacing: -0.75px;
  color: #333333;
  opacity: 1;
`;
const StyledUsedSub = styled.div`
  display: flex;
  margin: 10px 0 25px;
  flex-direction: column;
  & > div,
  & > a {
    display: flex;
    align-items: center;
    padding: 10px;
    margin: 10px 0;
  }

  & > div > img:nth-child(1) {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin-right: 15px;
  }
  & > div > p {
    flex: 1;
    text-align: left;
    font-size: 15px;
    font-weight: 300;
    letter-spacing: 0px;
    color: #a5a4a4;
    text-transform: lowercase;
  }
  & > div > p > span {
    text-align: left;
    font-size: 18px;
    font-weight: bold;
    letter-spacing: 0px;
    color: #333333;
    text-transform: lowercase;
    margin-right: 5px;
  }
  & > div > img:last-child {
    width: 20px;
    height: 20px;
  }

  & > a > img:nth-child(1) {
    width: 35px;
    height: 35px;
    margin-right: 15px;
  }

  & > a > div {
    display: flex;
    justify-content: space-between;
    flex: 1;
    text-align: left;
    font-size: 15px;
    font-weight: 300;
    letter-spacing: 0px;
    color: #a5a4a4;
    text-transform: lowercase;
    span {
      text-align: left;
      font-size: 18px;
      font-weight: bold;
      letter-spacing: 0px;
      color: #333333;
      text-transform: lowercase;
      margin-right: 5px;
    }
  }
`;

const StyledUsedIcon = styled.img`
  width: 27px;
`;
const StyledUsedSubInfo = styled.span`
  font-size: 18px;
  font-weight: 300;
  letter-spacing: -0.9px;
  color: #a5a4a4;
  margin-left: 5px;
`;

const StyledMargin = styled.div`
  height: 10px;
`;

// Tab-bars
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
