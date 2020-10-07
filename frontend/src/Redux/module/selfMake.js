import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
const PICKMATERIAL = "selfMake/CHOICECARD";
const GETNUTRIENT = "selfMake/GETNUTRIENT";
export const pickMaterial = createAction(
  PICKMATERIAL,
  (materials) => materials
);
export const getNutrient = createAction(GETNUTRIENT, (data) => data);
const initialState = {
  choosecards: [
    { name: "h-bone", choice: false, recommend: false },
    { name: "h-brain", choice: false, recommend: false },
    { name: "h-diabetes", choice: false, recommend: false },
    { name: "h-eyes", choice: false, recommend: false },
    { name: "h-growth", choice: false, recommend: false },
    { name: "h-heart", choice: false, recommend: false },
    { name: "h-intestine", choice: false, recommend: false },
    { name: "h-kidney", choice: false, recommend: false },
    { name: "h-liver", choice: false, recommend: false },
    { name: "h-obesity", choice: false, recommend: false },
    { name: "h-respirator", choice: false, recommend: false },
    { name: "h-skin", choice: false, recommend: false },
    { name: "h-tooth", choice: false, recommend: false },
    { name: "h-tumor", choice: false, recommend: false },
    { name: "h-urinary", choice: false, recommend: false },
    { name: "all-material", choice: false, recommend: true },
  ],
  health_nutrient: [],
};

const selfMake = handleActions(
  {
    [PICKMATERIAL]: (state, { payload: materials }) =>
      produce(state, (draft) => {
        console.log("pick me pick me");
      }),
    [GETNUTRIENT]: (state, { payload: data }) =>
      produce(state, (draft) => {
        console.log("싸인받아준데", data);
        draft.health_nutrient = data;
      }),
  },
  initialState
);

export default selfMake;
