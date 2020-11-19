import React from "react";
import { connect } from "react-redux";
import {
  checkSurvey
} from "../Redux/module/recommendFit";
import CommonQuestion from "../Service/NutrientFit/CommonQuestion";
const CommonQuestionContainer = ({

  checkSurvey
}) => {
  return (
    <CommonQuestion
      checkSurvey={checkSurvey}
    />
  );
};


export default connect((state) => ({}), {
  checkSurvey,
})(CommonQuestionContainer);
