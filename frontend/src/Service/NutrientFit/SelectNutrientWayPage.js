import React, { useState, useCallback } from "react";
import styled from "styled-components";
import MAIN_TOP_BG from "../../Images/NutrientFit/common/main-top-bg.svg";
import GO_MAIN_BTN from "../../Images/NutrientFit/icon/go-main-bt.svg";
import PLUS_IMG from "../../Images/NutrientFit/icon/plus.svg";
import MEDICINE_ICON from "../../Images/NutrientFit/icon/i-make-nutrition.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import IdCard from "../../Components/Useful/IdCard";

// material-ui for [tab-bar]
import { withStyles, useTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import SwipeableViews from "react-swipeable-views";
import TabPanel from "../../Components/lib/TabPanel";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

function SelectNutrientWayPage({ petInfo }) {
  const [tabIndex, setTabIndex] = useState(0);

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

  return (
    <>
      <StyledBackGround></StyledBackGround>
      <StyledMainInfo>영양제 만들기</StyledMainInfo>
      <StyledGoMainButton src={GO_MAIN_BTN} />
      <Link to="/">
        <StyledRouteProfileList>프로필 교체 →</StyledRouteProfileList>
      </Link>
      <StyledSubInfo>
        반려동물의 정보를 입력 해 주시면 나이와 체중에 따라 <br /> 알맞는
        영양제를 추천해 드립니다.
      </StyledSubInfo>

      <StyledSelectWrapper>
        {petInfo ? (
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
                건강맞춤
                <br />
                추천 영양제
              </StyledSelectInfo>
              <StyledSelectSubInfo>
                건강, 나이 체중에 따라 전문가가 원료를 추천합니다.
              </StyledSelectSubInfo>
              <StyledSelectLabel color={"#E16A49"}>
                <StyledSelectLabelInfo>추천받기 →</StyledSelectLabelInfo>
              </StyledSelectLabel>
            </StyledSelectWayBox>
          </Link>
          <Link to="/self-make">
            <StyledSelectWayBox>
              <StyledSelectInfo color={"#344B9B"}>
                원료맞춤
                <br />
                커스텀 영양제
              </StyledSelectInfo>
              <StyledSelectSubInfo>
                다양한 원료를 자유롭게 구성할 수 있습니다.
              </StyledSelectSubInfo>
              <StyledSelectLabel color={"#344B9B"}>
                <StyledSelectLabelInfo>구성하기 →</StyledSelectLabelInfo>
              </StyledSelectLabel>
            </StyledSelectWayBox>
          </Link>
        </SelectWaySection>
      </StyledSelectWrapper>

      <div>
        <StyledUsedInfo fw={500}>맞춤영양제</StyledUsedInfo>
        <StyledUsedInfo fw={300}>이용 이력</StyledUsedInfo>
      </div>
      <StyledUsedSub>
        <StyledUsedIcon src={MEDICINE_ICON} />
        <StyledUsedSubInfo>이용이력이 아직 없습니다 :)</StyledUsedSubInfo>
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

const mapStateToProps = (state) => {
  return { petInfo: state.petInfo };
};

export default connect(mapStateToProps)(React.memo(SelectNutrientWayPage));

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
  margin: 25px 0 30px 0;
  font-size: 28px;
  font-weight: normal;
  color: #ffffff;
  letter-spacing: -1.4px;
  color: #333333;
  opacity: 1;
  font-size: 28px;
  font-weight: 300;
  padding: 40px 0;
  span {
    font-weight: bold;
  }
`;

const StyledSubInfo = styled.div`
  font-size: 15px;
  font-weight: 200;
  letter-spacing: -0.75px;
  color: #ffffff;
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
  margin-top: 40px;
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
  @media (max-width: 355px) {
    font-size: 19px;
  }
`;

const StyledSelectSubInfo = styled.div`
  font-size: 13px;
  font-weight: 300;
  letter-spacing: -0.65px;
  color: #333333;
  margin-bottom: 30px;
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

// usage history
const StyledUsedInfo = styled.span`
  font-weight: ${(props) => props.fw};
  font-size: 22px;
  color: #333333;
  margin-right: 4px;
  letter-spacing: -1.1px;
`;

const StyledUsedSub = styled.div`
  display: flex;
  margin: 10px 0 25px;
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
