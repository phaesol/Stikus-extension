import {
    SET_PLAYLIST,
} from '../Types';

const initialState = {
    petPlayList: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_PLAYLIST:
            const { playList } = action.payload;
            console.log("들어온 playList: ", playList)
            // console.log(state)
            return {
                playList
            }
        default:
            return state;
    }
}

