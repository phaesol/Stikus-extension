import React from "react";
import { connect } from "react-redux";
import PaymentPage from "../Service/NutrientFit/PaymentPage";
const PaymentPageContainer = ({
  choosecards,
  materialList,
  petName,
  petWeight,
  petAge,
  remove_duplicate_materiale,
  final_order_nutrient,
}) => {
  return (
    <PaymentPage
      choosecards={choosecards}
      final_mateiral={
        final_order_nutrient ? final_order_nutrient : remove_duplicate_materiale
      }
      petName={petName}
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
    choosecards: state.recommendFit.choosecards,
    materialList: state.resultMaterial.materialList,
    remove_duplicate_material: state.resultMaterial.remove_duplicate_material,
    final_order_nutrient: state.selfMake.final_order_nutrient,
  }),
  {}
)(PaymentPageContainer);
