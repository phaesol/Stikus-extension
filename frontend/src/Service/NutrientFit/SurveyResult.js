import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import ImageCard from "../../Components/NutrientFit/ImageCard";
import { useState } from "react";
import MaterialCard from "../../Components/NutrientFit/MaterialCard";
import StyledNextButton from "../../Components/button/StyledNextButton";
import Loading from "../../Components/Useful/Loading";
import axios from "axios";
import NutrientPreviewModal from "../../Components/NutrientFit/NutrientPreviewModal/NutrientPreviewModal";
import MaterialDetailPage from "./MaterialDetailPage";
import ExpertData from "../../Components/NutrientFit/ExpertData";
import MAIN_TOP_BG from "../../Images/NutrientFit/common/main-top-bg.svg";
import { BACKEND } from "../../config";
import { withRouter } from "react-router-dom";

const SurveyResult = ({
  setData,
  materialList,
  mySurveyList,
  petName,
  choosecards,
  petWeight,
  petAge,
  remove_duplicate_material,
  finalOrderRemove,
  healthReport,

  location,
  match,
  history,
  setFlag,
}) => {
  // @TOGO: 배합용파우더를 materialList저장할때 바로 해줘버리면 우리가 추후에 계산할 일도 없고,
  // 가격을 책정할때도 편리하다
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [detailVisible, setDetailVisible] = useState(false);
  const [detailMaterial, setDetailMaterial] = useState("");
  // const [total_cost_state, setTotalCost] = useState(0)
  const [expertAnalysis, setExpertAnalysis] = useState("");
  const [year, month] = [parseInt(petAge / 12), parseInt(petAge % 2)];
  setFlag("recom");
  let total_cost = 0;
  const multi_weight = () => {
    if (parseInt(petWeight) >= 5) {
      return 2;
    } else {
      return 1;
    }
  };
  try {
    Object.keys(remove_duplicate_material)
      .map((item) =>
        Object.keys(remove_duplicate_material[item]).map((mat) => {
          if (remove_duplicate_material[item][mat].category !== "추가급여") {
            total_cost =
              total_cost +
              remove_duplicate_material[item][mat].price * multi_weight();
            console.log(
              remove_duplicate_material[item][mat].price,
              "더해지는것 확인",
              total_cost
            );
          }
        })
      )
      .reduce((acc, curval) => acc + curval, 0);
  } catch {}
  let total_weight = 0;
  try {
    Object.keys(remove_duplicate_material).map((item) =>
      Object.keys(remove_duplicate_material[item]).map((mat) => {
        if (remove_duplicate_material[item][mat].category !== "추가급여") {
          total_weight =
            total_weight +
            remove_duplicate_material[item][mat].standard_amount *
              multi_weight();
        }
      })
    );
  } catch {}

  // console.log(total_weight, "ㅃㅃㅃㅃㅃㅃㅃㅃ");

  const [modalVisible, setmodalVisible] = useState(false);
  useEffect(() => {
    const loadData = async () => {
      // setTimeout(() => {
      // setLoading(true);
      // }, [1000])
      let choose_survey_pk = [];
      try {
        mySurveyList.map((item) =>
          item.question.map((q) => {
            if (q.state === true) {
              choose_survey_pk.push(q.survey_question_pk);
            }
          })
        );
      } catch {}

      try {
        const _res = await axios.post(`${BACKEND}/survey-nutrient`, {
          selected_question_pk_list: choose_survey_pk,
        });
        // 요청 URL
        setData(multi_weight(), _res.data);
        // console.log("받아오는 데이터는 ::::::::::::::::", _res.data);
      } catch (e) {
        setError(e);
      }
      setTimeout(() => {
        setLoading(false);
      }, 1350);
    };

    loadData();
    return setLoading(true); //여기서 cleanup 함수로 setLoading을 안넣어주면
    // Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
    // 위의 에러 발생
  }, []);

  useEffect(() => {
    if (petAge > 120) {
      setExpertAnalysis(ExpertData.age6);
      return;
    } else if (petAge > 84) {
      setExpertAnalysis(ExpertData.age5);
      return;
    } else if (petAge > 60) {
      setExpertAnalysis(ExpertData.age4);
      return;
    } else if (petAge > 24) {
      setExpertAnalysis(ExpertData.age3);
      return;
    } else if (petAge > 12) {
      setExpertAnalysis(ExpertData.age2);
      return;
    } else if (petAge > 6) {
      setExpertAnalysis(ExpertData.age1);
      return;
    } else {
      setExpertAnalysis(ExpertData.age0);
      return;
    }
  }, []);

  if (!detailVisible) {
    return loading ? (
      <Loading />
    ) : (
      <>
        <StyledBackGround></StyledBackGround>
        <StyledSurveyResultWrapper>
          <StyledSurveyResultBackground modalVisible={modalVisible} />
          <StyledResultWrapper>
            <div>{petName}의 추천 영양제</div>
            <span>
              {petName}가 추천 받은 건강항목과 도움을 주는 원료입니다.
            </span>
            <StyledResultCardWrapper>
              <span>영양제 최종 관리 항목입니다</span>
              <div>
                {choosecards
                  .filter((ele) => ele.choice === true)
                  .map((item) => (
                    <ImageCard linecard={true} key={item.name} item={item} />
                  ))}
              </div>
            </StyledResultCardWrapper>
          </StyledResultWrapper>
          <StyledResultReport>
            {petName}의 <span>영양리포트</span>
            <p>
              ※ 설문 기반의 <span>질환 분류와 추천 원료</span>입니다.
            </p>
            <StyledReportContent>
              {healthReport !== null &&
                healthReport !== undefined &&
                Object.keys(healthReport).map((health) => (
                  <>
                    <header>{health}</header>
                    {healthReport[health][2]}
                    <p>
                      <span>
                        <b>추천원료 : </b>
                        {healthReport[health][0].toString()}
                      </span>
                      <span>
                        <b>함께 먹으면 좋아요 : </b>
                        {healthReport[health][1].toString()}
                      </span>
                    </p>
                  </>
                ))}
            </StyledReportContent>
            <StyledExpert>
              <header>전문가 분석</header>
              <span>
                ※ 반려동물의 나이와 체중에 따라 <b>수의사가 분석</b>한
                내용입니다.
              </span>
              <div>
                {expertAnalysis &&
                  expertAnalysis.split("/").map((lst) => <span>· {lst}</span>)}
              </div>
            </StyledExpert>
          </StyledResultReport>

          <StyledMaterialWrapper>
            <header>
              <div>
                {petName}에게 <b>필요한 원료 구성입니다</b>
              </div>
              <p>
                <span>
                  나이 : {year}살 {month === 0 ? "" : `${month}개월`} | 체중 :{" "}
                  {petWeight} kg
                </span>
                <button onClick={() => setmodalVisible(!modalVisible)}>
                  이미지로 보기
                </button>
              </p>
            </header>
            {remove_duplicate_material !== null &&
              remove_duplicate_material !== undefined &&
              Object.keys(remove_duplicate_material).map((item) => (
                <MaterialCard
                  key={item}
                  category={item}
                  item={remove_duplicate_material[item]}
                  setDetailVisible={setDetailVisible}
                  setDetailMaterial={setDetailMaterial}
                  clickable={true}
                />
              ))}
            <MaterialCard
              key={"배합용 파우더"}
              category={"배합용 파우더"}
              item={{
                배합용파우더: {
                  category: "배합용 파우더",
                  id: 999,
                  name: "배합용 파우더",
                  kor_name: "배합용 파우더",
                  price: 3000,
                  kor_name: "배합용 파우더",
                  recommend_amount: 0,
                  related_question: "",
                  cnt: parseInt((60000 - total_weight) / 5000),
                  score: "0",
                  standard_amount: 5000,
                },
              }}
              setDetailVisible={setDetailVisible}
              setDetailMaterial={setDetailMaterial}
              clickable={false}
            />
            <StyledResultCost>
              <span>금액 총합</span>
              <span>
                {total_cost + 3000 * parseInt((60000 - total_weight) / 5000)}원
              </span>
            </StyledResultCost>
          </StyledMaterialWrapper>
          <StyledNextButton to={"/goodness-of-fit"}>
            원료간 적합도 측정하기
          </StyledNextButton>
          <NutrientPreviewModal
            modalVisible={modalVisible}
            closeModal={setmodalVisible}
            materialList={remove_duplicate_material}
            basepowder={[
              {
                category: "배합용파우더",
                id: 999,
                name: "배합용 파우더",
                price: 3000,
                recommend_amount: 0,
                related_question: "",
                kor_name: "배합용 파우더",
                score: "0",
                cnt: parseInt((60000 - total_weight) / 5000),
                standard_amount: 5000,
              },
            ]}
          />
        </StyledSurveyResultWrapper>
      </>
    );
  } else {
    return (
      <MaterialDetailPage
        detailMaterial={detailMaterial}
        setDetailMaterial={setDetailMaterial}
        setDetailVisible={setDetailVisible}
        detailVisible={detailVisible}
        finalOrderRemove={finalOrderRemove}
        noEdit
      />
    );
  }
};

export default withRouter(SurveyResult);

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
  padding-top: 30px;
  color: #ffffff;

  div {
    font-size: 28px;
  }
  span {
    display: block;
    margin-top: 20px;
    letter-spacing: -0.75px;
    font-weight: 300;
  }
`;

const StyledResultCardWrapper = styled.div`
  margin-top: 35px;
  padding: 10px;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 10px;
  opacity: 1;
  img {
    width: 33%;
    height: 31vw;
    max-height: 180px;
  }
  color: #333333;
  display: flex;
  /* justify-content: center; */
  flex-direction: column;
  align-items: center;

  & > div {
    margin-top: 15px;
    display: flex;

    justify-content: center;
  }
  & > span {
    font-weight: bold;
    font-size: 26px;
  }

  @media (max-width: 420px) {
    span {
      font-size: 21px;
    }
  }
`;

const StyledMaterialWrapper = styled.div`
  header {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 25px;
    div {
      text-align: left;
      font: normal normal 300 22px/33px Noto Sans KR;
      letter-spacing: -1.1px;
      color: #333333;
      b {
        font-weight: bold;
      }
    }
    p {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      span {
        text-align: left;
        font: normal normal 300 15px/22px Noto Sans KR;
        color: #333333;
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

// Header
const StyledBackGround = styled.div`
  position: absolute;
  z-index: -1;
  top: 0;
  right: 0;
  width: 100%;
  height: 225px;
  background-image: url(${MAIN_TOP_BG});
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 0 0 25px 25px;
`;

const StyledResultReport = styled.div`
  margin-top: 15px;
  text-align: left;
  color: #333333;
  opacity: 1;
  font-size: 22px;

  & > span {
    font-weight: bold;
  }
  & > p {
    font-size: 15px;
    letter-spacing: -0.75px;
    color: #333333;
  }
  & > p > span {
    color: #e16a49;
    font-weight: bold;
  }
`;

const StyledReportContent = styled.div`
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 10px;
  opacity: 1;
  padding: 15px;
  font-size: 15px;
  font-weight: 600;
  font: normal normal normal 15px/22px Noto Sans KR;
  & > header {
    font-size: 17px;
    letter-spacing: -0.85px;
    color: #2b428e;
    opacity: 1;
    font-weight: bold;
    margin: 10px 0;
    margin-top: 20px;
  }
  & > p {
    margin: 0;
    margin: 10px 0;
  }
  & > p > span {
    display: block;
  }
  & > p > span > b {
    color: #e16a49;
  }
`;

const StyledExpert = styled.div`
  margin-top: 25px;
  & > header {
    text-align: left;
    font: normal normal medium 22px/33px Noto Sans KR;
    letter-spacing: -1.1px;
    color: #333333;
  }
  & > span {
    letter-spacing: -0.75px;
    opacity: 1;
    b {
      color: #e16a49;
    }
    margin: 10px 0;
  }

  & span {
    font-size: 15px;
  }
  & div {
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 10px;
    opacity: 1;
    padding: 15px;
    span {
      display: block;
    }
    margin-bottom: 25px;
  }
`;
