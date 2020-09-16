import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
const CHOICECARD = "recommendFit/CHOICECARD";

export const choicecard = createAction(CHOICECARD, (name) => name);

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

    [CHOICECARD]: (state, { payload: name }) =>
      produce(state, (draft) => {
        console.log(
          "이거는 카드가 어레이 안에 있는지 체큰ㄴ",
          draft.choosecards.indexOf(name)
        );

        if (draft.choosecards.indexOf(name) !== -1) {
          const index = draft.choosecards.indexOf(name);
          // draft.choosecards.findIndex((item) => item === name);
          //findIndex랑 indexOf랑의 차이를 한번 찾아서 적용해보자
          console.log("들어오니까");
          draft.choosecards.splice(index, 1);
        } else {
          draft.choosecards.push(name);
        }
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
