import {
    SET_PLAYLIST,
    
    SET_PLAY_SELECTED_MUSIC_FLAG,
} from '../Types';

export const setPetPlayList = playList => {
    console.log("action에 들어온 playList", {playList})
    return {
        type: SET_PLAYLIST,
        payload: { playList }
    }
}


export const setPlaySelectedMusicFlag = () => {
    return {
        type: SET_PLAY_SELECTED_MUSIC_FLAG,
    }
}