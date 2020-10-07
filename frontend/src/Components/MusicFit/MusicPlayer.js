import React from "react";
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";

function MusicPlayer ({ playList }) {
    const options = {
        defaultPlayIndex: 0,
        theme: 'dark',
        bounds: 'html',
        clearPriorAudioLists: true,
        autoPlayInitLoadPlayList: false,
        preload: false,
        glassBg: true,
        remember: true,
        remove: true,
        defaultPosition: {
            bottom: 65,
            right: 10,
        },
        defaultPlayMode: 'singleLoop',
        mode: 'mini',
        once: false,
        autoPlay: true,
        toggleMode: true,
        showMiniModeCover: true,
        showMiniProcessBar: false,
        // drag: true,
        seeked: true,
        showProgressLoadBar: true,
        showPlay: true,
        showReload: false,
        showDownload: false,
        showPlayMode: false, // 반복인지, 셔플인지 etc
        showDestroy: false,
        extendsContent: [],
        defaultVolume: 0.45,
        playModeShowTime: 600,
        loadAudioErrorPlayNext: true,
        autoHiddenCover: false,
        spaceBar: true,
        responsive: false,
    };
  
  return (
    <>
      <ReactJkMusicPlayer audioLists={playList} {...options} />
    </>
  );
}

export default React.memo(MusicPlayer);
