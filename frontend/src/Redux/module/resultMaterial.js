import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

const SETDATA = "resultMaterial/SETDATA";

export const setData = createAction(SETDATA, (data) => data);

const initialState = {
  materialList: [],
};

const resultMaterial = handleActions(
  {
    [SETDATA]: (state, { payload: data }) =>
      produce(state, (draft) => {
        draft.materialList = data;
      }),
  },
  initialState
);
export default resultMaterial;
