import React from "react";
import { connect } from "react-redux";
import SelfMakeList from "../Service/NutrientFit/SelfMakeList";
import {
  finalOrder,
  finalOrderEdit,
  finalOrderRemove,
} from "../Redux/module/selfMake";

import { setFlag } from "../Redux/module/payment";
const SelfMakeListContainer = ({
  final_order_nutrient,
  finalOrder,
  finalOrderEdit,
  finalOrderRemove,
  petName,
  petWeight,
  petAge,
  setFlag,
}) => {
  return (
    <SelfMakeList
      final_order_nutrient={final_order_nutrient}
      finalOrder={finalOrder}
      finalOrderEdit={finalOrderEdit}
      finalOrderRemove={finalOrderRemove}
      petName={petName}
      petWeight={petWeight}
      petAge={petAge}
      setFlag={setFlag}
    />
  );
};

export default connect(
  (state) => ({
    petName: state.petInfo.name,
    petWeight: state.petInfo.weight,
    petAge: state.petInfo.age,
    final_order_nutrient: state.selfMake.final_order_nutrient,
  }),
  { finalOrder, finalOrderEdit, finalOrderRemove, setFlag }
)(SelfMakeListContainer);
