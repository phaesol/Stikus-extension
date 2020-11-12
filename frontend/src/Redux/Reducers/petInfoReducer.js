import {
    SET_PET_INFO,
    SET_PET_IMAGE,
    SET_PET_ID,
    // SET_PET_NAME,
    // SET_PET_AGE,
    // SET_PET_WEIGHT,
    // SET_PET_IMAGE
} from '../Types';

const initialState = {
    id: "",
    owner: "", 
    name: "",
    age: "0",
    weight: "0",
    body_format: "",
    kind: "",
    activity: "",
    breed: "",
    sex: "",
    neutralization: "",
    image: "", // image는 backend에 보낸후, src를 받아야하겠져?
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_PET_ID:
            const { id } = action.payload;
            return {
                ...state,
                id: id
            }
        case SET_PET_INFO:
            const { owner, name, age, weight, body_format, kind, activity, breed, sex, neutralization } = action.payload;
            return { 
                ...state,
                owner: owner, 
                name: name, 
                age: age, 
                weight: weight,
                body_format: body_format,
                kind: kind, 
                activity: activity, 
                breed: activity,
                sex: sex,
                neutralization: neutralization 
            };
        case SET_PET_IMAGE:
            const { image } = action.payload
            return {
                ...state,
                image: image
            }
        default:
            return state;
    }
}


// pet 정보를 관리하는 reducer!
// export default function (state = initialState, action) {
//     switch (action.type) {
//         case SET_PET_OWNER:
//             return { ...state, owner: action.payload };
//         case SET_PET_NAME:
            
//             return { ...state, pet_name: action.payload};
        
//         case SET_PET_AGE:
//             return { ...state, };
        
//         case SET_PET_WEIGHT:
//             return { ...state, };
        
//         case SET_PET_IMAGE:
//             return { ...state, };
        
//         default:
//             return state;
//     }
// }