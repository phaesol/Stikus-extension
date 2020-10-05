import React from "react";
import { connect } from "react-redux";
import SelfMake from "../Service/NutrientFit/SelfMake";
import { choicecard } from "../Redux/module/recommendFit";
const SelfMakeContainer = ({ choosecards, choicecard }) => {
  return <SelfMake choosecards={choosecards} choicecard={choicecard} />;
};

export default connect(
  ({ selfMake }) => ({
    choosecards: selfMake.choosecards,
  }),
  {
    choicecard,
  }
)(SelfMakeContainer);
