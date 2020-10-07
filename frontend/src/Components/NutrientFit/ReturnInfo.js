import React from "react";
import styled from "styled-components";

const ReturnInfo = () => {
  return (
    <StyledReturnInfo>
      <div>교환 / 반품 안내</div>
      <div>
        <span>교환 및 반품이 가능한 경우</span>
        <span>
          1. 구매자 단순 변심은 상품 수령 후 7일 이내
          <br /> {"\u00A0\u00A0\u00A0"}(구매자 반품배송비 부담)
        </span>
        <span>
          2. 표시/광고와 상이, 상품 하자의 경우 상품 수령 후 3개월 이내, 그
          사실을 안 날로부터 30일 이내 (판매자 반품배송비 부담)
        </span>
        <span>3. 제품 교환은 포장을 훼손하지 않아야 가능</span>
        <span>
          ※ 구매자의 단순 변심으로 교환/반품을 하실 경우 상품 반송 비용은
          구매자가 부담해야 합니다.
        </span>
        <span>
          ※ 교환이나 반품 의사를 밝히지 않고 일방적으로 반품을 보내실 경우
          교환/반품이 제대로 처리되지 않을 수 있습니다.
        </span>
      </div>
      <div>
        <span>교환 및 반품이 불가능한 경우</span>
        <span>1. 교환 및 반품 요청 기간이 지난 경우</span>
        <span>
          2. 구매자의 책임 있는 사유로 상품 등이 멸실 또는 훼손된 경우
        </span>
        <span>3. 제품의 포장이 훼손되어 상품 가치가 현저히 훼손된 경우 </span>
        <span>
          4. 구매자의 사용 또는 일부 소비에 의해 상품 가치가 현저히 감소한 경우
        </span>
        <span>
          5. 시간의 경과에 의하여 재판매가 곤란할 정도로 상품 등의 가치가 현저히
          감소한 경우
        </span>
        <span>6. 복제가 가능한 상품 등의 포장을 훼손한 경우</span>
      </div>
    </StyledReturnInfo>
  );
};

export default ReturnInfo;

const StyledReturnInfo = styled.div`
  margin-top: 15px;
  padding: 15px;
  box-sizing: border-box;
  div:nth-child(1) {
    font-weight: bold;
    font-size: 15px;
    letter-spacing: -0.75px;
    color: #333333;
    opacity: 1;
  }
  div {
    margin-top: 20px;
  }
  div > span {
    display: block;
    font-size: 13px;
  }
  div > span + span {
    margin-top: 5px;
  }
  div:nth-child(2) span:nth-child(1) {
    color: #2b428e;
    font-weight: bold;
  }
  div:nth-child(3) span:nth-child(1) {
    color: #e16a49;
    font-weight: bold;
  }
`;
