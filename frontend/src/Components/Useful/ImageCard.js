import React from "react";
import styled from "styled-components";

const ImageCard = ({ item, onToggle }) => {
  // function callMyName() {
  //   console.log(name);
  // }

  const { id, name } = item;
  return (
    <>
      <img
        onClick={() => onToggle(id)}
        src={require(`../../Images/Disease/${name}.png`)}
      />
    </>
  );
};

// 1. image를 세개 쓸경우
// state의 변화값에 따라서 우리는 해당 img component를 재 랜더링 해줘야한다.
// 2. 만약 image가 아닌 svg를 쓰게될 경우 svg는 props의변경사항에 따라서 다른 class를 적용하게 되고 그 다른 class에는 다른 모양의 양식이 들어가있겠지만 결국에는 이것도 component를 재 랜더링 해주는 일일것 같다

export default ImageCard;

// const StyledMyIcon = styled(MyIcon)`
//   cursor: pointer;
//   /* 여기는 주황배경 */
//   /* .e .a {
//     fill: #e16a49;
//     stroke: #fff;
//     stroke-width: 0.2;
//   }
//   g {
//     .c,
//     .d {
//       fill: #fff;
//       stroke: #fff;
//       stroke-width: 0.1;
//       font-weight: 200;
//     }
//   } */

//   /* 아래는 파랑이 */
//   .e .a {
//     stroke: #2b428e;
//     stroke-width: 2;
//   }
//   g {
//     .c,
//     .d {
//       fill: #2b428e;
//       stroke: #2b428e;
//       stroke-width: 0.1;
//       font-weight: 400;
//     }
//   }
// `;
