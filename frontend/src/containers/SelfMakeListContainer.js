import React from "react";
import { connect } from "react-redux";
import SelfMakeList from "../Service/NutrientFit/SelfMakeList";
import { finalOrder } from "../Redux/module/selfMake";
const SelfMakeListContainer = ({ final_order_nutrient, finalOrder }) => {
  return (
    <SelfMakeList
      final_order_nutrient={final_order_nutrient}
      finalOrder={finalOrder}
    />
  );
};

export default connect(
  ({ selfMake }) => ({
    final_order_nutrient: selfMake.final_order_nutrient,
  }),
  { finalOrder }
)(SelfMakeListContainer);
