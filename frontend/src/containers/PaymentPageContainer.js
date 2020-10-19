import React from "react";
import { connect } from "react-redux";
import PaymentPage from "../Service/NutrientFit/PaymentPage";
const PaymentPageContainer = ({ choosecards, materialList, petName }) => {
  return (
    <PaymentPage
      choosecards={choosecards}
      materialList={materialList}
      petName={petName}
    />
  );
};

export default connect(
  (state) => ({
    petName: state.petInfo.name,
    choosecards: state.recommendFit.choosecards,
    materialList: state.resultMaterial.materialList,
  }),
  {}
)(PaymentPageContainer);
