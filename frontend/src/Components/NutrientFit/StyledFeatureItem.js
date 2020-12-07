import React, { useState } from "react";
import styled, { css } from "styled-components";

const StyledFeatureItem = ({ setPredictModal, item }) => {
  // 이름 7글자 기준
  console.log("피쳐 아이템의 퍼블리싱", item);
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(false);

  let takeLen = 0;
  if (item !== null && item !== undefined) {
    Object.keys(item).map((cate) =>
      Object.keys(item[cate]).map((mat) => takeLen++)
    );
  }
  return (
    <>
      <header>
        <span>원료별 특징</span>
        <b onClick={() => setPredictModal(true)}>배합시 예상치 보기</b>
      </header>

      <StyledFeatureCard>
        <StyledDynamicCard1 toggle1={toggle1}>
          {item !== null && item !== undefined
            ? Object.keys(item).map((cate) => {
                if (cate !== "추가급여") {
                  console.log("왜 안드냐 이거");
                  return Object.keys(item[cate]).map((mat) => (
                    <div>
                      <span>
                        {item[cate][mat].kor_name.length > 6
                          ? item[cate][mat].kor_name.substring(0, 6) + ".."
                          : item[cate][mat].kor_name}
                      </span>
                      <span>{item[cate][mat].summary}</span>
                    </div>
                  ));
                }
              })
            : null}
        </StyledDynamicCard1>
        <div
          onClick={() => {
            console.log("tetetetetetetet");
            setToggle1(!toggle1);
          }}
        >
          더보기{" "}
        </div>
      </StyledFeatureCard>

      <header>
        <span>Active Ingredients</span>
        <span>(하루 2스푼 기준)</span>
      </header>
      <StyledFeatureCard>
        <StyledDynamicCard2 toggle2={toggle2} setheight={33.2 * takeLen}>
          {item !== null && item !== undefined
            ? Object.keys(item).map((cate) => {
                if (cate !== "추가급여") {
                  return Object.keys(item[cate]).map((mat) => (
                    <div>
                      <span>
                        {" "}
                        {/* {item[cate][mat].name.length > 6
                          ? item[cate][mat].name.substring(0, 6) + ".."
                          : item[cate][mat].name} */}
                        {item[cate][mat].kor_name}
                      </span>
                      <p>
                        {parseInt(item[cate][mat].recommend_amount * 10) / 10}mg
                      </p>
                    </div>
                  ));
                }
              })
            : null}
        </StyledDynamicCard2>
        <div onClick={() => setToggle2(!toggle2)}>더보기 </div>
      </StyledFeatureCard>
    </>
  );
};

export default StyledFeatureItem;
const StyledDynamicCard1 = styled.section`
  max-height: ${(props) => (props.toggle1 ? props.setheight + "px" : "99.6px")};
  transition: 0.3s ease-out all;

  overflow: hidden;
`;
const StyledDynamicCard2 = styled.section`
  max-height: ${(props) => (props.toggle2 ? props.setheight + "px" : "99.6px")};
  transition: 0.3s ease-out all;

  overflow: hidden;
`;

const StyledFeatureCard = styled.div`
  width: 100%;
  height: auto;
  margin-top: 15px;
  padding: 15px;
  box-sizing: border-box;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 10px;
  opacity: 1;
  transition: 0.3s ease-out all;
  & > section > div {
    display: flex;
    margin-top: 10px;

    span:nth-child(1) {
      color: #a5a4a4;
      margin-right: 15px;
      display: inline-block;
      min-width: 88px;
    }
    p {
      margin: 0;
      flex: 1;
      text-align: right;
    }
  }

  & > div:last-child {
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
