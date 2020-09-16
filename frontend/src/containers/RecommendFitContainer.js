import React from "react";
import { connect } from "react-redux";
import RecommendServey from "../Service/NutrientFit/RecommendServey";
import { choicecard } from "../Redux/module/recommendFit";
const RecommendFitContainer = ({ choosecards, choicecard }) => {
  return <RecommendServey choosecards={choosecards} choicecard={choicecard} />;
};

const mapStateToProps = (state) => ({
  choosecards: state.recommendFit.choosecards,
});

const mapDispatchProps = (dispatch) => ({
  choicecard: () => {
    dispatch(choicecard());
  },
});

export default connect(
  (state) => ({
    choosecards: state.recommendFit.choosecards,
  }),
  {
    choicecard,
  }
)(RecommendFitContainer);
