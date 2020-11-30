import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

const SETDATA = "resultMaterial/SETDATA";
const FINALORDERREMOVE = "resultMaterial/FINALORDERREMOVE";
export const setData = createAction(SETDATA, (weight, data) => ({
  weight,
  data,
}));
export const finalOrderRemove = createAction(FINALORDERREMOVE, (data) => data);

const initialState = {
  materialList: {},
  remove_duplicate_material: {},
  healthReport: {},
};

const resultMaterial = handleActions(
  {
    [SETDATA]: (state, { payload: { weight, data } }) =>
      produce(state, (draft) => {
        const temp_obj = {
          기능성원료: [],
          비타민: [],
          미네랄: [],
          추가급여: [],
        };
        const temp_obj2 = {
          기능성원료: {},
          비타민: {},
          미네랄: {},
          추가급여: {},
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
          temp_obj[item.category].push(item.nutrient);
        });
        data.map((item) => {
          if (temp_obj2[item.nutrient.category][item.nutrient.name]) {
          } else {
            if (item.nutrient.category === "추가급여") {
              if (item.nutrient.name === "유산균") {
                temp_obj2[item.nutrient.category][item.nutrient.name] = {
                  ...item.nutrient,
                  cnt:
                    parseFloat(item.nutrient.recommend_amount) *
                    (parseInt(weight / 5) + 1), //5단위씩으로 끊었을때 20kg이 되는 아이는 weight가 5로 넘어올 예정이므로 5로 나눈다음에 +1을 하여서 권장량을 구해준다.
                  //그러면 2배로 표기가 된다. 물론 이때 40kg짜리는 생각을 해봐야하는데..
                  cnt: 0,
                };
              }
              if (item.nutrient.name === "오메가3") {
                temp_obj2[item.nutrient.category][item.nutrient.name] = {
                  ...item.nutrient,
                  recommend_amount:
                    parseFloat(item.nutrient.recommend_amount) * weight,
                  cnt: 0,
                };
              }
            } else {
              temp_obj2[item.nutrient.category][item.nutrient.name] = {
                ...item.nutrient,
                recommend_amount:
                  parseFloat(item.nutrient.recommend_amount) * weight,
                cnt: 1,
              };
            }
          }
        });
        draft.materialList = temp_obj;
        draft.remove_duplicate_material = temp_obj2;
        console.log(data);
        data.map((item) => {
          console.log(item);
          if (item.related_question in draft.healthReport) {
            item.recom_nutrient.split(",").map((nu) => {
              if (
                draft.healthReport[item.related_question][0].indexOf(
                  nu.trim()
                ) === -1
              ) {
                draft.healthReport[item.related_question][0].push(nu.trim());
              }
            });

            item.optional_nutrient.split(",").map((nu) => {
              if (
                draft.healthReport[item.related_question][1].indexOf(
                  nu.trim()
                ) === -1
              ) {
                draft.healthReport[item.related_question][1].push(nu.trim());
              }
            });
          } else {
            draft.healthReport = {
              ...draft.healthReport,
              [item.related_question]: [
                item.recom_nutrient.split(",").map((item) => item.trim()),
                item.optional_nutrient.split(",").map((item) => item.trim()),
                item.health_report,
              ],
            };
          }
        });
        // console.log(temp_obj, "@!@#!@#@!#!@#!@#@!");

        // console.log(temp_obj2, "^&*^&*^&*^*^&*^&*^&*^&*");
      }),
    [FINALORDERREMOVE]: (state, { payload: data }) =>
      produce(state, (draft) => {
        delete draft.remove_duplicate_material[data.category][data.name];
      }),
  },
  initialState
);
export default resultMaterial;
