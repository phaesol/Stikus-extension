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
            return Object.assign({}, state, {
                playList: playList,
                petPlaySelectedMusicFlag: false
            });

        case SET_PLAY_SELECTED_MUSIC_FLAG:
            // console.log(action.payload)
            const { bool } = action.payload;
            return Object.assign({}, state, {
                petPlaySelectedMusicFlag: bool
            });
            return;
            
        default:
            return state;
    }
}


