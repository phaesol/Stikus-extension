import React, { useState, useEffect } from "react";
import IdCard from "../../Components/Useful/IdCard";
import styled from "styled-components";
import MAIN_TOP_BG from "../../Images/NutrientFit/common/main-top-bg.svg";
import GO_MAIN_BTN from "../../Images/NutrientFit/icon/go-main-bt.svg";

import { MiniLoading } from "../../Components/Useful/MiniLoading";
import { setUserAction } from "../../Redux/Actions/userActions";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import axios from "axios";
import { BACKEND } from "../../config";



const mockAsyncMyPetData = (owner) => 
    new Promise(resolve => {
        setTimeout(async function() {
            const result = await axios.get(`${BACKEND}/mypet/${owner}`)
            resolve({
                data: result.data
            })
        }, 400)
    })





function SelectMyPetPage({ userFromStore }) {
  const [loading, setLoading] = useState(true)
  const [myPet, setMyPet] = useState(null);
  const history = useHistory();

  const { memberId } = userFromStore;

  const getMyPetDataAxios = async () => {
    try {
        const { data: fetchedData } = await mockAsyncMyPetData(memberId);
        console.log("fetchedData", fetchedData)
        setMyPet(fetchedData);
        setLoading(false)
    } catch (err) {
        console.log(err);      

    }
  };

  const goToDrmamma = () => {
      window.parent.location.href="https://drmamma.co.kr"
  }
  const RouteToAdd = () => {
    history.push('add-my-pet')
  }

  useEffect(()=> {
    getMyPetDataAxios()
  }, [])
  
  

  return (
    <>
      <StyledBackGround></StyledBackGround>
      <StyledMainInfo>프로필 교체하기</StyledMainInfo>
      <StyledGoMainButton onClick={goToDrmamma} src={GO_MAIN_BTN} />
      <StyledSubInfo>
        불필요하고 중복되는 영양제는 이제 그만! 내 아이에게 꼭 필요한 영양제를 원한다면 닥터맘마 뉴트리핏!
      </StyledSubInfo>
      
      {myPet &&
        myPet.map((petInfo) => <IdCard key={petInfo.id} petInfo={petInfo} />)}
      

      {loading ? <MiniLoading /> : 
        <StyledAddNewPetButton onClick={RouteToAdd}>
          <StyledPlus>+</StyledPlus> 
        </StyledAddNewPetButton>
      }
      {/* </Link> */}

      

    </>
  );
}

const mapStateToProps = state => {
  return { 
    userFromStore: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchSetUser: userInfo => dispatch(setUserAction(userInfo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectMyPetPage);

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

const StyledAddNewPetButton = styled.div`
  width: 100%;
  height: 100px;
  box-shadow: 0 3px 6px 0 #00000029;
  background: #FFFFFF;
  /* text-shadow: 2px 2px #00000029; */
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
  /* z-index: 100000; */
  cursor: pointer;
`;

const StyledPlus = styled.div`
  width: 50px;
  height: 50px;
  justify-content: center;
  background: #2b428e;
  font-size: 33px;
  color: #fff;
  border-radius: 50%;
  text-align: center;
`;

const StyledMainInfo = styled.div`
  display: flex;
  padding: 25px 0 5px 0;
  font-size: 28px;
  font-weight: normal;
  color: #FFFFFF;
  letter-spacing: -1.4px;
`;

const StyledSubInfo = styled.div`
  font-size: 15px;
  color: #FFFFFF;
  letter-spacing: -0.75px;
  line-height: 1.47;
  font-weight: 300;
  margin: 17px 0;
  max-width: 250px;
`;


const StyledGoMainButton = styled.img`
  width: 45px;
  height: 45px;
  position: absolute;
  top: 28px;
  right: 13px;
  cursor: pointer;
`;