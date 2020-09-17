import React from "react";
import { connect } from "react-redux";
import RecommendSurvey from "../Service/NutrientFit/RecommendSurvey";
import { choicecard, responseSurvey } from "../Redux/module/recommendFit";
const RecommendFitContainer = ({
  choosecards,
  choicecard,
  mySurveyList,
  responseSurvey,
}) => {
  return (
    <RecommendSurvey
      choosecards={choosecards}
      choicecard={choicecard}
      mySurveyList={mySurveyList}
      responseSurvey={responseSurvey}
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
  }
)(RecommendFitContainer);
