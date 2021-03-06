import React from "react";
import { connect } from "react-redux";
import RecommendSurvey from "../Service/NutrientFit/RecommendSurvey";
import {
  choicecard,
  responseSurvey,
  checkSurvey,
  getRecomCard,
  cleanCard,
} from "../Redux/module/recommendFit";
const RecommendFitContainer = ({
  choosecards,
  choicecard,
  mySurveyList,
  responseSurvey,
  checkSurvey,
  getRecomCard,
  petInfo,
  cleanCard,
}) => {
  return (
    <RecommendSurvey
      choosecards={choosecards}
      choicecard={choicecard}
      mySurveyList={mySurveyList}
      responseSurvey={responseSurvey}
      checkSurvey={checkSurvey}
      getRecomCard={getRecomCard}
      petInfo={petInfo}
      cleanCard={cleanCard}
    />
  );
};

// const mapStateToProps = (state) => ({
//   choosecards: state.recommendFit.choosecards,
// });

// const mapDispatchProps = (dispatch) => ({
//   choicecard: () => {
//     dispatch(choicecard());
//   },
// });

export default connect(
  ({ recommendFit, petInfo }) => ({
    choosecards: recommendFit.choosecards,
    mySurveyList: recommendFit.mySurveyList,
    petInfo: petInfo,
  }),
  {
    choicecard,
    responseSurvey,
    checkSurvey,
    getRecomCard,
    cleanCard,
  }
)(RecommendFitContainer);
