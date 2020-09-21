import React from "react";
import { connect } from "react-redux";
import SurveyResult from "../Service/NutrientFit/SurveyResult";
import { setData } from "../Redux/module/resultMaterial";

const ResultMaterialContainer = ({ setData, resultMaterial, mySurveyList }) => {
  return (
    <SurveyResult
      setData={setData}
      resultMaterial={resultMaterial}
      mySurveyList={mySurveyList}
    />
  );
};

export default connect(
  (state) => ({
    resultMaterial: state.resultMaterial.materialList,
    mySurveyList: state.recommendFit.mySurveyList,
  }),
  {
    setData,
  }
)(ResultMaterialContainer);
