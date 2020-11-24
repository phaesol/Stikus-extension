import { combineReducers } from "redux";
import userReducer from "./userReducer";
import petInfoReducer from "./petInfoReducer";
import petMusicReducer from './petMusicReducer';
import recommendFit from "../module/recommendFit";
import resultMaterial from "../module/resultMaterial";
import selfMake from "../module/selfMake";

const rootReducer = combineReducers({
  user: userReducer,
  petInfo: petInfoReducer,
  recommendFit,
  resultMaterial,
  selfMake,
  petMusic: petMusicReducer,
});

export default rootReducer;
