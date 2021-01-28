import React, { useState, useEffect } from "react";
import styled from "styled-components";

// icon-kcal
// icon-fitness
// icon-water
// icon-breath
// icon-temperature
// icon-defecate


function ReferHealth () {


    return (    
        <>
        {/* <StyledCardWrapper>
            <img src={require("../../../Images/InfoFit/icon/icon-kcal.svg")} />
            <StyledInfo>
                칼로리
                <div><b>0</b>kcal</div>
            </StyledInfo>

        </StyledCardWrapper> */}
        <StyledCardWrapper>
            <img src={require("../../../Images/InfoFit/icon/icon-fitness.svg")} />
            <StyledInfo>
                운동시간
                <div><b>0</b>시간<b> 00</b>분</div>
            </StyledInfo>
        </StyledCardWrapper>
        <StyledCardWrapper>
            <img src={require("../../../Images/InfoFit/icon/icon-water.svg")} />
            <StyledInfo>
                음수량
                <div><b>0</b>ml</div>
            </StyledInfo>
        </StyledCardWrapper>
        <StyledCardWrapper>
            <img src={require("../../../Images/InfoFit/icon/icon-breath.svg")} />
            <StyledInfo>
                호흡수
                <div><b>0</b>분</div>
            </StyledInfo>
        </StyledCardWrapper>
        <StyledCardWrapper>
            <img src={require("../../../Images/InfoFit/icon/icon-temperature.svg")} />
            <StyledInfo>
                체온
                <div><b>0</b>℃</div>
            </StyledInfo>
        </StyledCardWrapper>
        <StyledCardWrapper>
            <img src={require("../../../Images/InfoFit/icon/icon-defecate.svg")} />
            <StyledInfo>
                배변·배뇨
                <div><b>0</b></div>
            </StyledInfo>
        </StyledCardWrapper>
        </>
    )
}

export default React.memo(ReferHealth);


const StyledCardWrapper = styled.div`
    -webkit-overflow-scrolling: touch !important;
    cursor: default !important;
    width: 105px;
    height: 105px;
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 10px;
    margin: 29px 14px 10px 1px;
    display: table;
    position: relative;


    img {    
        cursor: default !important;
        position: absolute;
        top: -37px;
        left: 18px;
        width: 60px;
        height: 60px;
    }


`;


const StyledInfo = styled.div`
    letter-spacing: -0.65px;
    color: #333333;
    font-size: 13px;
    font-family: "NotoSansKR";
    margin-top: 50px;
    text-align: center;    
    line-height: 22px;

    div { color: #A5A4A4; }

    b { 
        font-size: 22px;
        font-weight: bold;
        letter-spacing: -1.1px;
        color: #333333;
        margin-right: 3px;
    }
`;