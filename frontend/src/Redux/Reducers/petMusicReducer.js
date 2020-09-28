import {
    SET_PLAYLIST,

    SET_PLAY_SELECTED_MUSIC_FLAG,
} from '../Types';

const initialState = {
    petPlayList: [],
    petPlaySelectedMusicFlag : false,
}

export default function (state = initialState, action) {
    console.log(action)
    switch (action.type) {
        case SET_PLAYLIST:
            const { playList } = action.payload;
            console.log("들어온 playList: ", playList)
            // console.log(state)
            return {
                playList
            }

        case SET_PLAY_SELECTED_MUSIC_FLAG:
            return true

        default:
            return state;
    }
}


