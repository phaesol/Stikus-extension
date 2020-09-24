import { combineReducers } from 'redux';
import petInfoReducer from './petInfoReducer';
import petMusicReducer from './petMusicReducer';

const rootReducer = combineReducers({
    petInfo: petInfoReducer,
    petMusic: petMusicReducer,
});

export default rootReducer;