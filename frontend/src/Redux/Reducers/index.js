import { combineReducers } from "redux";
import petInfoReducer from "./petInfoReducer";
import recommendFit from "../module/recommendFit";
import resultMaterial from "../module/resultMaterial";
import selfMake from "../module/selfMake";
const rootReducer = combineReducers({
  petInfo: petInfoReducer,
  recommendFit,
  resultMaterial,
  selfMake,
});

export default rootReducer;
