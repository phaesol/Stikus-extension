import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

const MAKEHISTORY = "payment/MAKEHISTORY";
const CHANGEOPTIONAL = "payment/CHANGEOPTIONAL";
const SETHISTORY = "payment/SETHISTORY";
const SETFLAG = "payment/SETFLAG";

export const makeHistory = createAction(MAKEHISTORY, (data) => data);
export const changeOptional = createAction(CHANGEOPTIONAL, (type, data) => ({
  type,
  data,
}));
export const setHistory = createAction(SETHISTORY, (data) => data);
export const setFlag = createAction(SETFLAG, (type) => type);
const initialState = {
  final_order_list: null,
  history_list: false,
  selfMakeFlag: false,
  recomMakeFlag: false,
};

const payment = handleActions(
  {
    [MAKEHISTORY]: (state, { payload: data }) =>
      produce(state, (draft) => {
        draft.final_order_list = data;
      }),
    [CHANGEOPTIONAL]: (state, { payload: { type, data } }) =>
      produce(state, (draft) => {
        // console.log(type, "에에", data);
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
        // console.log("썩을", data);
        const temp_obj = {
          기능성원료: {},
          비타민: {},
          미네랄: {},
          추가급여: {},
          배합용파우더: {},
        };
        let total_weight = 0;
        data.map((item) => {
          temp_obj[item.nutrient.category][item.nutrient.name] = Object.assign(
            item.nutrient,
            {
              cnt: item.cnt,
            }
          );
          total_weight =
            total_weight + item.nutrient.standard_amount * item.cnt;
        });

        console.log(total_weight, "토탈웨이트");
        draft.history_list = temp_obj;
      }),
    [SETFLAG]: (state, { payload: type }) =>
      produce(state, (draft) => {
        if (type === "recom") {
          draft.selfMakeFlag = false;
          draft.recomMakeFlag = true;
        }
        if (type === "self") {
          draft.selfMakeFlag = true;
          draft.recomMakeFlag = false;
        }
        if (type === "none") {
          draft.selfMakeFlag = false;
          draft.recomMakeFlag = false;
          draft.history_list = false;
        }
      }),
  },
  initialState
);
export default payment;
