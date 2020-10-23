import {
    SET_PLAYLIST,
    SET_PLAY_SELECTED_MUSIC_FLAG,
} from '../Types';

const initialState = {
    petPlayList: [],
    petPlaySelectedMusicFlag : false,
    currentSelected : 0,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_PLAYLIST:
            const { playList } = action.payload;
            return Object.assign({}, state, {
                playList: playList,
                petPlaySelectedMusicFlag: false,
                currentSelected: 0
            });

        case SET_PLAY_SELECTED_MUSIC_FLAG:
            const { bool, number } = action.payload;
            return Object.assign({}, state, {
                petPlaySelectedMusicFlag: bool,
                currentSelected: number
            });
            
        default:
            return state;
    }
}


