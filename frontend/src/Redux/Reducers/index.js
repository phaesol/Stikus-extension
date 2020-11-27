import { combineReducers } from "redux";
import petInfoReducer from "./petInfoReducer";
import petMusicReducer from "./petMusicReducer";
import recommendFit from "../module/recommendFit";
import resultMaterial from "../module/resultMaterial";
import selfMake from "../module/selfMake";
import payment from "../module/payment";
const rootReducer = combineReducers({
  petInfo: petInfoReducer,
  recommendFit,
  resultMaterial,
  selfMake,
  petMusic: petMusicReducer,
  payment,
});

export default rootReducer;
