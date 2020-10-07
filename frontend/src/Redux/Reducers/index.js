import { combineReducers } from "redux";
import petInfoReducer from "./petInfoReducer";
import petMusicReducer from './petMusicReducer';
import recommendFit from "../module/recommendFit";
import resultMaterial from "../module/resultMaterial";
const rootReducer = combineReducers({
  petInfo: petInfoReducer,
  recommendFit,
  resultMaterial,
  petMusic: petMusicReducer,
});

export default rootReducer;
