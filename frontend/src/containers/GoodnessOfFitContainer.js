import React from "react";
import { connect } from "react-redux";
import GoodnessOfFit from "../Service/NutrientFit/GoodnessOfFit";

const GoodnessOfFitContainer = ({
  // choosecards,
  remove_duplicate_material,
  final_order_nutrient,
  caution_nutrient,
  weight,
  selfMakeFlag,
  recomMakeFlag,
}) => {
  // @@TODO 여기서 fianl이랑 remove랑 각기 다른 프로세스로 전달이되니까 빈값구분 잘해주자

  return (
    <GoodnessOfFit
      check_final_order_nutrient={
        recomMakeFlag === true && selfMakeFlag === false
          ? remove_duplicate_material
          : final_order_nutrient
      }
      // choosecards={choosecards}
      // remove_duplicate_material={remove_duplicate_material}
      caution_nutrient={caution_nutrient}
      weight={weight}
    />
  );
};

export default connect(
  (state) => ({
    // choosecards: state.recommendFit.choosecards,
    remove_duplicate_material: state.resultMaterial.remove_duplicate_material,
    final_order_nutrient: state.selfMake.final_order_nutrient,
    caution_nutrient: state.selfMake.caution_nutrient,
    weight: state.petInfo.weight,
    selfMakeFlag: state.payment.selfMakeFlag,
    recomMakeFlag: state.payment.recomMakeFlag,
  }),
  {}
)(GoodnessOfFitContainer);
