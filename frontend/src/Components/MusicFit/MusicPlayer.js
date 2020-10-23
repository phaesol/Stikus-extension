import React from "react";
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";

function MusicPlayer ({ playList, responsive }) {
    console.log(playList)
    const options = {
        defaultPlayIndex: 0,
        theme: 'dark',
        bounds: 'html',
        clearPriorAudioLists: true,
        autoPlayInitLoadPlayList: false,
        preload: false,
        glassBg: true,
        remember: false,
        remove: true,
        defaultPosition: {
            bottom: 65,
            right: 10,
        },
        defaultPlayMode: 'singleLoop',
        // mode: 'mini',
        showMiniProcessBar: false,
        drag: false,
        seeked: false,
        showProgressLoadBar: false,
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
        responsive: responsive,
    };


    // const onBeforeDestroy = (currentPlayId, audioLists, audioInfo) => {
    //   return new Promise((resolve, reject) => {
    //     // your custom validate
    //     if (window.confirm('Are you confirm destroy the player?')) {
    //       // if resolve, player destroyed
    //       resolve()
    //     } else {
    //       // if reject, skip.
    //       reject()
    //     }
    //   })
    // }
    
    // const onDestroyed = (currentPlayId, audioLists, audioInfo) => {
    //   console.log('onDestroyed:', currentPlayId, audioLists, audioInfo)
    // }




  
  return (
    <>
      <ReactJkMusicPlayer audioLists={playList} {...options} 
        // showMediaSession 
        // showDestroy
        // onBeforeDestroy={onBeforeDestroy}
        // onDestroyed={onDestroyed}
      />
    </>
  );
}

export default React.memo(MusicPlayer);
