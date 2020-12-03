import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
const CHOICECARD = "recommendFit/CHOICECARD";
const RESPONSESURVEY = "recommendFit/RESPONSESURVEY";
const CHECKSURVEY = "recommendFit/CHECKSURVEY";
const GETRECOMCARD = "recommendFit/GETRECOMCARD";
export const choicecard = createAction(CHOICECARD, (name) => name);
export const responseSurvey = createAction(
  RESPONSESURVEY,
  (surveylist) => surveylist
);
export const checkSurvey = createAction(CHECKSURVEY, (id) => id);
export const getRecomCard = createAction(GETRECOMCARD, (health) => health);

// export const choicecard = (name) => ({
//   type: CHOICECARD,
//   card: name,
// });

const initialState = {
  choosecards: [
    {
      name: "h-bone",
      kor_name: "관절/뼈",
      choice: false,
      recommend: false,
    },
    { name: "h-brain", kor_name: "뇌건강", choice: false, recommend: false },
    {
      name: "h-diabetes",
      kor_name: "당뇨",
      choice: false,
      recommend: false,
    },
    {
      name: "h-eyes",
      kor_name: "눈(눈물)",
      choice: false,
      recommend: false,
    },
    {
      name: "h-growth",
      kor_name: "칼슘 인 결핍",
      choice: false,
      recommend: false,
    },
    {
      name: "h-heart",
      kor_name: "심장",
      choice: false,
      recommend: false,
    },
    {
      name: "h-intestine",
      kor_name: "장(췌장)",
      choice: false,
      recommend: false,
    },
    {
      name: "h-kidney",
      kor_name: "신장",
      choice: false,
      recommend: false,
    },
    {
      name: "h-liver",
      kor_name: "간(담낭)",
      choice: false,
      recommend: false,
    },
    {
      name: "h-obesity",
      kor_name: "비만",
      choice: false,
      recommend: false,
    },
    {
      name: "h-respirator",
      kor_name: "호흡기",
      choice: false,
      recommend: false,
    },
    {
      name: "h-skin",
      kor_name: "피부",
      choice: false,
      recommend: false,
    },
    {
      name: "h-tooth",
      kor_name: "치아",
      choice: false,
      recommend: false,
    },
    {
      name: "h-tumor",
      kor_name: "종양",
      choice: false,
      recommend: false,
    },
    {
      name: "h-urinary",
      kor_name: "비뇨기",
      choice: false,
      recommend: false,
    },
  ],
  mySurveyList: [],
};

const recommendFit = handleActions(
  {
    // [CHOICECARD]: (state, { payload: card }) => ({
    //   choosecards: state.choosecards.concat(card),
    // }),

    [CHOICECARD]: (state, { payload: name }) =>
      produce(state, (draft) => {
        const index = draft.choosecards.findIndex((item) => item.name === name);
        draft.choosecards[index].choice = !state.choosecards[index].choice;
        console.log(name, index);
      }),
    [RESPONSESURVEY]: (state, { payload: surveylist }) =>
      produce(state, (draft) => {
        // surveylist.map((item) => item.question.map((q) => console.log(q)));

        draft.mySurveyList = surveylist.filter(
          (item) =>
            item.question[0].content !== null && item.question[0].content !== ""
        );

        console.log("반짝반짝빛나는 벼ㅑㄹ", surveylist);
        // draft.responseSurvey = surveylist
      }),
    [CHECKSURVEY]: (state, { payload: id }) =>
      produce(state, (draft) => {
        draft.mySurveyList.map((item) =>
          item.question.map((q) =>
            q.survey_question_pk === id ? (q.state = !q.state) : q
          )
        );
        // console.log(health, id);
      }),
    [GETRECOMCARD]: (state, { payload: health }) =>
      produce(state, (draft) => {
        console.log(health, "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        // console.log(health, id);
        health[1].map((item) =>
          draft.choosecards.map((card) => {
            if (card.kor_name === item) {
              card.recommend = true;
            }
          })
        );
      }),
  },
  initialState
);

// function recommendfit(state = initialState, action) {
//   switch (action.type) {
//     case CHOICECARD:
//       return {
//         choosecards: state.choosecards.concat(action.card),
//       };
//     default:
//       return state;
//   }
// }

export default recommendFit;
