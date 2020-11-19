import React from "react";
import { connect } from "react-redux";
import SelfMakeList from "../Service/NutrientFit/SelfMakeList";
import {
  finalOrder,
  finalOrderEdit,
  finalOrderRemove,
} from "../Redux/module/selfMake";
const SelfMakeListContainer = ({
  final_order_nutrient,
  finalOrder,
  finalOrderEdit,
  finalOrderRemove,
}) => {
  return (
    <SelfMakeList
      final_order_nutrient={final_order_nutrient}
      finalOrder={finalOrder}
      finalOrderEdit={finalOrderEdit}
      finalOrderRemove={finalOrderRemove}
    />
  );
};

export default connect(
  ({ selfMake }) => ({
    final_order_nutrient: selfMake.final_order_nutrient,
  }),
  { finalOrder, finalOrderEdit, finalOrderRemove }
)(SelfMakeListContainer);
