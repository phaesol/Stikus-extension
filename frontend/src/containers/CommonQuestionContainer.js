import React from "react";
import { connect } from "react-redux";
import { checkfit } from "../Redux/module/selfMake";
import CommonQuestion from "../Service/NutrientFit/CommonQuestion";
const CommonQuestionContainer = ({ checkfit }) => {
  return <CommonQuestion checkfit={checkfit} />;
};

export default connect((state) => ({}), {
  checkfit,
})(CommonQuestionContainer);
