import React from "react";
import { connect } from "react-redux";
import RecommendSurvey from "../Service/NutrientFit/RecommendSurvey";
import {
  choicecard,
  responseSurvey,
  checkSurvey,
} from "../Redux/module/recommendFit";
const RecommendFitContainer = ({
  choosecards,
  choicecard,
  mySurveyList,
  responseSurvey,
  checkSurvey,
}) => {
  return (
    <RecommendSurvey
      choosecards={choosecards}
      choicecard={choicecard}
      mySurveyList={mySurveyList}
      responseSurvey={responseSurvey}
      checkSurvey={checkSurvey}
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
  ({ recommendFit }) => ({
    choosecards: recommendFit.choosecards,
    mySurveyList: recommendFit.mySurveyList,
  }),
  {
    choicecard,
    responseSurvey,
    checkSurvey,
  }
)(RecommendFitContainer);
