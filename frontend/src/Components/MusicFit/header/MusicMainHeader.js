import React from 'react';
import styled from 'styled-components';
import MUSIC_THEME_LIST from '../../../Music/THEME/MUSICTHEME';
import RECOM_PLAY_ICON from '../../../Images/MusicFit/icon/recommend-play.png';

function MusicMainHeader ({ playMultiMusic }) {
    console.log(MUSIC_THEME_LIST)
    console.log(playMultiMusic)
    return (
        <>  

            <StyledRecomPlayIcon src={RECOM_PLAY_ICON} />
        </>
    )

}

export default MusicMainHeader;


const FLEX_CENTER = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const StyledHeaderSection = styled(FLEX_CENTER)`
    height: 250px;
`;

const StyledRecomPlayIcon = styled.img`
    width: 60px;
`;