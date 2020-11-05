import React from "react";
import { useFetchMyPet } from "../../Hooks/useFetchMyPet";
import IdCard from "../../Components/Useful/IdCard";
import styled from "styled-components";
import MAIN_TOP_BG from "../../Images/NutrientFit/common/main-top-bg.svg";
import GO_MAIN_BTN from "../../Images/NutrientFit/icon/go-main-bt.svg";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
function SelectMyPetPage({ petInfo }) {
  const myPet = useFetchMyPet(petInfo.owner);
  // 나중에 owner 넘겨주는 부분을 user reducer를 하나둬서, 따로 넣어줘야 할 것 같군요! 아니면 mount하자마자 owner는 petInfo에 바로 넣어주던가!
  // 왜냐면 가장 초기 1회에 pet생성을 하지 않으면 ............ 추가등록하기를 해야하니까 괜찮나? 이건 다시 생각해봅씨당
  return (
    <>
      <StyledBackGround></StyledBackGround>
      <StyledMainInfo>프로필 교체하기</StyledMainInfo>
      <StyledGoMainButton src={GO_MAIN_BTN} />
      <StyledSubInfo>
        불필요하고 중복되는 영양제는 이제 그만! 내 아이에게 꼭 필요한 영양제를 원한다면 닥터맘마 뉴트리핏!
      </StyledSubInfo>

      {myPet &&
        myPet.map((petInfo) => <IdCard key={petInfo.id} petInfo={petInfo} />)}
      <Link to="/add-my-pet">
        <StyledAddNewPetButton>
          <StyledPlus>+</StyledPlus>
        </StyledAddNewPetButton>
      </Link>
    </>
  );
}

const mapStateToProps = (state) => {
  return { petInfo: state.petInfo };
};

export default connect(mapStateToProps)(SelectMyPetPage);

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
  /* text-shadow: 2px 2px #00000029; */
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
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
  margin: 15px 0;
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