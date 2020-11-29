import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

const MAKEHISTORY = "payment/MAKEHISTORY";
const CHANGEOPTIONAL = "payment/CHANGEOPTIONAL";
export const makeHistory = createAction(MAKEHISTORY, (data) => data);
export const changeOptional = createAction(CHANGEOPTIONAL, (type, data) => ({
  type,
  data,
}));
const initialState = {
  final_order_list: null,
};

const payment = handleActions(
  {
    [MAKEHISTORY]: (state, { payload: data }) =>
      produce(state, (draft) => {
        draft.final_order_list = data;
      }),
    [CHANGEOPTIONAL]: (state, { payload: { type, data } }) =>
      produce(state, (draft) => {
        console.log(type, "에에", data);
        if (type === "increase") {
          draft.final_order_list["추가급여"][data].cnt =
            draft.final_order_list["추가급여"][data].cnt + 1;
        }
        if (
          type === "decrease" &&
          draft.final_order_list["추가급여"][data].cnt > 0
        ) {
          draft.final_order_list["추가급여"][data].cnt =
            draft.final_order_list["추가급여"][data].cnt - 1;
        }
      }),
  },
  initialState
);
export default payment;
