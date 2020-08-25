import {
    SET_PET_INFO
} from '../Types';

// petInfo를 다루는 action!

export const setPetInfo = (owner, name, age, weight, image) => {
    return {
        type: SET_PET_INFO,
        payload: { owner, name, age, weight, image }
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