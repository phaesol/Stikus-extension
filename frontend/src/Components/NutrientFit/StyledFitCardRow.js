import React from "react";
import styled from "styled-components";

import StyledFitCardCompo from "./StyledFitCardCompo";

const StyledFitCardRow = ({ title, material }) => {
  console.log(material);
  // const { type, components } = material;
  return (
    title !== "추가급여" && (
      <StyledFitCardWrapper>
        <StyledFitCardLabel>{title}</StyledFitCardLabel>
        <CardList>
          {material.map((item) => (
            <StyledFitCardCompo key={item.id} item={item} />
          ))}
        </CardList>
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
    height: 5px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background-color: #f2f2f2;
    border-radius: 10px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background-color: #e16a49;
    border-radius: 5px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background-color: #ba563a;
  }
`;
