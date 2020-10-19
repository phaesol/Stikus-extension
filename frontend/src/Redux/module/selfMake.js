import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
const PICKMATERIAL = "selfMake/PICKCARD";
const GETNUTRIENT = "selfMake/GETNUTRIENT";
export const pickMaterial = createAction(PICKMATERIAL, (health, materials) => ({
  health,
  materials,
}));
export const getNutrient = createAction(GETNUTRIENT, (data) => data);
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
  pick_cards: {},
  order_nutrient: {},
};

// Object.assign 이용해서 할당하는 부분과 더불어서 자료구조에 대해서 다시 생각해봐야함
const selfMake = handleActions(
  {
    [PICKMATERIAL]: (state, { payload: { health, materials } }) =>
      produce(state, (draft) => {
        console.log(health, materials);
        if (health === "all-material") {
          console.log("원료 전체에서 처리");

          draft.all_nutrient[materials.category][materials.name].choice = !state
            .all_nutrient[materials.category][materials.name].choice;

          if (
            draft.all_nutrient[materials.category][materials.name].choice ===
            true
          ) {
            draft.order_nutrient[materials.category][materials.name].cnt++;
            draft.order_nutrient[materials.category][
              materials.name
            ].choice = true;
          } else {
            draft.order_nutrient[materials.category][materials.name].cnt--;
            if (
              draft.order_nutrient[materials.category][materials.name].cnt === 0
            ) {
              draft.order_nutrient[materials.category][
                materials.name
              ].choice = false;
            }
          }
        } else if (health === "remove-material") {
          console.log("다지울꺼에요");

          draft.all_nutrient[materials.category][materials.name].choice = false;
          draft.order_nutrient[materials.category][
            materials.name
          ].choice = false;

          draft.health_nutrient.map((item) =>
            item.nutrient_set.map((target) => {
              if (target.name === materials.name) {
                target.choice = false;
              }
            })
          );
          draft.order_nutrient[materials.category][materials.name].cnt = 0;
          console.log(materials);
        } else {
          draft.health_nutrient
            .filter((item) => item.slug === health)[0]
            .nutrient_set.map((item) => {
              if (item.name === materials.name) {
                item.choice = !item.choice;
                if (item.choice === true) {
                  draft.order_nutrient[materials.category][materials.name]
                    .cnt++;
                  draft.order_nutrient[materials.category][
                    materials.name
                  ].choice = true;
                } else {
                  draft.order_nutrient[materials.category][materials.name]
                    .cnt--;
                  if (
                    draft.order_nutrient[materials.category][materials.name]
                      .cnt === 0
                  ) {
                    draft.order_nutrient[materials.category][
                      materials.name
                    ].choice = false;
                  }
                }
              }
            });
        }

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
        data.map((health) =>
          health.nutrient_set.map((material) =>
            Object.assign(material, { choice: false })
          )
        );
        console.log("싸인받아준데", data);

        draft.health_nutrient = data;
        const temp_obj = {
          기능성원료: {},
          비타민: {},
          미네랄: {},
          추가급여: {},
        };
        console.log("왜 안돌아가냐 너희들");

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
        console.log("왜 안돌아가냐 너희들");

        draft.all_nutrient = temp_obj;
        draft.order_nutrient = temp_obj;
        console.log("왜 안돌아가냐 너희들");
      }),
  },
  initialState
);

export default selfMake;
