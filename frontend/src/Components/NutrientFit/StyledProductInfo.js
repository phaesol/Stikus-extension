import React from "react";
import styled from "styled-components";

const StyledProductInfo = () => {
  return (
    <StyledProductWrapper>
      <div>이미지자리</div>
      <div>
        <div>
          <span>사이즈</span>
          <span>지름 5.5cm, 높이 10.1cm의 원형</span>
        </div>
        <div>
          <span>무게</span>
          <span>60g</span>
        </div>
        <div>
          <span>급여가능연령</span>
          <span>생 후 3개월 이후부터</span>
        </div>
        <div>
          <span>제조일자</span>
          <span>유통기한으로부터 24개월 전</span>
        </div>
        <div>
          <span>유통기한</span>
          <span>별도표기</span>
        </div>
      </div>
    </StyledProductWrapper>
  );
};

export default StyledProductInfo;

const StyledProductWrapper = styled.div`
  margin-top: 15px;
  padding: 15px;
  box-sizing: border-box;
  height: 340px;
  width: 100%;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 10px;
  opacity: 1;

  & > div:nth-child(1) {
    height: 135px;
    border: 1px solid black;
  }
  & > div:nth-child(2) {
    margin-top: 25px;
  }
  & > div:nth-child(2) div {
    display: flex;
    justify-content: space-between;
  }
  & > div:nth-child(2) div + div {
    margin-top: 10px;
  }

  & > div:nth-child(2) div span {
    font-size: 15px;
    letter-spacing: -0.75px;
    color: #333333;
    font-weight: 600;
  }
  & > div:nth-child(2) div span:nth-child(1) {
    color: #a5a4a4;
  }
`;
