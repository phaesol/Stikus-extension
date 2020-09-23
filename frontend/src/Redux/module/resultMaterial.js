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
        const temp_obj = {
          기능성원료: [],
          비타민: [],
          미네랄: [],
          추가급여: [],
        };

        // const temp_obj = [
        //   { name: "기능성원료", ele: [] },
        //   { name: "비타민", ele: [] },
        //   { name: "미네랄", ele: [] },
        //   { name: "추가급여", ele: [] },
        // ];

        // 위와 같은 자료구조를 써야하는 경우는 object의 경우 map을 사용할수 없기떄문에 자료구조를 조금 바꾼 case이다
        // 쓸려면 object의 key를 들고와서 써야한다.
        data.map((item) => {
          temp_obj[item.category].push(item);
        });
        draft.materialList = temp_obj;
      }),
  },
  initialState
);
export default resultMaterial;
