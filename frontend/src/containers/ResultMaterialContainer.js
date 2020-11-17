import React from "react";
import { connect } from "react-redux";
import SurveyResult from "../Service/NutrientFit/SurveyResult";
import { setData, finalOrderRemove } from "../Redux/module/resultMaterial";
const ResultMaterialContainer = ({
  setData,
  materialList,
  mySurveyList,
  petName,
  petWeight,
  choosecards,
  petAge,
  remove_duplicate_material,
  finalOrderRemove,
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
      remove_duplicate_material={remove_duplicate_material}
      finalOrderRemove={finalOrderRemove}
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
    remove_duplicate_material: state.resultMaterial.remove_duplicate_material,
  }),
  {
    setData,
    finalOrderRemove,
  }
)(ResultMaterialContainer);
