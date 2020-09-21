import { combineReducers } from "redux";
import petInfoReducer from "./petInfoReducer";
import recommendFit from "../module/recommendFit";
import resultMaterial from "../module/resultMaterial";
const rootReducer = combineReducers({
  petInfo: petInfoReducer,
  recommendFit,
  resultMaterial,
});

export default rootReducer;
