import React from "react";
import styled from "styled-components";

const StyledFeatureItem = ({ setPredictModal }) => {
  return (
    <>
      <header>
        <span>원료별 특징</span>
        <b onClick={() => setPredictModal(true)}>배합시 예상치 보기</b>
      </header>
      <StyledFeatureCard>
        <div>
          <span>글루코사민</span>
          <span>캐나다 로셀의 특허인증 원료</span>
        </div>
        <div>
          <span>코엔자임 큐텐</span>
          <span>심혈관 관리에 탁월</span>
        </div>
        <div>
          <span>유산균</span>
          <span>장관리에 특화된 유산균 11종</span>
        </div>
        <div>더보기 </div>
      </StyledFeatureCard>

      <header>
        <span>Active Ingredients</span>
        <span>(하루 2스푼 기준)</span>
      </header>
      <StyledFeatureCard>
        <div>
          <span>글루코사민</span>
          <span>33.3mg</span>
        </div>
        <div>
          <span>코엔자임 큐텐</span>
          <span>15mg</span>
        </div>
        <div>
          <span>유산균</span>
          <span>10mg</span>
        </div>
        <div>더보기 </div>
      </StyledFeatureCard>
    </>
  );
};

export default StyledFeatureItem;

const StyledFeatureCard = styled.div`
  width: 100%;
  height: 160px;
  margin-top: 15px;
  padding: 15px;
  box-sizing: border-box;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 10px;
  opacity: 1;

  & > div {
    display: flex;
    justify-content: space-between;
    span:nth-child(1) {
      color: #a5a4a4;
    }
  }
  & > div + div {
    margin-top: 10px;
  }

  & > div:nth-child(4) {
    margin-top: 25px;
    display: block;
    text-align: center;

    font-size: 15px;
    font-weight: bold;
    letter-spacing: -0.75px;
    color: #2b428e;
    opacity: 1;
    cursor: pointer;
  }
`;
