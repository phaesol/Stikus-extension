import React from "react";
import { connect } from "react-redux";
import SurveyResult from "../Service/NutrientFit/SurveyResult";
import { setData } from "../Redux/module/resultMaterial";

const ResultMaterialContainer = ({
  setData,
  materialList,
  mySurveyList,
  petName,
  petWeight,
  choosecards,
  petAge,
}) => {
  return (
    <SurveyResult
      setData={setData}
      materialList={materialList}
      mySurveyList={mySurveyList}
      petName={petName}
      choosecards={choosecards}
      petWeight={petWeight}
      petAge={petAge}
    />
  );
};

export default connect(
  (state) => ({
    petName: state.petInfo.name,
    petWeight: state.petInfo.weight,
    petAge: state.petInfo.age,
    materialList: state.resultMaterial.materialList,
    choosecards: state.recommendFit.choosecards,
    mySurveyList: state.recommendFit.mySurveyList,
  }),
  {
    setData,
  }
)(ResultMaterialContainer);
