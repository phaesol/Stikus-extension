import React, { useEffect, useState } from "react";
import styled from "styled-components";

import StyledFitCardCompo from "./StyledFitCardCompo";

const StyledFitCardRow = ({
  title,
  material,
  caution_nutrient,
  caution,
  weight,
}) => {
  // if (caution_nutrient.some((item) => item in material)) {
  //   console.log("hello");
  //   setCaution(true);
  // }
  console.log(caution, "코우션");
  return (
    title !== "추가급여" && (
      <StyledFitCardWrapper>
        {caution ? (
          <>
            <StyledCautionFitCardLabel>
              {title} <span>※ 추천하지 않는 원료가 포함되어있습니다.</span>
            </StyledCautionFitCardLabel>

            <CardList>
              {Object.keys(material).map((item) => {
                console.log(
                  item,
                  caution_nutrient,
                  "이조합이란 마치",
                  caution_nutrient.includes(item)
                );
                if (caution_nutrient.includes(item)) {
                  return (
                    <StyledFitCardCompo
                      weight={weight}
                      key={material[item].id}
                      item={material[item]}
                      caution={true}
                    />
                  );
                } else {
                  return (
                    <StyledFitCardCompo
                      weight={weight}
                      key={material[item].id}
                      item={material[item]}
                    />
                  );
                }
              })}
            </CardList>
          </>
        ) : (
          <>
            <StyledFitCardLabel>{title}</StyledFitCardLabel>

            <CardList>
              {Object.keys(material).map((item) => (
                <StyledFitCardCompo
                  weight={weight}
                  key={material[item].id}
                  item={material[item]}
                />
              ))}
            </CardList>
          </>
        )}
      </StyledFitCardWrapper>
    )
  );
};

export default StyledFitCardRow;

const StyledFitCardWrapper = styled.div`
  & + & {
    margin-top: 20px;
  }
`;

const StyledCautionFitCardLabel = styled.div`
  text-align: left;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: -0.9px;
  color: #333333;
  opacity: 1;
  margin-bottom: 5px;

  & > span {
    font-size: 15px;
    color: #e16a49;
  }
`;

const StyledFitCardLabel = styled.div`
  text-align: left;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: -0.9px;
  color: #333333;
  opacity: 1;
  margin-bottom: 5px;
`;
const CardList = styled.div`
  overflow-x: auto;
  white-space: nowrap;
  padding-bottom: 10px;
  ::-webkit-scrollbar {
    height: 8px;
    cursor: pointer;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background-color: #f2f2f2;
    border-radius: 10px;
    cursor: pointer;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background-color: #e16a49;
    border-radius: 5px;
    cursor: pointer;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background-color: #ba563a;

    cursor: pointer;
  }
`;
