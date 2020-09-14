import React from "react";
import styled, { css } from "styled-components";

const MaterialCard = ({ item, onClick }) => {
  console.log(item);
  const { type, amount, weight, components, toggle } = item;
  if (toggle)
    return (
      <>
        <StyledMaterialCard onClick={() => onClick(type)}>
          <div>
            <StyledMaterialCardImg>사진</StyledMaterialCardImg>

            <StyledMaterialCardInfo>
              <div>
                <b>{type}</b> │ {amount}개 ( {weight}g )
              </div>
              <div>
                {components[0].name}
                {components.length - 1 === 0
                  ? ""
                  : ` 외 ${components.length - 1}가지`}
              </div>
            </StyledMaterialCardInfo>
          </div>
          <div>ㅅ</div>
        </StyledMaterialCard>
        <StyledMaterialListInfo open={components.length * 65 + 50}>
          <p>
            ※ <b>각 원료를 클릭</b>하면 상세정보 확인 과 목록삭제가 가능합니다.
          </p>
          {components.map((item) => (
            <StyledMaterialListItem>
              <span>
                {item.name} {item.amount}개 ({item.weight}g)
              </span>
              <span>{item.cost}원</span>
            </StyledMaterialListItem>
          ))}
        </StyledMaterialListInfo>
      </>
    );
  else
    return (
      <>
        <StyledMaterialCard onClick={() => onClick(type)}>
          <div>
            <StyledMaterialCardImg>사진</StyledMaterialCardImg>

            <StyledMaterialCardInfo>
              <div>
                <b>{type}</b> │ {amount}개 ( {weight}g )
              </div>
              <div>
                {components[0].name}
                {components.length - 1 === 0
                  ? ""
                  : ` 외 ${components.length - 1}가지`}
              </div>
            </StyledMaterialCardInfo>
          </div>
          <div>ㅅ</div>
        </StyledMaterialCard>
        <StyledMaterialListInfo></StyledMaterialListInfo>
      </>
    );
};

export default MaterialCard;

const StyledMaterialCard = styled.div`
  width: 100%;
  height: 100px;
  background: #f2f2f2 0% 0% no-repeat padding-box;
  border-radius: 10px;
  opacity: 1;
  padding: 10px 15px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  & > div {
    display: flex;
    align-items: center;

    div {
      margin-right: 20px;
    }
  }
  margin-bottom: 15px;
`;
// const StyledMaterialCardHeader = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;

// `;

const StyledMaterialCardImg = styled.div`
  border-radius: 50%;
  border: 2px solid black;
  width: 70px;
  height: 70px;
`;

const StyledMaterialCardInfo = styled.div`
  b {
    text-align: left;
    font-size: 18px;
    letter-spacing: 0px;
    color: #333333;
  }
`;

const StyledMaterialListInfo = styled.div`
  height: 0px;
  transition: all 0.3s ease-out;

  ${(props) =>
    props.open &&
    css`
      transition: all 0.3s ease-out;
      height: ${props.open}px;
    `}
  p {
    text-align: left;
    font-size: 13px;
    letter-spacing: -0.65px;
    color: #a5a4a4;
    margin-bottom: 20px;
    b {
      color: #e16a49;
    }
  }
`;

const StyledMaterialListItem = styled.div`
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 5px;
  height: 45px;
  padding: 12px;
  opacity: 1;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;

  margin-bottom: 20px;
`;
