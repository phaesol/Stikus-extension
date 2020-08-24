import { combineReducers } from 'redux';
import petInfoReducer from './petInfoReducer';

const rootReducer = combineReducers({
    petInfo: petInfoReducer,
});

export default rootReducer;