import {
    SET_USER
} from '../Types';

const initialState = {
    memberId: '',
    memberName: ''
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            const { memberId, memberName } = action.payload.userInfo;
            return {
                ...state,
                memberId: memberId,
                memberName: memberName
            }
            
        default:
            return state;
    }
}


