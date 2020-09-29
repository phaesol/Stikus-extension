import React, { useState } from "react";
import styled, { css } from "styled-components";
import { ReactComponent as RollDown } from "../../Images/Basic/roll-down.svg";

const MaterialCard = ({ category, item }) => {
  const [toggle, changeToggle] = useState(false);
  console.log("넘어오는 아이템", category, item);
  const total_weight = item
    .map((ele) => ele.standard_amount)
    .reduce((acc, curval) => acc + curval, 0);
  console.log("총 용량은 얼마냐", total_weight);
  // @TODO 이 페이지에서 standard_amount 부분이랑 recommend_amount부분 구분해서 설정
  if (category !== "추가급여" && item.length !== 0)
    if (toggle)
      return (
        <>
          <StyledMaterialCard onClick={() => changeToggle(!toggle)}>
            <div>
              <StyledMaterialCardImg
                src={require(`../../Images/NutrientFit/${category}.png`)}
              />

              <StyledMaterialCardInfo>
                <div>
                  <b>{category}</b> │ {item.length}개 ( {total_weight}g )
                </div>
                <div>
                  {item[0].nutrient}
                  {item.length - 1 === 0 ? "" : ` 외 ${item.length - 1}가지`}
                </div>
              </StyledMaterialCardInfo>
            </div>
            <div>
              <StyledRollDown open={toggle} />
            </div>
          </StyledMaterialCard>
          <StyledMaterialListInfo open={item.length * 65 + 50}>
            <p>
              ※ <b>각 원료를 클릭</b>하면 상세정보 확인 과 목록삭제가
              가능합니다.
            </p>
            {item.map((ele) => (
              <StyledMaterialListItem key={ele.nutrient}>
                <span>
                  {ele.nutrient} {1}개 ({ele.standard_amount}
                  g)
                </span>
                <span>{ele.price}원</span>
              </StyledMaterialListItem>
            ))}
          </StyledMaterialListInfo>
        </>
      );
    else
      return (
        <>
          <StyledMaterialCard onClick={() => changeToggle(!toggle)}>
            <div>
              <StyledMaterialCardImg
                src={require(`../../Images/NutrientFit/${category}.png`)}
              />

              <StyledMaterialCardInfo>
                <div>
                  <b>{category}</b> │ {item.length}개 ( {total_weight}g )
                </div>
                <div>
                  {item[0].nutrient}
                  {item.length - 1 === 0 ? "" : ` 외 ${item.length - 1}가지`}
                </div>
              </StyledMaterialCardInfo>
            </div>
            <div>
              <StyledRollDown open={toggle} />
            </div>
          </StyledMaterialCard>
          <StyledMaterialListInfo></StyledMaterialListInfo>
        </>
      );
  else return false;
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

const StyledMaterialCardImg = styled.img`
  border-radius: 50%;
  width: 70px;
  height: 70px;
  margin-right: 15px;
`;

const StyledMaterialCardInfo = styled.div`
  b {
    text-align: left;
    font-size: 18px;
    letter-spacing: 0px;
    color: #333333;
  }
  div + div {
    margin-top: 5px;
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

const StyledRollDown = styled(RollDown)`
  transition: all 0.3s ease-out;

  ${(props) =>
    props.open &&
    css`
      transition: all 0.3s ease-out;
      transform: rotate(180deg);
    `}
`;
