import { combineReducers } from "./redux";
import recommendFit from "./recommendFit";

const recommendReducer = combineReducers({
  recommendFit,
});

export default rootReducer;

//duck type과 기존 type혼재
