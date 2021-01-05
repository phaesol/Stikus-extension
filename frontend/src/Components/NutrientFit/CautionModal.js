import React from "react";
import styled from "styled-components";


function CautionModal ({ onClick }) {
    return (
        <StyledModalContainer>
            <div>동물의 <b>나이 기반 질병 발생 통계데이터</b>를<br />
            기반으로 하였으며, <br />
            기입한 6가지의 항목<br />
            (나이, 체형, 몸무게, 활동량, 품종,<br />
            성별, 중성화 여부)을 추가로 사용하였음</div>
            <br /><br />
            <StyledModalConfirm onClick={onClick}>확인</StyledModalConfirm>
        </StyledModalContainer>
    )
}

export default CautionModal;


const StyledModalContainer = styled.div`
    width: 90%;
    max-width: 375px;
    height: 260px;
    padding: 15px 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 10px;
    position: fixed;
    z-index: 999;
    background: #fff;
    cursor: default;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    
    div {
        min-width: 286px;
        /* padding: 50px; */
        /* flex: 5; */
        text-align: center;
        font-size: 18px;
        letter-spacing: -0.9px;
        color: #333333;
        /* margin-bottom: 47px; */
        @media(max-width: 375px) {
            font-size: 16px;
        }

        b{  
            color: #E16A49;
        }
    }
`;


const StyledModalConfirm = styled.div`
    /* flex: 1; */
    width: calc(100% - 20px);
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #2B428E;
    border-radius: 5px;
    cursor: pointer;
    font-size: 18px;
    letter-spacing: -0.9px;
    color: #2B428E;
    position: absolute;
    bottom: 15px;
`;