import React, { useState } from "react";
import styled from "styled-components";
import style from "../../../node_modules/dom-helpers/cjs/css";


function InputInfo() {
    const initialState = {
        petName: "",
        age1: "0",
        age2: "0",
        weight1: "0",
        weight2: "0",
        }
    const [status, setStatus] = useState(initialState)
    const { age1, age2, weight1, weight2 } = status;
   
    const handleStatus = (event) => {
        // 여러 input요소들을 저장하는 공간입니다! // 페이지의 모든 요소에 다 의존적이기 때문에 useCallback 사용하지 않겠음.
        const { name } = event.target;
        const { value } = event.target;
        setStatus({
          ...status,
          [name]: value
        })
      }
      
    return (
        <StyledModalContainer>
        <StyledMainInfo>반려동물의 나이를 입력해주세요</StyledMainInfo>
        <StyledSelectBetweenWrapper>
            <StyledSelectInput onChange={handleStatus} name="age1" id="input-age1" value={age1}>
                {[...Array(31).keys()].map(i=> <option key={i} value={i}>{i} 년</option>)}
            </StyledSelectInput>
            <StyledSelectInput onChange={handleStatus} name="age2" id="input-age2" value={age2}>
                {[...Array(12).keys()].map(i=> <option key={i} value={i}>{i} 개월</option>)}
            </StyledSelectInput>
        </StyledSelectBetweenWrapper>

        <StyledMainInfo>반려동물의 체중을 입력해주세요</StyledMainInfo>
        <StyledSelectBetweenWrapper>
            <StyledSelectInput onChange={handleStatus} name="weight1" id="input-weight1" value={weight1}>
                {[...Array(51).keys()].map(i=> <option key={i} value={i}>{i}</option>)}
            </StyledSelectInput>
            <StyledSelectInput onChange={handleStatus} name="weight2" id="input-weight2" value={weight2}>
                {[...Array(10).keys()].map(i=> <option key={i} value={i}>.{i} kg</option>)}
            </StyledSelectInput>
        </StyledSelectBetweenWrapper>

        <StyledBtnGrid>
            <StyledNoBtn>취소</StyledNoBtn>
            <StyledConfirmBtn>등록하기</StyledConfirmBtn>
        </StyledBtnGrid>
        </StyledModalContainer>
    )
}

export default InputInfo;


const StyledModalContainer = styled.div`
    position: fixed;
    padding: 12px;
    width: 320px;
    height: 292px;
    background: #ffffff;
    top: 0;
    left: 50%;
    transform: translate(-50%);
    z-index: 100;
    border-radius: 10px;

`;


const StyledMainInfo = styled.div`
  font-size: 18px;
  font-weight: normal;
  color: #080808;
  letter-spacing: -0.9px;
`;


const StyledSelectBetweenWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;

const StyledSelectInput = styled.select`
    border: solid 1px #a5a4a4;
    box-sizing: border-box;
    border-radius: 5px;
    padding: 10px;
    font-size: 17px;
    width: 49%;
    background: white;
`;

const StyledBtnGrid = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

const StyledNoBtn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 18px;
    letter-spacing: -0.9px;
    color: #333333;

    width: 30%;
    height: 45px;
    background: #F2F2F2 0% 0% no-repeat padding-box;
    border-radius: 5px;
`;
const StyledConfirmBtn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 18px;
    letter-spacing: -0.9px;
    color: #FFFFFF;



    width: 65%;
    height: 45px;
    background: #E16A49 0% 0% no-repeat padding-box;
    border-radius: 5px;
`;


