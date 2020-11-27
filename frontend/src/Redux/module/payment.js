import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

const MAKEHISTORY = "payment/MAKEHISTORY";
export const makeHistory = createAction(MAKEHISTORY, (data) => data);

const initialState = {};

const payment = handleActions(
  {
    [MAKEHISTORY]: (state, { payload: data }) =>
      produce(state, (draft) => {
        console.log(`{
  기능성원료: {
    보스웰리아: {
      cnt: 1;
      health_related: [("tumor", "bone", "skin")];
      health_score: [(27, 26, 25)];
      product_code: null;
      slug: "voswellia";
      target_category_id: 239;
      target_id: null;
    }
    스피루리나: {
      cnt: 1;
      health_related: [("tumor", "bone", "skin")];
      health_score: [(27, 26, 25)];
      product_code: null;
      slug: "voswellia";
      target_category_id: 239;
      target_id: null;
    }
  }

  비타민: {
    비타민E: {
       cnt: 1;
      health_related: [("tumor", "bone", "skin")];
      health_score: [(27, 26, 25)];
      product_code: null;
      slug: "voswellia";
      target_category_id: 239;
      target_id: null;
    }
    비타민A: {
      cnt: 1;
      health_related: [("tumor", "bone", "skin")];
      health_score: [(27, 26, 25)];
      product_code: null;
      slug: "voswellia";
      target_category_id: 239;
      target_id: null;
    }
  }
}
`);
      }),
  },
  initialState
);
export default payment;
