import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
const PICKMATERIAL = "selfMake/PICKCARD";
const GETNUTRIENT = "selfMake/GETNUTRIENT";
const FINALORDER = "selfMake/FINALORDER";
const FINALORDEREDIT = "selfMake/FINALORDEREDIT";
const FINALORDERREMOVE = "selfMake/FINALORDERREMOVE";
const CHECKFIT = "selfMAke/CHECKFIT";
export const pickMaterial = createAction(PICKMATERIAL, (health, materials) => ({
  health,
  materials,
}));
export const getNutrient = createAction(GETNUTRIENT, (data) => data);
export const finalOrder = createAction(FINALORDER, (data) => data);
export const finalOrderEdit = createAction(FINALORDEREDIT, (data) => data);
export const finalOrderRemove = createAction(FINALORDERREMOVE, (data) => data);
export const checkfit = createAction(CHECKFIT, (survey, kidney) => ({
  survey,
  kidney,
}));
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
  health_nutrient: [],
  all_nutrient: {},
  // pick_cards: {},
  // order_nutrient: {}, 얘는 안쓰는것 같은데

  final_order_nutrient: {},
  caution_nutrient: [],
};

// Object.assign 이용해서 할당하는 부분과 더불어서 자료구조에 대해서 다시 생각해봐야함
const selfMake = handleActions(
  {
    [PICKMATERIAL]: (state, { payload: { health, materials } }) =>
      produce(state, (draft) => {
        console.log(health, materials);
        if (health === "all-material") {
          console.log("원료 전체에서 처리");

          // 아래는 all_nutrient에서의 choice값을 반전시켜주기 위함.
          draft.all_nutrient[materials.category][materials.name].choice = !state
            .all_nutrient[materials.category][materials.name].choice;

          draft.health_nutrient.map((item) =>
            item.nutrient_set.map((mat) => {
              if (mat.name === materials.name) {
                // 각 건강별 choice값도 토글로 바꾸고
                mat.choice = !mat.choice;
              }
            })
          );
          // 만약 선택됐으면 cnt 값을 ++ 해주고 아니ㅐ면 -- 해주자
          if (
            draft.all_nutrient[materials.category][materials.name].choice ===
            true
          ) {
            draft.all_nutrient[materials.category][materials.name].cnt++;
          } else {
            draft.all_nutrient[materials.category][materials.name].cnt--;
          }
        } else if (health === "remove-material") {
          console.log("다지울꺼에요");

          draft.all_nutrient[materials.category][materials.name].choice = false;
          draft.all_nutrient[materials.category][materials.name].cnt = 0;

          draft.health_nutrient.map((item) =>
            item.nutrient_set.map((item) => {
              if (item.name === materials.name) {
                item.choice = false;
                item.cnt = 0;
              }
            })
          );

          console.log(materials);
        } else {
          // 이부분이 개별 card에서
          let flag = true;
          console.log("헬스", health);

          draft.health_nutrient.map((item) =>
            item.nutrient_set.map((item) => {
              if (item.name === materials.name) {
                // 각 건강별 choice값도 토글로 바꾸고
                item.choice = !item.choice;
                console.log("~~~~~~~~~~~~", item.name);
                if (flag) {
                  flag = false;
                  if (item.choice === true) {
                    draft.all_nutrient[materials.category][materials.name]
                      .cnt++;
                  } else {
                    draft.all_nutrient[materials.category][materials.name]
                      .cnt--;
                  }
                  draft.all_nutrient[materials.category][
                    materials.name
                  ].choice = !state.all_nutrient[materials.category][
                    materials.name
                  ].choice;
                }

                // 전체 원표보기 카드의 choice값돟 토글로 바꿈

                // if (item.choice === true) {
                //   draft.order_nutrient[materials.category][materials.name]
                //     .cnt++;
                //   draft.order_nutrient[materials.category][
                //     materials.name
                //   ].choice = true;
                // } else {
                //   draft.order_nutrient[materials.category][materials.name]
                //     .cnt--;
                //   if (
                //     draft.order_nutrient[materials.category][materials.name]
                //       .cnt === 0
                //   ) {
                //     draft.order_nutrient[materials.category][
                //       materials.name
                //     ].choice = false;
                //   }
                // }
              }
            })
          );
        }
        //   draft.all_nutrient[materials.category][materials.name].choice = !state
        //     .all_nutrient[materials.category][materials.name].choice;

        //   // 만약 선택됐으면 cnt 값을 ++ 해주고 아니ㅐ면 -- 해주자
        //   if (
        //     draft.all_nutrient[materials.category][materials.name].choice ===
        //     true
        //   ) {
        //     draft.all_nutrient[materials.category][materials.name].cnt++;
        //   } else {
        //     draft.order_nutrient[materials.category][materials.name].cnt--;
        //   }
        // }

        // if (state.pick_cards[health] === undefined) {
        //   draft.pick_cards[health] = [materials];
        // } else {
        //   const materialInHealth = state.pick_cards[health].findIndex(
        //     (item) => item.name === materials.name
        //   );
        //   if (materialInHealth !== -1) {
        //     draft.pick_cards[health].splice(materialInHealth, 1);
        //   } else {
        //     draft.pick_cards[health].push(materials);
        //   }
        // }
        // console.log("Hello!!!", health, materials);
      }),
    [GETNUTRIENT]: (state, { payload: data }) =>
      produce(state, (draft) => {
        draft.final_order_nutrient = {};
        data.map((health) =>
          health.nutrient_set.map((material) =>
            Object.assign(material, { choice: false })
          )
        );

        draft.health_nutrient = data;
        const temp_obj = {
          기능성원료: {},
          비타민: {},
          미네랄: {},
          추가급여: {},
        };

        data.map((item) =>
          item.nutrient_set.map((nutr) => {
            // console.log("???????????", nutr);
            // 원래 전체 영양소에서는 추가급여가 없어서 뺐는데

            temp_obj[nutr.category][nutr.name] = Object.assign(nutr, {
              choice: false,
              cnt: 0,
            });
          })
        );

        draft.all_nutrient = temp_obj;
        console.log("이건확인해봐야지", temp_obj);
      }),
    [FINALORDER]: (state, { payload: data }) =>
      produce(state, (draft) => {
        // let test_obj = {};
        Object.keys(state.all_nutrient).map((key) => {
          Object.keys(state.all_nutrient[key]).map((item) => {
            if (state.all_nutrient[key][item].cnt !== 0) {
              draft.final_order_nutrient = {
                ...draft.final_order_nutrient,
                [key]: {
                  ...draft.final_order_nutrient[key],
                  [item]: state.all_nutrient[key][item],
                },
              };
            }
          });
        });
        console.log(
          "결과물 받아보세요ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ",
          draft.final_order_nutrient
        );
      }),
    [FINALORDEREDIT]: (state, { payload: data }) =>
      produce(state, (draft) => {
        draft.final_order_nutrient[data.category][data.name].cnt = data.cnt;
        console.log("======", state.final_order_nutrient);
        console.log(data);
      }),
    [FINALORDERREMOVE]: (state, { payload: data }) =>
      produce(state, (draft) => {
        console.log("야야야야", state.final_order_nutrient);
        console.log("우오오오", data);
        delete draft.final_order_nutrient[data.category][data.name];
      }),
    [CHECKFIT]: (state, { payload: { survey, kidney } }) =>
      produce(state, (draft) => {
        console.log(survey, kidney, "!@#!@#!@#!@#!@#!@#!@#");
        draft.caution_nutrient = [];
        survey.map((item) => {
          if (item.state) {
            switch (item.id) {
              case 1:
                Object.keys(state.final_order_nutrient).map((cate) =>
                  Object.keys(state.final_order_nutrient[cate]).map((mate) => {
                    if (
                      state.final_order_nutrient[cate][mate].name === "비타민A"
                    ) {
                      if (!draft.caution_nutrient.includes("비타민A")) {
                        console.log("1번케이스 비타A");
                        draft.caution_nutrient.push("비타민A");
                      }
                    }
                  })
                );
                // 임신은 비타민 A가 있으면 안댐
                break;
              //  Object.keys(state.final_order_nutrient).map((cate) =>
              //           Object.keys(state.final_order_nutrient[cate]).map((mate) => {
              //             console.log(state.final_order_nutrient[cate][mate].name);
              //                 if (!draft.caution_nutrient.includes("비타민A")) {
              //                   draft.caution_nutrient.push("비타민A");
              //                   console.log("2번케이스 비타A");
              //                 }
              //                 if (!draft.caution_nutrient.includes("비타민D")) {
              //                   draft.caution_nutrient.push("비타민D");
              //                   console.log("2번케이스 비타D");
              //                 }
              //                 if (
              //                   !draft.caution_nutrient.includes("인산칼슘(칼슘+인)")
              //                 ) {
              //                   draft.caution_nutrient.push("인산칼슘(칼슘+인)");
              //                   console.log("2번케잇그 인산칼슘");
              //                 }
              case 2:
                kidney[0].question.map((subsurvey) => {
                  console.log(subsurvey, "+++++++++++++++++++++++++++++");
                  if (
                    subsurvey.state === true &&
                    subsurvey.survey_question === 27
                  ) {
                    Object.keys(state.final_order_nutrient).map((cate) =>
                      Object.keys(state.final_order_nutrient[cate]).map(
                        (mate) => {
                          if (
                            state.final_order_nutrient[cate][mate].name ===
                            "비타민A"
                          ) {
                            if (!draft.caution_nutrient.includes("비타민A")) {
                              draft.caution_nutrient.push("비타민A");
                            }
                          }
                          if (
                            state.final_order_nutrient[cate][mate].name ===
                            "비타민A"
                          ) {
                            if (!draft.caution_nutrient.includes("비타민D")) {
                              draft.caution_nutrient.push("비타민D");
                            }
                          }
                          if (
                            state.final_order_nutrient[cate][mate].name ===
                            "비타민A"
                          ) {
                            if (
                              !draft.caution_nutrient.includes(
                                "인산칼슘(칼슘+인)"
                              )
                            ) {
                              draft.caution_nutrient.push("인산칼슘(칼슘+인)");
                            }
                          }
                        }
                      )
                    );
                  }
                  if (
                    subsurvey.state === true &&
                    subsurvey.survey_question === 30
                  ) {
                    Object.keys(state.final_order_nutrient).map((cate) =>
                      Object.keys(state.final_order_nutrient[cate]).map(
                        (mate) => {
                          if (
                            state.final_order_nutrient[cate][mate].name ===
                            "비타민A"
                          ) {
                            if (!draft.caution_nutrient.includes("비타민C")) {
                              draft.caution_nutrient.push("비타민C");
                            }
                          }
                        }
                      )
                    );
                  }
                });

                console.log("신장질환도 조심. 조심해야해요");
                // 신장-1번은 비타민A, D , 인산칼슘있으면 27
                // 신장-4번은 비타민 C가있으면 안댐 30
                break;
              case 3:
                Object.keys(state.final_order_nutrient).map((cate) =>
                  Object.keys(state.final_order_nutrient[cate]).map((mate) => {
                    if (
                      state.final_order_nutrient[cate][mate].name === "비타민C"
                    ) {
                      if (!draft.caution_nutrient.includes("비타민C")) {
                        draft.caution_nutrient.push("비타민C");
                        console.log("3번케이스 비타c");
                      }
                    }
                  })
                );
                console.log("결석도 조심");
                // 비타민 C가 있으면 안댐
                break;
            }
          }
        });
      }),
  },

  initialState
);

export default selfMake;
