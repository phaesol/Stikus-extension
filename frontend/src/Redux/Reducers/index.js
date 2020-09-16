import { combineReducers } from "redux";
import petInfoReducer from "./petInfoReducer";
import recommendFit from "../../containers/nutrientFit/module/recommendFit";
const rootReducer = combineReducers({
  petInfo: petInfoReducer,
  recommendFit,
});

export default rootReducer;
