import React from "react";
import { connect } from "react-redux";
import GoodnessOfFit from "../Service/NutrientFit/GoodnessOfFit";

const GoodnessOfFitContainer = ({ choosecards, materialList }) => {
  return (
    <GoodnessOfFit choosecards={choosecards} materialList={materialList} />
  );
};

export default connect(
  (state) => ({
    choosecards: state.recommendFit.choosecards,
    materialList: state.resultMaterial.materialList,
  }),
  {}
)(GoodnessOfFitContainer);
