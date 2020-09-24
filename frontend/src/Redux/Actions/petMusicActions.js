import {
    SET_PLAYLIST,
} from '../Types';

export const setPetPlayList = playList => {
    console.log("action에 들어온 playList", {playList})
    return {
        type: SET_PLAYLIST,
        payload: { playList }
    }
}
