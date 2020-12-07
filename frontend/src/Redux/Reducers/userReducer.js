import {
    SET_USER
} from '../Types';

const initialState = {
    memberId: 'gt0305',
    memberName: '김태훈'
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


