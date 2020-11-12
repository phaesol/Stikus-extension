import {
    SET_PET_ID,
    SET_PET_INFO,
    SET_PET_IMAGE
} from '../Types';

// petInfo를 다루는 action!
export const setPetID = id => {
    return {
        type: SET_PET_ID,
        payload: { id }
    }
}
export const setPetInfo = (owner, name, age, weight, body_format, kind, activity, breed, sex, neutralization) => {
    return {
        type: SET_PET_INFO,
        payload: { owner, name, age, weight, 
                   body_format, kind, activity, breed, sex, neutralization }
        }
}

export const setPetImage = image => {
    return {
        type: SET_PET_IMAGE,
        payload : { image }
    }
}

// const setPetAge = (age) => {
//     return {
//         type: SET_PET_AGE,
//     }
// }
// const setPetWeight = (weight) => {
//     return {
//         type: SET_PET_WEIGHT,
//     }
// }
// const setPetImage = (image) => {
//     dispatchEvent({
//         type: SET_PET_IMAGE,
//     })
// }

// export const actionCreators = {
//     setPetName, 
//     setPetAge, 
//     setPetWeight, 
//     setPetImage
// }


// 이걸 이렇게 하지말고, 아예 다 한번에 묶어서 저장해버립시당!