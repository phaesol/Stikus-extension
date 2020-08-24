import {
    SET_PET_OWNER,
    SET_PET_NAME,
    SET_PET_AGE,
    SET_PET_WEIGHT,
    SET_PET_IMAGE
} from '../Types';

// petInfo를 다루는 action들!

const setPetName = (name) => {
    return {
        type: SET_PET_NAME,
        payload: name
    }
}

const setPetAge = (age) => {
    return {
        type: SET_PET_AGE,
    }
}
const setPetWeight = (weight) => {
    return {
        type: SET_PET_WEIGHT,
    }
}
const setPetImage = (image) => {
    dispatchEvent({
        type: SET_PET_IMAGE,
    })
}

export const actionCreators = {
    setPetName, 
    setPetAge, 
    setPetWeight, 
    setPetImage
}


// 이걸 이렇게 하지말고, 아예 다 한번에 묶어서 저장해버립시당!