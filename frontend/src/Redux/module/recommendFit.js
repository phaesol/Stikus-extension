import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
const CHOICECARD = "recommendFit/CHOICECARD";
const RESPONSESURVEY = "recommendFit/RESPONSESURVEY";

export const choicecard = createAction(CHOICECARD, (name) => name);
export const responseSurvey = createAction(
  RESPONSESURVEY,
  (surveylist) => surveylist
);
// export const choicecard = (name) => ({
//   type: CHOICECARD,
//   card: name,
// });

const initialState = {
  choosecards: [
    { name: "h-bone", choice: false, recommend: true },
    { name: "h-brain", choice: false, recommend: false },
    { name: "h-diabetes", choice: false, recommend: false },
    { name: "h-eyes", choice: false, recommend: false },
    { name: "h-growth", choice: false, recommend: false },
    { name: "h-heart", choice: false, recommend: true },
    { name: "h-intestine", choice: false, recommend: false },
    { name: "h-kidney", choice: false, recommend: false },
    { name: "h-liver", choice: false, recommend: true },
    { name: "h-obesity", choice: false, recommend: false },
    { name: "h-respirator", choice: false, recommend: false },
    { name: "h-skin", choice: false, recommend: false },
    { name: "h-tooth", choice: false, recommend: false },
    { name: "h-tumor", choice: false, recommend: false },
    { name: "h-urinary", choice: false, recommend: false },
  ],
  mySurveyList: { health: "입력사항없음" },
};

const recommendFit = handleActions(
  {
    // [CHOICECARD]: (state, { payload: card }) => ({
    //   choosecards: state.choosecards.concat(card),
    // }),

    [CHOICECARD]: (state, { payload: name }) =>
      produce(state, (draft) => {
        const index = draft.choosecards.findIndex((item) => item.name === name);
        draft.choosecards[index].choice = !state.choosecards[index].choice;
        console.log(name, index);
      }),
    [RESPONSESURVEY]: (state, { payload: surveylist }) => {
      produce(state, (draft) => {
        // surveylist.map((item) => item.question.map((q) => console.log(q)));
        draft.mySurveyList = surveylist;
        surveylist.map((item) => console.log(item));

        console.log("반짝반짝빛나는 벼ㅑㄹ", surveylist);
        // draft.responseSurvey = surveylist
      });
    },
  },
  initialState
);

// function recommendfit(state = initialState, action) {
//   switch (action.type) {
//     case CHOICECARD:
//       return {
//         choosecards: state.choosecards.concat(action.card),
//       };
//     default:
//       return state;
//   }
// }

export default recommendFit;
