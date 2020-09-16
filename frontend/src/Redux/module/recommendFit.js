import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
const CHOICECARD = "recommendFit/CHOICECARD";

export const choicecard = createAction(CHOICECARD, (name) => ({
  card: name,
}));

// export const choicecard = (name) => ({
//   type: CHOICECARD,
//   card: name,
// });

const initialState = {
  choosecards: [],
};

const recommendFit = handleActions(
  {
    // [CHOICECARD]: (state, { payload: card }) => ({
    //   choosecards: state.choosecards.concat(card),
    // }),
    [CHOICECARD]: (state, { payload: card }) =>
      produce(state, (draft) => {
        draft.choosecards.push(card);
      }),
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
