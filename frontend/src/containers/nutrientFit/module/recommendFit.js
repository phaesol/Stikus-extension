const CHOICECARD = "recommendFit/CHOICECARD";

export const choicecard = (name) => ({
  type: CHOICECARD,
  card: name,
});

const initialState = {
  choosecards: [],
};

function recommendfit(state = initialState, action) {
  switch (action.type) {
    case CHOICECARD:
      return {
        choosecards: state.choosecards.concat(action.card),
      };
    default:
      return state;
  }
}

export default recommendfit;
