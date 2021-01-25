import React, { useState, useRef } from "react";
import styled from "styled-components";
import VIDEO_PLAY_BTN from "../../Images/InfoFit/video-play.svg";
import VIDEO_SHARE_BTN from "../../Images/InfoFit/video-share.svg";
// import urlShare from "../InfoFit/urlShare";

function VideoCard({ slug, subject, content, youtube_link, temp }) {

    const [toggle, setToggle] = useState(false)
    const hiddenInput = useRef(null);
    const [linkcopy, setLinkCopy] = useState(false);
    
    if (linkcopy) {
        setTimeout(() => setLinkCopy(false), 1200);
    }

    const selectVideo = () => {
        setToggle(!toggle)
    }


    const urlShare = (event) => {
         // 후속 이벤트 무시

        if (navigator.share) {
          navigator
            .share({
              title: subject,
              url: youtube_link,
            })
            .then(() => {
              console.log("link copy - navigator");
            })
            .catch(console.error);
        } else {
          // hiddenInput.current.value = window.document.location.href;
          hiddenInput.current.value =
            youtube_link;
          hiddenInput.current.select();
          document.execCommand("copy");
          // hiddenInput.current.blur(); //포커싱된 값을 지우는 method
          setLinkCopy(true);
          console.log("link - copy ref");
        }
        
        
        event.stopPropagation();
        //일반 공유는 링크를 공유한다.
      };

    
    
    return (
        <>
            <VideoCardContainer onClick={selectVideo}>
            <img src={require(`../../Images/InfoFit/thumbnail/${slug}.png`)} />
            <img src={VIDEO_PLAY_BTN} />
            <img src={VIDEO_SHARE_BTN} onClick={urlShare}/>
            <div>
                <span>{subject}</span>
                <span>{content}</span>
            </div>
            
            <HiddenInputBox readOnly type="text" value="" ref={hiddenInput} />
            {linkcopy && (
              <LinkCopyDisplay>💡 링크가 복사되었습니다.</LinkCopyDisplay>
            )}
            </VideoCardContainer>
        

            {toggle && 
                <VideoShowContainer>  
                    <iframe 
                        width="100%"
                        height="100%" 
                        src={`https://www.youtube.com/embed/${youtube_link.split("watch?v=")[1]}`} 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen="allowFullScreen"
                    ></iframe>
                </VideoShowContainer>
            }
        </>
    )}
 
export default VideoCard;

const VideoShowContainer = styled.div`
    iframe {
        margin-bottom: 12px;
    }

`;
const VideoCardContainer = styled.div`
    /* box-sizing: border-box; */
    /* border: 1px solid pink; */
    position: relative;
    display: flex;
    align-items: center;
    height: 75px;
    margin-bottom: 20px;
    cursor: pointer;


    img:nth-child(1) {
        width: 75px;
        height: 75px;
        border-radius: 15px;
    }
    img:nth-child(2){
        width: 38px;
        margin-left: -54px;
        margin-top: 3px;   
    }
    img:nth-child(3){
        width: 24px;
        position: absolute;
        right: 0;
    }
    

    div{
        position: absolute;
        width: 65%;
        left: 85px;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        height: 47px;
        @media(max-width: 420px) {
            left: 80px;
        }
        
    }

    span{
        padding: 0 5px;        
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;

        display: block;
        font-family: "NotoSansKR";
        color: #333333;
    }

    span:nth-child(1){
        letter-spacing: -0.75px;
        font-size: 15px;
    }
    span:nth-child(2){
        letter-spacing: -0.65px;
        font-weight: 300;
        font-size: 13px;
    }
`;






const HiddenInputBox = styled.input`
  /* display: none; */
  /* visibility: hidden; */
  /* 히든 되어있는 엘리먼트는 선택할수 없다. */
  opacity: 0;
  cursor: default;
  position: fixed;
  bottom: 0;
  right: 0;
  width: 5px;
  height: 0;
  padding: 0;
  margin: 0;
`;

const LinkCopyDisplay = styled.div`
  @keyframes smoothModal {
    0% {
      opacity: 0.9;
    }
    20% {
      opacity: 0.9;
    }
    40% {
      opacity: 0.9;
    }
    60% {
      opacity: 0.4;
    }
    80% {
      opacity: 0.1;
    }
    100% {
      opacity: 0;
    }
  }
  font-size: 18px;
  background-color: #3c3e44 !important;
  color: #FFFFFF;
  /* position: fixed !important; */
  width: 270px !important;
  height: 50px ;
  align-items: center ;
  justify-content: center !important;
  border-radius: 15px;
  font-family: "NotoSansKR";
  animation: smoothModal 1.6s linear;

  
  left: 50% !important;
  transform: translate(-50%) !important;
`;