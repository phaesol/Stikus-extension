import {
    SET_USER
} from '../Types';

export const setUserAction = userInfo => {
    return {
        type: SET_USER,
        payload: { userInfo }
    }
}