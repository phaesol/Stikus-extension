import React from "react";
import styled from "styled-components";
import { ReactComponent as MyIcon } from "../../Images/Disease/h-intestine.svg";

const ImageCard = () => {
  const myList = ["MyIcon", "MyIcon"];
  return (
    <>
      <StyledMyIcon />
    </>
  );
};

export default ImageCard;

const StyledMyIcon = styled(MyIcon)`
  cursor: pointer;
  /* 여기는 주황배경 */
  /* .e .a {
    fill: #e16a49;
    stroke: #fff;
    stroke-width: 0.2;
  }
  g {
    .c,
    .d {
      fill: #fff;
      stroke: #fff;
      stroke-width: 0.1;
      font-weight: 200;
    }
  } */

  /* 아래는 파랑이 */
  .e .a {
    stroke: #2b428e;
    stroke-width: 2;
  }
  g {
    .c,
    .d {
      fill: #2b428e;
      stroke: #2b428e;
      stroke-width: 0.1;
      font-weight: 400;
    }
  }
`;
