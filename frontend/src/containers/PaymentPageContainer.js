import React from "react";
import { connect } from "react-redux";
import PaymentPage from "../Service/NutrientFit/PaymentPage";
import { makeHistory, changeOptional } from "../Redux/module/payment";
import { setFlag } from "../Redux/module/payment";

const PaymentPageContainer = ({
  choosecards,
  materialList,
  petName,
  petWeight,
  petAge,
  remove_duplicate_material,
  final_order_nutrient,
  makeHistory,
  changeOptional,
  final_order_list,
  history_list,
  recomMakeFlag,
  selfMakeFlag,
  setFlag,
}) => {
  return (
    <PaymentPage
      choosecards={choosecards}
      final_mateiral={(function () {
        if (history_list) {
          return history_list;
        } else {
          return recomMakeFlag === true && selfMakeFlag === false
            ? remove_duplicate_material
            : final_order_nutrient;
        }
      })()}
      petName={petName}
      petWeight={petWeight}
      petAge={petAge}
      makeHistory={makeHistory}
      changeOptional={changeOptional}
      final_order_list={final_order_list}
      history_list={history_list}
      setFlag={setFlag}
      isSelfMake={selfMakeFlag}
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
    final_order_list: state.payment.final_order_list,
    history_list: state.payment.history_list,
    selfMakeFlag: state.payment.selfMakeFlag,

    recomMakeFlag: state.payment.recomMakeFlag,
  }),
  { makeHistory, changeOptional, setFlag }
)(PaymentPageContainer);
