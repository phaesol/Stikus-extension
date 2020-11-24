import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "../Reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "root",
  storage,
};

const enhancedReducer = persistReducer(persistConfig, rootReducer);

export default function configureStore() {
  // const store = createStore(enhancedReducer, composeWithDevTools());
  const store = createStore(rootReducer, composeWithDevTools());
  // const persistor = persistStore(store);
  // return { store, persistor };
  return { store };
}

// const store = createStore(
//     rootReducer,
//     initialState,
// );

// export default store;
