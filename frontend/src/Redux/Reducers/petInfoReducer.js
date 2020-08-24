import {
    SET_PET_OWNER,
    SET_PET_NAME,
    SET_PET_AGE,
    SET_PET_WEIGHT,
    SET_PET_IMAGE
} from '../Types';

const initialState = {
    // owner: "",
    // age
    pet_name: "",
    // age1: "0",
    // age2: "0",
    // weight1: "0",
    // weight2: "0",
}


// pet 정보를 관리하는 reducer!
export default function (state = initialState, action) {
    switch (action.type) {
        case SET_PET_OWNER:
            return { ...state, owner: action.payload };
        case SET_PET_NAME:
            
            return { ...state, pet_name: action.payload};
        
        case SET_PET_AGE:
            return { ...state, };
        
        case SET_PET_WEIGHT:
            return { ...state, };
        
        case SET_PET_IMAGE:
            return { ...state, };
        
        default:
            return state;
    }
}