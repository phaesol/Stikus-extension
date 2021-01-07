import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled, { css } from 'styled-components';
import axios from "axios";
// import { BACKEND } from '../../config';
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



const mockAsyncInfoData = () => 
    new Promise(resolve => {
        setTimeout(async function() {
            const result = await axios.get(`http://127.0.0.1:8000/info`)
            resolve({
                data: result.data
            })
        }, 250)
    })


function InfoFitMain () {
    const [infos, setInfos] = useState(null);
    const [tabIndex, setTabIndex] = useState(0);
    const [InputVisible, setInputVisible] = useState(true);
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
            console.log("fetchedData", fetchedData)
            setInfos(fetchedData);
            // setLoading(false)
        } catch (err) {
            console.log(err); 
        }
    };


    const displayInput = useCallback(() => {
        setInputVisible(!InputVisible)
    }, [InputVisible])

    useEffect(() => {
        // 백엔드에서 data 모두 fetch
        getInfoDataAxios()
    },[])

    const goToDrmamma = () => {
        window.parent.location.href = "https://drmamma.co.kr";
      };
    
    
    return (
        <> <StyledBackGround></StyledBackGround>
            {InputVisible && <InputInfo />}

            
        <StyledMainInfo>정보 만들기</StyledMainInfo>
        <StyledGoMainButton onClick={goToDrmamma} src={GO_MAIN_BTN} />
        <StyledSubInfo>
            내 아이의 나이와 체중을 입력하시면
            <br />
            더 다양한 건강정보를 알 수 있습니다.
        </StyledSubInfo>
      
        <StyledInfoBtn onClick={displayInput}>
            반려동물 정보 입력
            <img src={INPUT_PLUS_BTN} />
        </StyledInfoBtn>

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
                건강건강
                </TabPanel>
                <TabPanel value={tabIndex} index={1} dir={theme.direction}>
                나이나이
                </TabPanel>
                <TabPanel value={tabIndex} index={2} dir={theme.direction}>
                환경환경
                </TabPanel>
                <TabPanel value={tabIndex} index={3} dir={theme.direction}>
                행동행동
                </TabPanel>
            </SwipeableViews>
        </StyleIgnorePadding>


        {infos && infos.map((data)=> 
            <div>{data.subject}</div>
        )}





            
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
    width: 100vw;
    margin-left: -15px;
`;
// Tab-bars
const StyledTabs = withStyles({
    indicator: {
      backgroundColor: "#E16A49",
      fontSize: "25px",
      height: "60px",
      zIndex: "1",
      borderRadius: "10px 10px 0 0",
    },
  })(Tabs);
  
  const StyledTab = withStyles({
    textColorInherit: {
      fontWeight: "500",

      color: "#E16A49",
      letterSpacing: "-0.9px",
      fontSize: "18px",
      zIndex: "2",
    },
  })(Tab);
  
