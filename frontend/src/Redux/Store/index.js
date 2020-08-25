import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../Reducers'

// thunk 일단 빼자!
// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// const middleware = [thunk];

const initialState = {};

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools()
);

export default store;