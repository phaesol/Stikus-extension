import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

const MaterialDetailPage = ({
  detailMaterial,
  setDetailMaterial,
  setDetailVisible,
  finalOrderEdit,
  finalOrderRemove,
  noEdit,
}) => {
  return (
    <MaterialDetailPageBlock>
      <header>다음과 같은 건강기능에 도움이 됩니다.</header>
      <section>
        <CardWrapper>
          {detailMaterial.health_related.map((item) => (
            <img
              src={require(`../../Images/Disease/h-${item}01.png`)}
              alt={`선택된 ${item}카드`}
            />
          ))}
        </CardWrapper>
        <FakeCircleWrapper>
          <BackgroundCircle />

          <ImgWrapper>
            <img
              src={require(`../../Images/NutrientFit/${detailMaterial.category}x2.png`)}
              alt={`선택된 ${detailMaterial.category}카드`}
            />
          </ImgWrapper>
        </FakeCircleWrapper>
      </section>
      <DetailInfoSection>
        <header>
          {detailMaterial.name}{" "}
          <span>{detailMaterial.recommend_amount * detailMaterial.cnt}g</span>
        </header>
        {noEdit ? null : (
          <ControlSection>
            <ControlSectionLabel>
              <span>적정용량</span>

              <StyledCntButton>
                <div
                  onClick={() => {
                    if (detailMaterial.cnt > 1)
                      setDetailMaterial({
                        ...detailMaterial,
                        cnt: detailMaterial.cnt - 1,
                      });
                  }}
                >
                  -
                </div>
                <div>{detailMaterial.cnt}</div>
                <div
                  onClick={() =>
                    setDetailMaterial({
                      ...detailMaterial,
                      cnt: detailMaterial.cnt + 1,
                    })
                  }
                >
                  +
                </div>
              </StyledCntButton>
            </ControlSectionLabel>
            <StyledCardTriangle pos={50}></StyledCardTriangle>
            <StyledCardFitBar
              variant="determinate"
              value={50} //이렇게 표시해주면 현재 양이 계산된다
            />
            <StyledCardFitBarLabel>
              <span>최소 ( 1 개)</span>
              <span>추천 (1개)</span>
              <span>최대 ( 5 개)</span>
            </StyledCardFitBarLabel>
          </ControlSection>
        )}
        <MaterialDesc>
          {detailMaterial.desc.split("\n").map((line) => (
            <span>
              {line}
              <br />
            </span>
          ))}
        </MaterialDesc>
        <AdditionalInfo>
          ※ 성분, 원산지 및 제조원 표시
          <br />
          조단백 10.% 이상, 조지방 3.0%이상,조섬요2.0% 이하,
          <br />
          조섬유 2.0%이하, 조회분 7.0% 이하 칼슘1.0% 이상,인 0.6% 이상, 수분
          14.0% 이하
          <br />
          원산지 : 국내산 │ 제조원 : 스티커스코퍼레이션
        </AdditionalInfo>
      </DetailInfoSection>
      <StyledBtnBox>
        {noEdit? 
        <>
          <StyledPrevBtn
          onClick={() => {
            setDetailVisible(false);
            finalOrderRemove(detailMaterial);
            setDetailMaterial(" ");
          }}
        >
          삭제
        </StyledPrevBtn>
        <StyledNextBtn
          onClick={() => {
            setDetailVisible(false);
            setDetailMaterial(" ");
          }}
        >
          확인
        </StyledNextBtn>
        </>
        : <>
         <StyledPrevBtn
          onClick={() => {
            setDetailVisible(false);
            finalOrderRemove(detailMaterial);
            setDetailMaterial(" ");
          }}
        >
          삭제
        </StyledPrevBtn>
        <StyledNextBtn
          onClick={() => {
            setDetailVisible(false);
            finalOrderEdit(detailMaterial);
            setDetailMaterial(" ");
          }}
        >
          확인
        </StyledNextBtn>
        </>
      }
      
      </StyledBtnBox>
    </MaterialDetailPageBlock>
  );
};

export default MaterialDetailPage;

// 여기부터 재료 디테일 정보가 들어가는 페이지 들이다.
const MaterialDetailPageBlock = styled.div`
  padding: 0 15px;

  padding-top: 50px;
  position: absolute;
  top: 0;
  background: white;
  border: 2px solid green;
  width: 100%;
  max-width: 600px;
  margin-left: -15px;
  min-height: 100vh;

  & > header {
    text-align: left;
    font: normal normal medium 15px/22px Noto Sans KR;
    letter-spacing: -0.75px;
    color: #333333;
    opacity: 1;
    font-weight: 700;
    margin-bottom: 15px;
  }
  & > section {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    height: 270px;
  }
`;

const CardWrapper = styled.div`
  height: 100%;
  margin-right: 20px;
  width: 140px;
  & > img {
    width: 50%;
    margin-bottom: -5px;
  }
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 0px;
    cursor: pointer;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background-color: #f2f2f2;
    border-radius: 3px;
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

const StyledPrevBtn = styled.div`
  display: inline-block;
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
const StyledBtnBox = styled.div`
  display: flex;
`;

const StyledNextBtn = styled(Link)`
  flex: 1;
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

const FakeCircleWrapper = styled.div`
  width: 220px;
  height: 100%;
  position: relative;
  margin-right: -15px;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
`;

const BackgroundCircle = styled.div`
  position: absolute;
  top: 0;
  right: -100px;
  background-color: #f1bbab;
  height: 250px;
  width: 250px;
  border-radius: 50%;
  z-index: 0;
`;

const ImgWrapper = styled.div`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  z-index: 1;
  & > img {
    width: 100%;
  }
`;

const DetailInfoSection = styled.div`
  & > header {
    display: flex;
    justify-content: space-between;
  }
  margin-top: 30px;
  text-align: left;
  font: normal normal bold 22px/33px Noto Sans KR;
  letter-spacing: 0px;
  color: #333333;
  opacity: 1;
  font-weight: bold;
  & > span {
    text-align: right;
    font-size: 18px;
    letter-spacing: -0.75px;
  }
`;

const ControlSection = styled.div`
  width: 100%;
`;

const ControlSectionLabel = styled.div`
  display: flex;
  align-items: center;
  span:nth-child(1) {
    display: inline-block;
    flex: 1;
  }
`;

const StyledCntButton = styled.div`
  display: flex;
  align-items: center;
  & > div:nth-child(1),
  & > div:nth-child(3) {
    width: 25px;
    height: 25px;
    background: #ffffff 0% 0% no-repeat padding-box;
    border: 1px solid #a5a4a4;
    border-radius: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 1;
  }
  & > div {
    font-size: 17px;
    letter-spacing: -0.85px;
    color: #333333;
  }
  div + div {
    margin-left: 15px;
  }
  & > div:nth-child(1),
  & > div:nth-child(3) {
    cursor: pointer;
  }
`;

const StyledCardFitBar = withStyles((theme) => ({
  root: {
    height: 15,
    borderRadius: 7,
  },
  colorPrimary: {
    backgroundColor: "#F2F2F2 ",
  },
  bar: {
    borderRadius: 7,
    backgroundColor: "#E16A49",
  },
}))(LinearProgress);

const StyledCardFitBarLabel = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  font-weight: bold;
  color: #a5a4a4;
  margin-top: 5px;
  & :nth-child(2) {
    color: #e16a49;
  }
`;

const StyledCardTriangle = styled.div`
  width: 0;
  height: 0;
  border-left: 7.5px solid transparent;
  border-right: 7.5px solid transparent;
  border-top: 15px solid #e16a49;
  margin-left: calc(${({ pos }) => pos}% - 7.5px);
`;

const MaterialDesc = styled.div`
  margin: 20px 0;
  text-align: left;
  font: normal normal 300 15px/22px Noto Sans KR;
  letter-spacing: -0.75px;
  color: #333333;
  opacity: 1;
  line-height: 1.6;
  font-weight: 500;
`;

const AdditionalInfo = styled.div`
  margin-bottom: 20px;
  text-align: left;
  font: normal normal 300 13px/23px Noto Sans KR;
  letter-spacing: -0.65px;
  color: #a5a4a4;
  opacity: 1;
`;
