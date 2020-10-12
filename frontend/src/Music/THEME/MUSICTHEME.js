import MUSIC1 from '../Music/1.mp3';
import MUSIC2 from '../Music/1.mp3';
import MUSIC3 from '../Music/1.mp3';

import COVER1 from '../Cover/thema1.png';
import COVER2 from '../Cover/thema2.png';
import COVER3 from '../Cover/thema3.png';
import COVER4 from '../Cover/thema4.png';
import COVER5 from '../Cover/thema5.png';
import COVER6 from '../Cover/thema6.png';


// import { useFetchMusic } from '../../Hooks/useFetchMusic';
import { useFetchMusic } from '../../Hooks/useFetchMusic';

const S3_SOURCE = 'https://stikus-storage.s3.ap-northeast-2.amazonaws.com/'

// export const a = () => {

//     const musicData = useFetchMusic();
//     console.log(musicData)
// }





// const a = []
// a.push("sadasd")
// console.log(a)

export const MUSICTHEME1 = {
    info: {
        id: 1,
        name: "꿀잠이 필요해 zzz",
        coverImg: COVER1
    },

    music: [
        {
            index: 0,
            name: 'music1',
            cover: COVER1,
            musicSrc: S3_SOURCE+"bensound-deepblue.mp3",
            singer: "tedhoon"
        },
        {
            index: 1,
            name: 'music2',
            cover: COVER2,
            musicSrc: MUSIC2
        },
        {
            index: 2,
            name: 'music3',
            cover: COVER3,
            musicSrc: MUSIC3
        },
    ]
}


export const MUSICTHEME2 = {
    info: {
        id: 2,
        name: "혼자 있어 외로워요",
        coverImg: COVER2
    },

    music: [
        {
            index: 0,
            name: 'music1-2',
            cover: COVER1,
            musicSrc: MUSIC1
        },
        {
            index: 1,
            name: 'music2-2',
            cover: COVER2,
            musicSrc: MUSIC2
        },
        {
            index: 2,
            name: 'music3-2',
            cover: COVER3,
            musicSrc: MUSIC3
        },
    ]
}

export const MUSICTHEME3 = {
    info: {
        id: 3,
        name: "산책 못가 우울해요?",
        coverImg: COVER3
    },

    music: [
        {
            index: 0,
            name: 'music1-2',
            cover: COVER1,
            musicSrc: MUSIC1
        },
        {
            index: 1,
            name: 'music2-2',
            cover: COVER2,
            musicSrc: MUSIC2
        },
        {
            index: 2,
            name: 'music3-2',
            cover: COVER3,
            musicSrc: MUSIC3
        },
    ]
}
export const MUSICTHEME4 = {
    info: {
        id: 4,
        name: "IQ 관리는 지금부터",
        coverImg: COVER4
    },

    music: [
        {
            index: 0,
            name: 'music1-2',
            cover: COVER1,
            musicSrc: MUSIC1
        },
        {
            index: 1,
            name: 'music2-2',
            cover: COVER2,
            musicSrc: MUSIC2
        },
        {
            index: 2,
            name: 'music3-2',
            cover: COVER3,
            musicSrc: MUSIC3
        },
    ]
}
export const MUSICTHEME5 = {
    info: {
        id: 5,
        name: "간식 못 먹어 마음이 심란할 때",
        coverImg: COVER5
    },

    music: [
        {
            index: 0,
            name: 'music1-2',
            cover: COVER1,
            musicSrc: MUSIC1
        },
        {
            index: 1,
            name: 'music2-2',
            cover: COVER2,
            musicSrc: MUSIC2
        },
        {
            index: 2,
            name: 'music3-2',
            cover: COVER3,
            musicSrc: MUSIC3
        },
    ]
}


export const MUSICTHEME6 = {
    info: {
        id: 6,
        name: "몸과 마음, 힐링 중",
        coverImg: COVER6
    },

    music: [
        {
            index: 0,
            name: 'music6-1',
            cover: COVER1,
            musicSrc: MUSIC1
        },
        {
            index: 1,
            name: 'music6-2',
            cover: COVER2,
            musicSrc: MUSIC2
        },
        {
            index: 2,
            name: 'music6-3',
            cover: COVER3,
            musicSrc: MUSIC3
        },        {
            index: 3,
            name: 'music6-4',
            cover: COVER1,
            musicSrc: MUSIC1
        },
        {
            index: 4,
            name: 'music6-5',
            cover: COVER2,
            musicSrc: MUSIC2
        },
        {
            index: 5,
            name: 'music6-6',
            cover: COVER3,
            musicSrc: MUSIC3
        },        {
            index: 6,
            name: 'music6-7',
            cover: COVER1,
            musicSrc: MUSIC1
        },
        {
            index: 7,
            name: 'music6-8',
            cover: COVER2,
            musicSrc: MUSIC2
        },
        {
            index: 8,
            name: 'music6-9',
            cover: COVER3,
            musicSrc: MUSIC3
        },        {
            index: 9,
            name: 'music6-10',
            cover: COVER1,
            musicSrc: MUSIC1
        },
        {
            index: 10,
            name: 'music6-11',
            cover: COVER2,
            musicSrc: MUSIC2
        },
        {
            index: 11,
            name: 'music6-12',
            cover: COVER3,
            musicSrc: MUSIC3
        },
    ]
}

const MUSIC_THEME_LIST = [
    MUSICTHEME1,
    MUSICTHEME2,
    MUSICTHEME3,
    MUSICTHEME4,
    MUSICTHEME5,
    MUSICTHEME6,
]

console.log("뮤직테마!!!!!", MUSIC_THEME_LIST)
export default MUSIC_THEME_LIST;