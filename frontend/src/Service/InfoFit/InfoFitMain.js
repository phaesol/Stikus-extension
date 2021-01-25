import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled, { css } from 'styled-components';
import axios from "axios";
import { BACKEND } from '../../config';
// import { connect } from 'react-redux';
import INPUT_PLUS_BTN from "../../Images/InfoFit/bt-input.svg";
import MAIN_TOP_BG from "../../Images/InfoFit/information-bg.svg";
import GO_MAIN_BTN from "../../Images/NutrientFit/icon/go-main-bt.svg";

// material-ui for [tab-bar]
import { withStyles, useTheme } from "@material-ui/core/styles";
// import Paper from "@material-ui/core/Paper";
import SwipeableViews from "react-swipeable-views";
import TabPanel from "../../Components/lib/TabPanel";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import InputInfo from "../../Components/InfoFit/InputInfo";
import SubCategoryFilter from "../../Components/InfoFit/SubCategoryFilter";
import VideoCard from "../../Components/InfoFit/VideoCard";



const mockAsyncInfoData = () => 
    new Promise(resolve => {
        setTimeout(async function() {
            const result = await axios.get(`${BACKEND}/info`)
            // const result = await axios.get(`http://127.0.0.1:8000/info`)
            resolve({
                data: result.data
            })
        }, 250)
    })


function InfoFitMain () {
    const [infos, setInfos] = useState(null);
    const [tabIndex, setTabIndex] = useState(0);
    const [InputVisible, setInputVisible] = useState(false);

    const [health, setHealth] = useState([]);
    const [age, setAge] = useState([]);
    const [eco, setEco] = useState([]);
    const [behavior, setBehavior] = useState([]);

    const [infoAge, setInfoAge] = useState(null);

    const [status, setStatus] = useState({
        age1: null,
        age2: null,
        weight1: null,
        weight2: null,
      })
    
    const { age1, age2, weight1, weight2 } = status;

    useEffect(() => {
      if (!age1 && !age2) { return } 

      let calAge = 0;
      if(age1) { calAge += parseInt(age1) * 12 }
      if(age2) { calAge += parseInt(age2) }

      if (calAge < 5) { setInfoAge("4개월 이하"); return; }
      if (calAge < 13) { setInfoAge("1살 이하"); return; }
      if (calAge < 85) { setInfoAge("7살 이하"); return; }
      if (calAge < 145) { setInfoAge("12살 이하"); return; }
      if (calAge >= 145) { setInfoAge("12살 이상"); return; }

    }, [age1, age2])

    const HealthFilter = useCallback((targetHealth) => {
      if (targetHealth === "init") { setHealth([]); return; }

      let tempHealth = [...health];
      if (tempHealth.includes(targetHealth)) {
        const idx = tempHealth.indexOf(targetHealth)
        if (idx > -1) tempHealth.splice(idx, 1)
        setHealth(tempHealth)
      } else {
        tempHealth.push(targetHealth)
        setHealth(tempHealth)
      }
    }, [health])

    const AgeFilter = useCallback((targetAge, isInfo=false) => {
      if (isInfo) { setAge([targetAge]); return; }

      if (targetAge === "init") { setAge([]); return; }
      
      let tempAge = [...age];

      if (tempAge.includes(targetAge)) {
        const idx = tempAge.indexOf(targetAge)
        if (idx > -1) tempAge.splice(idx, 1)
        setAge(tempAge)
      } else {
        tempAge.push(targetAge)
        setAge(tempAge)
      }
    }, [age, infoAge])

    const EcoFilter = useCallback((targetEco) => {
      if (targetEco === "init") { setEco([]); return; }

      let tempEco = [...eco];
      if (tempEco.includes(targetEco)) {
        const idx = tempEco.indexOf(targetEco)
        if (idx > -1) tempEco.splice(idx, 1)
        setEco(tempEco)
      } else {
        tempEco.push(targetEco)
        setEco(tempEco)
      }
    }, [eco])
    
    const BehaviorFilter = useCallback((targetBehavior) => {
      if (targetBehavior === "init") { setBehavior([]); return; }
      
      let tempBehavior = [...behavior];
      if (tempBehavior.includes(targetBehavior)) {
        const idx = tempBehavior.indexOf(targetBehavior)
        if (idx > -1) tempBehavior.splice(idx, 1)
        setBehavior(tempBehavior)
      } else {
        tempBehavior.push(targetBehavior)
        setBehavior(tempBehavior)
      }
    }, [behavior])


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
    
    const getInfoDataAxios = async () => {
        try {
            const { data: fetchedData } = await mockAsyncInfoData();
            setInfos(fetchedData);
        } catch (err) {
            console.log(err); 
        }
    };


    const displayInput = useCallback(() => {
        setInputVisible(!InputVisible)
    }, [InputVisible])

    useEffect(() => {
        getInfoDataAxios()
    },[])

    const goToDrmamma = () => {
        window.parent.location.href = "https://drmamma.co.kr";
      };
    
    
    const subFilter = (type, subCategory) => {
      for (let cnt=0; cnt<type.length; cnt++) {
        if(subCategory.includes(type[cnt])) { return true } 
      }
    }


    return (
        <> <StyledBackGround></StyledBackGround>
            {InputVisible && <InputInfo status={status} setStatus={setStatus} toggle={setInputVisible} />}

            
        <StyledMainInfo>댕냥 도서관</StyledMainInfo>
        <StyledGoMainButton onClick={goToDrmamma} src={GO_MAIN_BTN} />
        <StyledSubInfo>
            '수의사'가 알려주는 반려동물 육아의 모든 것!
            <br />
            정보를 입력하고 '탭'을 클릭하세요!
        </StyledSubInfo>
      
        {(age1 || age2 || weight1 || weight2) ? 
        
          <StyledInfoWrapper onClick={displayInput}>
            <div>
              {age1 && age1}
              {(age1 && !age2) && "살"}
              {(age1 && age2) && "년 "}
               {age2 && `${age2}개월`}
            </div>
            <div>
              {weight1 && weight1} 
              {(!weight1 && weight2) && "0."}
              {(weight1 && weight2) && "."} 
              {weight2 && weight2} 
              {(weight1 || weight2) && "kg"}
            </div>
          </StyledInfoWrapper>
        : 
          <StyledInfoBtn onClick={displayInput}>
              반려동물 정보 입력
              <img src={INPUT_PLUS_BTN} />
          </StyledInfoBtn>
        }
        
        <StyleIgnorePadding>
            <StyledTabs
                value={tabIndex}
                onChange={handleChange}
                variant="fullWidth"
                >
                <StyledTab value={0} label="건강" />
                <StyledTab value={1} label="나이" />
                <StyledTab value={2} label="환경" />
                <StyledTab value={3} label="행동" />
            </StyledTabs>

            <SwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={tabIndex}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={tabIndex} index={0} dir={theme.direction}>
                  <SubCategoryFilter 
                    type="건강"
                    filter={HealthFilter}
                  />
                  {health.length ?

                    infos && infos.filter((each) => each.main_category === "건강")
                      .filter((sub) => subFilter(health, sub.sub_category))
                      .map(data => 
                        <VideoCard 
                          key={data.id}
                          subject={data.subject}
                          content={data.content}
                          youtube_link={data.youtube_link}
                          cover_img={data.cover_img}
                          temp={data.sub_category}
                        />
                    )
                    :
                    infos && infos.filter((each) => each.main_category === "건강")
                      .map(data => 
                        <VideoCard 
                          key={data.id}
                          subject={data.subject}
                          content={data.content}
                          youtube_link={data.youtube_link}
                          cover_img={data.cover_img}
                          temp={data.sub_category}
                        />
                    )}
                </TabPanel>
                <TabPanel value={tabIndex} index={1} dir={theme.direction}>
                  <SubCategoryFilter 
                    type="나이"
                    filter={AgeFilter}
                    infoAge={infoAge}
                  />
                  {age.length ?

                    infos && infos.filter((each) => each.main_category === "나이")
                      .filter((sub) => subFilter(age, sub.sub_category))
                      .map(data => 
                        <VideoCard 
                            key={data.id}
                            subject={data.subject}
                            content={data.content}
                            youtube_link={data.youtube_link}
                            cover_img={data.cover_img}
                            temp={data.sub_category}
                          />
                    )
                  : 
                    infos && infos.filter((each) => each.main_category === "나이")
                      .map(data => 
                        <VideoCard 
                            key={data.id}
                            subject={data.subject}
                            content={data.content}
                            youtube_link={data.youtube_link}
                            cover_img={data.cover_img}
                            temp={data.sub_category}
                          />
                  )} 
                  
                </TabPanel>
                <TabPanel value={tabIndex} index={2} dir={theme.direction}>
                  <SubCategoryFilter 
                    type="환경"
                    filter={EcoFilter}
                  />
                  {eco.length ?

                    infos && infos.filter((each) => each.main_category === "환경")
                      .filter((sub) => subFilter(eco, sub.sub_category))
                      .map(data => 
                        <VideoCard 
                          key={data.id}
                          subject={data.subject}
                          content={data.content}
                          youtube_link={data.youtube_link}
                          cover_img={data.cover_img}
                          temp={data.sub_category}
                        />
                    )
                    :
                    infos && infos.filter((each) => each.main_category === "환경")
                      .map(data => 
                        <VideoCard 
                          key={data.id}
                          subject={data.subject}
                          content={data.content}
                          youtube_link={data.youtube_link}
                          cover_img={data.cover_img}
                          temp={data.sub_category}
                        />
                    )}
                 
                </TabPanel>
                <TabPanel value={tabIndex} index={3} dir={theme.direction}>
                  <SubCategoryFilter 
                    type="행동"
                    filter={BehaviorFilter}
                  />

                  {behavior.length ?

                  infos && infos.filter((each) => each.main_category === "행동")
                    .filter((sub) => subFilter(behavior, sub.sub_category))
                    .map(data => 
                      <VideoCard 
                        key={data.id}
                        subject={data.subject}
                        content={data.content}
                        youtube_link={data.youtube_link}
                        cover_img={data.cover_img}
                        temp={data.sub_category}
                      />
                  )
                  :
                  infos && infos.filter((each) => each.main_category === "행동")
                    .map(data => 
                      <VideoCard 
                        key={data.id}
                        subject={data.subject}
                        content={data.content}
                        youtube_link={data.youtube_link}
                        cover_img={data.cover_img}
                        temp={data.sub_category}
                      />
                  )}
                </TabPanel>
            </SwipeableViews>

          <StyledTabBarWrapper>
            <StyledTabBar disabled={tabIndex === 0} >건강</StyledTabBar>
            <StyledTabBar disabled={tabIndex === 1} >나이</StyledTabBar>
            <StyledTabBar disabled={tabIndex === 2} >환경</StyledTabBar>
            <StyledTabBar disabled={tabIndex === 3} >행동</StyledTabBar>
          </StyledTabBarWrapper>
          </StyleIgnorePadding>

        </>
    )
}


// const mapStateToProps = state => {
//     return { 
//         user: state.user,
//         petInfo: state.petInfo 
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return { 
//         dispatchPetInfo: {
//             dispatchSetPetID: id => dispatch(setPetID(id)),
//             dispatchSetPetInfo : (owner, name, age, weight, body_format, kind, activity, breed, sex, neutralization) => dispatch(setPetInfo(owner, name, age, weight, body_format, kind, activity, breed, sex, neutralization)),
//             dispatchSetPetImage : image => dispatch(setPetImage(image))
//         }
//     }
// }

export default React.memo(InfoFitMain);

const StyledBackGround = styled.div`
  position: absolute;
  z-index: -1;
  top: 0;
  right: 0;
  width: 100%;
  height: 295px;
  background-image: url(${MAIN_TOP_BG});
  background-repeat: no-repeat;
  background-size: cover;
  /* border-radius: 0 0 25px 25px; */
`;


const StyledMainInfo = styled.div`
  display: flex;
  padding: 40px 0 10px 0;
  font-size: 28px;
  font-weight: normal;
  color: #ffffff;
  letter-spacing: -1.4px;
`;



const StyledSubInfo = styled.div`
  font-size: 15px;
  height: 50px;
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
  top: 40px;
  right: 13px;
  cursor: pointer;
`;

const StyledInfoBtn = styled.div`
  margin: 20px 0 100px 0;
  cursor: pointer;
  height: 55px;
  background: #E37759 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  letter-spacing: -0.9px;
  color: #FFFFFF;
  img {
      width: 22px;
      height: 22px;
      margin-left: 13px;
      padding-top: 1.5px;
  }
`;

// const StyledTab


const StyleIgnorePadding = styled.div`
    width: calc(100% + 30px);
    margin-left: -15px;
    margin-top: -71px;
    /* z-index: 1; */
`;
// Tab-bars
const StyledTabs = withStyles({
    indicator: {
      backgroundColor: "#E16A49",
      fontSize: "25px",
      height: "3px",
      zIndex: "1",
      borderRadius: "10px 10px 0 0",
    },
  })(Tabs);
  
  const StyledTab = withStyles({
    textColorInherit: {
      fontWeight: "300",
      color: "#FFFFFF",
      // color: "#E16A49",
      letterSpacing: "-0.9px",
      fontSize: "18px",
      fontFamily: "NotoSansKR",
    },
  })(Tab);
  


const StyledTabBarWrapper = styled.div`
  position: absolute;
  top: 245px;
  width: 100%;
  pointer-events: none;
`;

const StyledTabBar = styled.div`
  float: left;
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 25%;
  height: 50px;
  background: transparent;
  opacity: 0;
  font-weight: 500;
  font-size: 18px;
  position: relative;
  z-index: 3;
  border-radius: 10px 10px 0px 0px;
  pointer-events: none;
  ${(props) =>
      props.disabled &&  
      css`
        background: #FFFFFF;
        opacity: 1;
        color: #E16A49;
        /* display: none; */

        /* cursor: not-allowed; */
      `
    }
`;


const StyledInfoWrapper = styled.div`
  width: 100%;
  margin: 20px 0 100px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48%;
    height: 55px;
    background: #E37759;
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 10px;
    font-size: 18px;
    font-family: "NotoSansKR";
    letter-spacing: -0.9px;
    color: #FFFFFF;
    cursor: pointer;
  }
`;