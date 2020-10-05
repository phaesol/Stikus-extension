import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
const CHOICECARD = "selfMake/CHOICECARD";

export const choicecard = createAction(CHOICECARD, (name) => name);

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
};

const selfMake = handleActions(
  {
    [CHOICECARD]: (state, { payload: name }) =>
      produce(state, (draft) => {
        const index = draft.choosecards.findIndex((item) => item.name === name);
        draft.choosecards[index].choice = !state.choosecards[index].choice;
        console.log(name, index);
      }),
  },
  initialState
);

export default selfMake;
