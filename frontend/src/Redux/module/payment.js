import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

const MAKEHISTORY = "payment/MAKEHISTORY";
const CHANGEOPTIONAL = "payment/CHANGEOPTIONAL";
const SETHISTORY = "payment/SETHISTORY";
export const makeHistory = createAction(MAKEHISTORY, (data) => data);
export const changeOptional = createAction(CHANGEOPTIONAL, (type, data) => ({
  type,
  data,
}));
export const setHistory = createAction(SETHISTORY, (data) => data);
const initialState = {
  final_order_list: null,
  history_list: false,
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
    [SETHISTORY]: (state, { payload: data }) =>
      produce(state, (draft) => {
        console.log("썩을", data);
        const temp_obj = {
          기능성원료: {},
          비타민: {},
          미네랄: {},
          추가급여: {},
        };
        data.map(
          (item) =>
            (temp_obj[item.nutrient.category][
              item.nutrient.name
            ] = Object.assign(item.nutrient, {
              cnt: item.cnt,
            }))
        );
        draft.history_list = temp_obj;
      }),
  },
  initialState
);
export default payment;
