import React from "react";
import { connect } from "react-redux";
import SelfMake from "../Service/NutrientFit/SelfMake";
import { pickMaterial, getNutrient } from "../Redux/module/selfMake";
const SelfMakeContainer = ({
  choosecards,
  health_nutrient,
  pickMaterial,
  getNutrient,
  all_nutrient,
}) => {
  return (
    <SelfMake
      choosecards={choosecards}
      pickMaterial={pickMaterial}
      getNutrient={getNutrient}
      health_nutrient={health_nutrient}
      all_nutrient={all_nutrient}
    />
  );
};

export default connect(
  ({ selfMake }) => ({
    choosecards: selfMake.choosecards,
    health_nutrient: selfMake.health_nutrient,
    all_nutrient: selfMake.all_nutrient,
  }),
  { pickMaterial, getNutrient }
)(SelfMakeContainer);
