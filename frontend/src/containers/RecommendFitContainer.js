import React from "react";
import { connect } from "react-redux";
import RecommendSurvey from "../Service/NutrientFit/RecommendSurvey";
import { choicecard } from "../Redux/module/recommendFit";
const RecommendFitContainer = ({ choosecards, choicecard }) => {
  return <RecommendSurvey choosecards={choosecards} choicecard={choicecard} />;
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
  (state) => ({
    choosecards: state.recommendFit.choosecards,
  }),
  {
    choicecard,
  }
)(RecommendFitContainer);
