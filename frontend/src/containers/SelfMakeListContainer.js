import React from "react";
import { connect } from "react-redux";
import SelfMakeList from "../Service/NutrientFit/SelfMakeList";
const SelfMakeListContainer = ({ order_nutrient }) => {
  return <SelfMakeList order_nutrient={order_nutrient} />;
};

export default connect(
  ({ selfMake }) => ({
    order_nutrient: selfMake.order_nutrient,
  }),
  {}
)(SelfMakeListContainer);
