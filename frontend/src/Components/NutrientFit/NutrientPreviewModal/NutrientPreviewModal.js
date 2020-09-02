import React, { useState, useEffect } from 'react';
import BOTTLE_IMG from '../../../Images/NutrientFit/preview-bottle.png';
import styled from 'styled-components';
import NutrientList from './NutrientList';


// 최대 15개
let tempData = [
    {
        name: "아놀린/치커리추출",
        amount: 3,
        price: 3000,
        type: '기능성원료',
        color: '#FC6E51'
    },
    {
        name: "아놀린/치커리추출",
        amount: 3,
        price: 3000,
        type: '기능성원료',
        color: '#FC6E51'
    },
    {
        name: "아놀린/치커리추출",
        amount: 3,
        price: 3000,
        type: '기능성원료',
        color: '#FC6E51'
    },
    {
        name: "아놀린/치커리추출",
        amount: 3,
        price: 3000,
        type: '기능성원료',
        color: '#FC6E51'
    },
    {
        name: "아놀린/치커리추출",
        amount: 3,
        price: 3000,
        type: '기능성원료',
        color: '#FC6E51'
    },
    {
        name: "아놀린/치커리추출",
        amount: 3,
        price: 3000,
        type: '기능성원료',
        color: '#FC6E51'
    },
    {
        name: "아놀린/치커리추출",
        amount: 3,
        price: 3000,
        type: '기능성원료',
        color: '#FC6E51'
    },
    {
        name: "아놀린/치커리추출",
        amount: 3,
        price: 3000,
        type: '기능성원료',
        color: '#FC6E51'
    },
    {
        name: "아놀린/치커리추출",
        amount: 3,
        price: 3000,
        type: '기능성원료',
        color: '#FC6E51'
    },
    {
        name: "아놀린/치커리추출",
        amount: 3,
        price: 3000,
        type: '기능성원료',
        color: '#FC6E51'
    },
    {
        name: "브로멜라닌",
        amount: 2,
        price: 4000,
        type: '기능성원료',
        color: '#FC6E51'
    },
    {
        name: "루테인",
        amount: 5,
        price: 3000,
        type: '비타민',
        color: '#8CC152'
    },
    {
        name: "파인애플",
        amount: 4,
        price: 3000,
        type: '미네랄',
        color: '#5D9CEC'
    },
    {
        name: "비타민A",
        amount: 3,
        price: 3000,
        type: '비타민',
        color: '#8CC152'
    },
    {
        name: "부영제",
        amount: 40,
        price: 0,
        type: '배합용파우더',
        color: '#FCBB42'
    }
]


function NutrientPreviewModal () {
    const [modalVisible, setModalVisible] = useState(true);
    const showPreview = () => {
        setModalVisible(true)
    }

    const closePreview = () => {
        setModalVisible(false)
    }

    useEffect(() => {
        if (!modalVisible) {
            return
        } else {
            console.log("활짜악")
        }
    }, [modalVisible])


    console.log(tempData)

    return (
        <>
            <button onClick={showPreview}>한눈에 보기</button>
            {
                modalVisible && <>
                    <StyledModalBackGround></StyledModalBackGround>
                    <StyledModalContainer>
                        <StyledModalInnerContainer>
                            <StyledModalWrapper>
                                <StyledItemWrapper>
                                    {tempData && tempData.map((item) => 
                                        <NutrientList item={item} />
                                    )}
                                </StyledItemWrapper>
                            </StyledModalWrapper>
                           
                            <StyledFlexDiv1>
                                <StyledColorLabel color="#FCBB42"></StyledColorLabel>
                                    <StyledColorDesc>배합용파우더</StyledColorDesc>
                                <StyledColorLabel color="#FC6E51"></StyledColorLabel>
                                    <StyledColorDesc>기능성원료</StyledColorDesc>
                                <StyledColorLabel color="#8cc152"></StyledColorLabel>
                                    <StyledColorDesc>비타민</StyledColorDesc>
                                <StyledColorLabel color="#5d9cec"></StyledColorLabel>
                                    <StyledColorDesc>미네랄</StyledColorDesc>
                            </StyledFlexDiv1>

                            <StyledFlexDiv2>
                                <StyledConfirmBtn onClick={closePreview}>확인</StyledConfirmBtn>
                            </StyledFlexDiv2>
                        </StyledModalInnerContainer>
                    </StyledModalContainer>
                </>
            }
            
        </>
    )
}

export default NutrientPreviewModal;

const StyledModalBackGround = styled.div`
    // width: 100vw;
    // height: 100vh;
    // background: #080808;
    // position: absolute;
    // top: 0;
    // left: 0;
    // opacity: 0.4;
    // iframe 때문에 background 회색되는걸 일단 빼야할 것 같음!
`;
const StyledModalContainer = styled.div`
    // border: 1px solid blue;
    box-sizing: border-box;
    position: absolute;
    max-width: 600px;
    padding: 0 12px;
    width: 100%;
    top: 0;
    left: 50%;
    transform: translate(-50%);
    min-height: 600px;
`;

const StyledModalInnerContainer = styled.div`
    box-sizing: border-box;
    border: 2px pink solid;
    border-radius: 10px;
`;

const StyledModalWrapper = styled.div`
    position: relative;
    max-width: 520px;
    // border: 1px solid green;
    width: 100%;
    height: 500px !important;
    background: url(${BOTTLE_IMG});
    background-repeat: round;
    z-index: 999;
    margin: 0 auto;
    margin-top: 25px;
`;


const StyledItemWrapper = styled.div`
    // padding: 0 8%;
    width: 80%;
    position: absolute;
    bottom: 24px;
    left: 50%;
    transform: translate(-50%);
`;




const StyledFlexDiv1 = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
`;

const StyledColorLabel = styled.div`
    display: inline-block;
    background: ${({color}) => color};
    width: 15px;
    height: 15px;
    border-radius: 3px;
`;


const StyledColorDesc = styled.span`
    font-size: 13px;
    letter-spacing: -0.65px;
    color: #333333;
    margin: 0 5px;

`;

const StyledFlexDiv2 = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StyledConfirmBtn = styled.button`
    height: 45px;
    width: 95%;
    background: #ffffff;
    border: 1px solid #2B428E;
    border-radius: 5px;
    opacity: 1;
    font-size: 18px;
    font-weight: normal;
    letter-spacing: -0.9px;
    color: #2B428E;
    cursor: pointer;
`;