import React, { useEffect, useState } from "react";
import StyledNextButton from "../../Components/button/StyledNextButton";
import styled, { css } from "styled-components";
import ImageCard from "../../Components/NutrientFit/ImageCard";
import MaterialCard from "../../Components/NutrientFit/MaterialCard";
import axios from "axios";
import StyledPrevButton from "../../Components/button/StyledPrevButton";
import NutrientPreviewModal from "../../Components/NutrientFit/NutrientPreviewModal/NutrientPreviewModal";
import { Link } from "react-router-dom";

const SelfMake = ({
  choosecards,
  getNutrient,
  health_nutrient,
  pickMaterial,
  all_nutrient,
  order_nutrient,
}) => {
  //@TODO 카드 토글도 넣어놨는데 이것도 나중에 따로 빼야함

  // @TODO 카드 선택후 페이지에서 영상소를 선택선택 해서 추가할수 있는 기능 구현(이건 논의 필요) 및 원료 전체보기 기능 구현,
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showCard, setShowCard] = useState("");
  const [tempMaterial, setTempMaterial] = useState([]);
  const [tempChoice, setTempChoice] = useState({});
  const [modalVisible, setmodalVisible] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const _res = await axios.get("http://api.doctorfit.net/health");
        // 요청 URL

        getNutrient(_res.data);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    loadData();
    return setLoading(false);
  }, []);

  function clickCard(item) {
    setShowCard(item);
  }

  if (showCard) {
    const clickmaterial = health_nutrient.filter(
      (item) => item.slug === showCard.substring(2)
    );
    // console.log("한번 거르자", clickmaterial[0].nutrient_set);
    return (
      //우리가 카드를 선택했을때 보여주는 render화면
      <>
        <StyledSelfMakeTitle>
          영양제 직접 만들기
          <span>원하시는 원료를 추가하여 영양제를 직접 만들어보세요.</span>
        </StyledSelfMakeTitle>
        <StyledSurveyCardWrapper>
          {showCard === "all-material" ? (
            <img
              src={require(`../../Images/Disease/${showCard}1.png`)}
              alt={`선택된 ${showCard}카드`}
            />
          ) : (
            <img
              src={require(`../../Images/Disease/${showCard}01.png`)}
              alt={`선택된 ${showCard}카드`}
            />
          )}

          <img
            onClick={() => {
              clickCard(null);
              setTempMaterial([]);
            }}
            src={require(`../../Images/Disease/back-bt.png`)}
            alt={`뒤로가기 카드`}
          />
        </StyledSurveyCardWrapper>
        <StyledMaterialInfo>
          ※ <span>원료목록을 터치</span>하여 원료를 추가하실 수 있습니다.
        </StyledMaterialInfo>
        {showCard === "all-material"
          ? Object.keys(all_nutrient).map((item) => [
              item !== "추가급여" && (
                <StyledAllMaterialCate key={item} item={item}>
                  {item}
                </StyledAllMaterialCate>
              ),
              item !== "추가급여" &&
                Object.keys(all_nutrient[item]).map((matkey) => (
                  <StyledMaterialListItem
                    key={all_nutrient[item][matkey].id}
                    onClick={() => {
                      const tmpindex = tempMaterial.findIndex(
                        (ele) => ele[1].name === all_nutrient[item][matkey].name
                      );
                      if (tmpindex !== -1) {
                        setTempMaterial(
                          tempMaterial.filter(
                            (ele) =>
                              ele[1].name !== all_nutrient[item][matkey].name
                          )
                        );
                      } else {
                        setTempMaterial(
                          tempMaterial.concat([
                            ["all-material", all_nutrient[item][matkey]],
                          ])
                        );
                      }
                    }}
                    choice={
                      tempMaterial.findIndex(
                        (temp) =>
                          temp[1].name === all_nutrient[item][matkey].name
                      ) !== -1
                        ? !all_nutrient[item][matkey].choice
                        : all_nutrient[item][matkey].choice
                    }
                  >
                    <span>
                      {all_nutrient[item][matkey].name.length > 5
                        ? all_nutrient[item][matkey].name.substring(0, 5) +
                          "..."
                        : all_nutrient[item][matkey].name}
                    </span>
                    <span>
                      {1}개 ({all_nutrient[item][matkey].standard_amount}g)
                    </span>
                    <span>{all_nutrient[item][matkey].price}원</span>
                  </StyledMaterialListItem>
                )),
            ])
          : clickmaterial[0].nutrient_set.map((item) => (
              <StyledMaterialListItem
                key={item.id}
                onClick={() => {
                  const tmpindex = tempMaterial.findIndex(
                    (ele) => ele[1].name === item.name
                  );
                  if (tmpindex !== -1) {
                    setTempMaterial(
                      tempMaterial.filter((ele) => ele[1].name !== item.name)
                    );
                  } else {
                    setTempMaterial(
                      tempMaterial.concat([[showCard.substring(2), item]])
                    );
                  }
                }}
                choice={
                  tempMaterial.findIndex(
                    (temp) => temp[1].name === item.name
                  ) !== -1
                    ? !item.choice
                    : item.choice
                }
              >
                <span>
                  {item.name.length > 5
                    ? item.name.substring(0, 5) + "..."
                    : item.name}
                </span>
                <span>
                  {1}개 ({item.standard_amount}g)
                </span>
                <span>{item.price}원</span>
              </StyledMaterialListItem>
            ))}
        <StyledButtonWrapper>
          <StyledBackBtn
            onClick={() => {
              setTempMaterial([]);
              clickCard(null);
            }}
          >
            이전
          </StyledBackBtn>
          <StyledCompButton
            onClick={() => {
              tempMaterial.map((item) => pickMaterial(item[0], item[1]));
              clickCard(null);
              setTempMaterial([]);
            }}
          >
            선택완료
          </StyledCompButton>
        </StyledButtonWrapper>
      </>
    );
  } else
    return (
      // 여기는 전체화면을 보여줌
      <>
        <StyledSelfMakeTitle>
          영양제 직접 만들기
          <span>원하시는 원료를 추가하여 영양제를 직접 만들어보세요.</span>
        </StyledSelfMakeTitle>

        <StyledSurveyCardWrapper>
          {choosecards.map((item) => (
            <ImageCard
              key={item.name}
              item={item}
              onToggle={() => clickCard(item.name)}
            />
          ))}
        </StyledSurveyCardWrapper>
        <StyledMaterialWrapper>
          <span>직접 추가하신 원료에요!</span>
          <button onClick={() => setmodalVisible(true)}>한눈에 보기</button>

          <NutrientPreviewModal
            modalVisible={modalVisible}
            closeModal={setmodalVisible}
            // materialList={Object.keys(order_nutrient).map((key) =>
            //   Object.keys(order_nutrient[key]).filter(
            //     (item) => order_nutrient[key][item].cnt > 0
            //   )
            // )}
            materialList={all_nutrient}
            basepowder={[
              {
                category: "배합용파우더",
                id: 999,
                name: "배합용 파우더",
                price: 2800,
                recommend_amount: 0,
                related_question: "",
                score: "0",
                standard_amount: 60, //@@TODO 여기서 standard_amount 조절해야함
                cnt: 1,
              },
            ]}
            usercustom
          />
        </StyledMaterialWrapper>
        <StyledMaterialInfo>
          ※ <span>원료목록을 터치</span>하여 삭제 또는 수량을 조정할 수
          있습니다.
        </StyledMaterialInfo>

        {Object.keys(all_nutrient).map((item) =>
          Object.keys(all_nutrient[item]).map((matkey) =>
            all_nutrient[item][matkey].choice ? (
              <StyledMaterialListItemReverse
                key={all_nutrient[item][matkey].id}
                onClick={() => {
                  pickMaterial("remove-material", all_nutrient[item][matkey]);
                }}
                choice={all_nutrient[item][matkey].choice}
              >
                <span>
                  {all_nutrient[item][matkey].name.length > 5
                    ? all_nutrient[item][matkey].name.substring(0, 5) + "..."
                    : all_nutrient[item][matkey].name}
                </span>
                <span>
                  {all_nutrient[item][matkey].cnt}개 (
                  {all_nutrient[item][matkey].cnt *
                    all_nutrient[item][matkey].standard_amount}
                  g)
                </span>
                <span>{all_nutrient[item][matkey].price}원</span>
              </StyledMaterialListItemReverse>
            ) : null
          )
        )}
        <StyledMaterialListItem key={"배합용 파우더"}>
          <span>{"배합용 파우더"}</span>
          <span>
            {1}개 ({`10g`})
          </span>
          <span>{2800}원</span>
        </StyledMaterialListItem>

        <StyledNextBtn to="/selfmakelist">선택완료</StyledNextBtn>
      </>
    );
};

export default SelfMake;

const StyledSelfMakeTitle = styled.header`
  text-align: left;
  font-size: 20px;
  letter-spacing: -1px;
  color: #333333;
  opacity: 1;

  margin-top: 30px;
  font-weight: bold;
  span {
    display: block;
    letter-spacing: -0.75px;
    color: #080808;
    font-size: 15px;
    margin-top: 15px;
    font-weight: 400;
  }
`;

// @TODO 여기 컴포넌트 분리가능
const StyledSurveyCardWrapper = styled.div`
  margin-top: 15px;
  display: flex;
  flex-wrap: wrap;

  img {
    width: 25%;
    cursor: pointer;
  }
`;

const StyledMaterialWrapper = styled.div`
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
`;

const StyledMaterialInfo = styled.div`
  font-size: 13px;
  letter-spacing: -0.65px;
  opacity: 1;
  margin-bottom: 15px;
  span {
    color: #e16a49;
  }
`;
// @TODO 여기 밑에 있는 listitem도 compo로 분리해서 빼내야할것 같다
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
  cursor: pointer;

  span:nth-child(1),
  span:nth-child(2) {
    flex: 2;
  }
  span:nth-child(3) {
    flex: 1;
  }
  ${(props) =>
    props.choice &&
    css`
      background: #f2f2f2 0% 0% no-repeat padding-box;
      letter-spacing: -0.75px;
      color: #a5a4a4;
    `}
`;

const StyledMaterialListItemReverse = styled(StyledMaterialListItem)`
  background: white;
  letter-spacing: -0.75px;
  color: #333333;
`;
const StyledButtonWrapper = styled.div`
  margin-top: 15px;
  display: flex;
`;

const StyledBackBtn = styled.button`
  border: none;
  background: none;
  background: #f2f2f2 0% 0% no-repeat padding-box;
  border-radius: 5px;
  opacity: 1;
  text-align: center;
  font-size: 18px;
  padding: 10px 0;
  width: 150px;
  letter-spacing: -0.9px;
  color: #2b428e;
  opacity: 1;
  margin-right: 15px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    color: #3854b0;
    background-color: #c9c9c9;
  }
`;

const StyledAllMaterialCate = styled.div`
  font-size: 18px;
  letter-spacing: -0.9px;
  opacity: 1;
  margin-bottom: 15px;
  font-weight: bold;
  ${(props) =>
    props.item === "기능성원료" &&
    css`
      color: #fc6e51;
    `}
  ${(props) =>
    props.item === "비타민" &&
    css`
      color: #8cc152;
    `}
    ${(props) =>
    props.item === "미네랄" &&
    css`
      color: #5d9cec;
    `}
`;

const StyledCompButton = styled.button`
  border: none;
  background: none;
  font-size: 17px;
  width: 100%;
  height: 45px;
  background: #2b428e;
  border-radius: 5px;
  letter-spacing: -0.9px;
  color: #ffffff;
  cursor: pointer;

  ${(props) =>
    props.disabled &&
    css`
      background: #7787ba;

      cursor: not-allowed;
    `}
`;

const StyledNextBtn = styled(Link)`
  display: flex;
  align-items: center;
  border: none;
  justify-content: center;
  background: none;
  font-size: 17px;
  width: 100%;
  height: 45px;
  background: #2b428e;
  border-radius: 5px;
  letter-spacing: -0.9px;
  color: #ffffff;
  cursor: pointer;

  ${(props) =>
    props.disabled &&
    css`
      background: #7787ba;

      cursor: not-allowed;
    `}
`;
