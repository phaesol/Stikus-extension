import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import ImageCard from "../../Components/NutrientFit/ImageCard";
import { useState } from "react";
import MaterialCard from "../../Components/NutrientFit/MaterialCard";
import StyledNextButton from "../../Components/button/StyledNextButton";
import Loading from "../../Components/Useful/Loading";
import axios from "axios";
import NutrientPreviewModal from "../../Components/NutrientFit/NutrientPreviewModal/NutrientPreviewModal";
const SurveyResult = ({
  setData,
  materialList,
  mySurveyList,
  petName,
  choosecards,
  petWeight,
  petAge,
  remove_duplicate_material,
}) => {
  // @TOGO: 배합용파우더를 materialList저장할때 바로 해줘버리면 우리가 추후에 계산할 일도 없고,
  // 가격을 책정할때도 편리하다
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const total_price = Object.keys(materialList)
    .map((item) =>
      materialList[item]
        .map((ele) => ele.price)
        .reduce((acc, curval) => acc + curval, 0)
    )
    .reduce((acc, curval) => acc + curval, 0);
  const total_weight = Object.keys(materialList)
    .map((item) =>
      materialList[item]
        .filter((el) => el.category !== "추가급여")
        .map((ele) => ele.standard_amount)
        .reduce((acc, curval) => acc + curval, 0)
    )
    .reduce((acc, curval) => acc + curval, 0);

  const [modalVisible, setmodalVisible] = useState(false);
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      let choose_survey_pk = [];
      mySurveyList.map((item) =>
        item.question.map((q) => {
          if (q.state === true) {
            choose_survey_pk.push(q.survey_question_pk);
          }
        })
      );

      try {
        const _res = await axios.post("http://127.0.0.1:8000/survey-nutrient", {
          selected_question_pk_list: choose_survey_pk,
        });
        setData(_res.data);
      } catch (e) {
        setError(e);
      }
      setTimeout(setLoading(false), 2000);
    };
    loadData();
    return setLoading(true); //여기서 cleanup 함수로 setLoading을 안넣어주면
    // Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
    // 위의 에러 발생
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <StyledSurveyResultWrapper>
      <StyledSurveyResultBackground modalVisible={modalVisible} />
      <StyledResultWrapper>
        <div>{petName}님의 설문결과 입니다.</div>
        <span>
          나이 : {petAge}개월 | 체중 : {petWeight} kg
        </span>
        <StyledResultCardWrapper>
          {choosecards
            .filter((ele) => ele.choice === true)
            .map((item) => (
              <ImageCard key={item.name} item={item} />
            ))}
        </StyledResultCardWrapper>
      </StyledResultWrapper>
      <StyledMaterialWrapper>
        <header>
          <span>설문기반의 추천된 원료에요!</span>
          <button onClick={() => setmodalVisible(!modalVisible)}>
            이미지로 보기
          </button>
        </header>
        {Object.keys(remove_duplicate_material).map((item) => (
          <MaterialCard
            key={item}
            category={item}
            item={remove_duplicate_material[item]}
          />
        ))}
        <MaterialCard
          key={"배합용 파우더"}
          category={"배합용 파우더"}
          item={{
            배합용파우더: {
              category: "배합용 파우더",
              id: 999,
              nutrient: "배합용 파우더",
              price: 2800,
              recommend_amount: 0,
              related_question: "",
              cnt: 1,
              score: "0",
              standard_amount: 60 - total_weight,
            },
          }}
        />
        <StyledResultCost>
          <span>금액 총합</span>
          <span>{total_price + 2800}원</span>
        </StyledResultCost>
      </StyledMaterialWrapper>
      <StyledNextButton path={"/goodness-of-fit"}>
        완료간 적합도 측정하기
      </StyledNextButton>
      <NutrientPreviewModal
        modalVisible={modalVisible}
        closeModal={setmodalVisible}
        materialList={remove_duplicate_material}
        basepowder={[
          {
            category: "배합용파우더",
            id: 999,
            nutrient: "배합용 파우더",
            price: 2800,
            recommend_amount: 0,
            related_question: "",
            score: "0",
            standard_amount: 60 - total_weight,
          },
        ]}
      />
    </StyledSurveyResultWrapper>
  );
};

export default SurveyResult;

const StyledSurveyResultWrapper = styled.div`
  position: relative;
`;

const StyledSurveyResultBackground = styled.div`
  ${(props) =>
    props.modalVisible &&
    css`
      position: absolute;
      left: -15px;
      top: -30px;
      width: calc(100% + 30px);
      height: calc(100% + 30px);
      background-color: #080808;
      opacity: 0.4;
    `}
`;

const StyledResultWrapper = styled.div`
  margin-top: 30px;
  div {
    font-size: 20px;
    font-weight: bold;
  }
  span {
    display: block;
    margin-top: 10px;
    letter-spacing: -0.75px;
    color: #333333;
    font-weight: 300;
  }
`;

const StyledResultCardWrapper = styled.div`
  margin-top: 20px;
  padding: 0;
  img {
    width: 22.5%;
  }
`;

const StyledMaterialWrapper = styled.div`
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
    span {
      font-size: 20px;
      font-weight: bold;
    }
    button {
      background: #e16a49 0% 0% no-repeat padding-box;
      border: 1px solid #e16a49;
      border-radius: 5px;
      opacity: 1;
      padding: 6px 8px;
      letter-spacing: -0.75px;
      color: #ffffff;
      cursor: pointer;
    }
  }
`;

const StyledResultCost = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 25px;
  margin-bottom: 25px;
  text-align: left;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: -1px;
  color: #333333;
  opacity: 1;
  span:nth-child(2) {
    color: #e16a49;
  }
`;
