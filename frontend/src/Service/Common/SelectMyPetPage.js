import React from "react";
import { useFetchMyPet } from "../../Hooks/useFetchMyPet";
import IdCard from "../../Components/Useful/IdCard";
import styled from "styled-components";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
function SelectMyPetPage({ petInfo }) {
  const myPet = useFetchMyPet(petInfo.owner);
  // 나중에 owner 넘겨주는 부분을 user reducer를 하나둬서, 따로 넣어줘야 할 것 같군요! 아니면 mount하자마자 owner는 petInfo에 바로 넣어주던가!
  // 왜냐면 가장 초기 1회에 pet생성을 하지 않으면 ............ 추가등록하기를 해야하니까 괜찮나? 이건 다시 생각해봅씨당
  return (
    <>
      <StyledMainInfo>반려동물을 선택해주세요</StyledMainInfo>
      <StyledSubInfo>
        내 아이만을 위한 맞춤정보와 제품을 만들 수 있어요 이미 5,323명의
        아이들이 이용했어요
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
  padding-top: 25px;
  margin-bottom: 25px;
  font-size: 28px;
  font-weight: 700;
  color: #e16a49;
  letter-spacing: -1.4px;
`;

const StyledSubInfo = styled.div`
  font-size: 15px;
  color: #080808;
  letter-spacing: -0.75px;
  line-height: 1.47;
  margin: 15px 0 30px;
`;
