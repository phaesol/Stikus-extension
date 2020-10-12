import React, { useState } from 'react';
import styled from 'styled-components';
import IdCard from '../../Components/Useful/IdCard';
import MAKE_NUTRITION_IMAGE from '../../Images/Basic/menu-to-nutrient.png';
import { connect } from 'react-redux';
import SelectNutrientWayPage from '../NutrientFit/SelectNutrientWayPage';


function DoctorFitMenuPage ({ petInfo }) {
    const [which, setWhich] = useState('');
    const goToMakeNutrinet = () => {
        setWhich("make-nutrient")
    }
    if (!which) 
        return (
            <>
                <StyledMainInfo>내 아이에게 &nbsp;
                    <StyledInnerInfo>딱! 맞는 제품</StyledInnerInfo>은?
                </StyledMainInfo>
                        
                <StyledSubInfo>내 아이만을 위한 맞춤정보와 제품을 만들 수 있어요<br />이미 5,352명의 아이들이 이용했어요</StyledSubInfo>

                <IdCard petInfo={petInfo} />
                
                <StyledNutrientFitMenu onClick={goToMakeNutrinet}>
                    <StyledMenuDescWrapper>
                        <StyledInnerMenuDesc>맞춤 영양제                        
                            <StyledInnerMenuDescSmall>만들기</StyledInnerMenuDescSmall>
                        </StyledInnerMenuDesc>
                    </StyledMenuDescWrapper>
                </StyledNutrientFitMenu>
            </>
        )
    if (which === "make-nutrient") 
        return (
            <>
                <SelectNutrientWayPage />
            </>
        )
}

const mapStateToProps = state => {
    return { petInfo: state.petInfo }
};

export default connect(mapStateToProps)(DoctorFitMenuPage);


const StyledMainInfo = styled.div`
    margin: 25px 0;
    font-size: 28px;
    font-weight: 300;
    color: #333333; 
    letter-spacing: -1.4px;
`;

const StyledInnerInfo = styled.div`
    display: inline;
    font-weight: 700;
    color: #e16a49;
`;

const StyledSubInfo = styled.div`
    font-size: 15px;
    color: #080808;
    letter-spacing: -0.75px;
    line-height: 1.47;
    margin: 15px 0 30px;
`;

// menu
const StyledNutrientFitMenu = styled.div`
    position: relative;
    margin-top: 20px;
    width: 100%;
    height: 127px;
    background: round;
    background-image: url(${MAKE_NUTRITION_IMAGE});
    background-color: #d0dbfc;
    border-radius: 10px;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    display: flex;
    align-items: center;
    cursor: pointer;
`;

const StyledMenuDescWrapper = styled.div`
    margin-left: 20%;
`;

const StyledInnerMenuDesc = styled.div`
    letter-spacing: -1.4px;
    color: #2b428e;
    font-size: 25px;
    font-weight: 600;
    letter-spacing: -1.25px;
`;

const StyledInnerMenuDescSmall = styled.div`
    font-size: 20px;
    font-weight: 400;
`;