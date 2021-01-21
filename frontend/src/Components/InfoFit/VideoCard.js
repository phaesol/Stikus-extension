import React, { useState } from "react";
import styled from "styled-components";
import VIDEO_PLAY_BTN from "../../Images/InfoFit/video-play.svg";
import VIDEO_SHARE_BTN from "../../Images/InfoFit/video-share.svg";

function VideoCard({ slug, subject, content, youtube_link, temp}) {

    const [toggle, setToggle] = useState(false)
    const selectVideo = () => {
        // alert("비디오선택")
        setToggle(!toggle)
    }

    const share = (event) => {
        alert("공유")
        event.stopPropagation()
    }
    
    return (
        <>
            <VideoCardContainer onClick={selectVideo}>
            <img src={require(`../../Images/InfoFit/thumbnail/${slug}.png`)} />
            <img src={VIDEO_PLAY_BTN} />
            <img src={VIDEO_SHARE_BTN} onClick={share}/>
            <div>
                <span>{subject}</span>
                <span>{temp}</span>
            </div>
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

    )
}
 
export default VideoCard;

const VideoShowContainer = styled.div`

`;
const VideoCardContainer = styled.div`
    /* box-sizing: border-box; */
    /* border: 1px solid pink; */
    position: relative;
    display: flex;
    align-items: center;
    height: 75px;
    margin-bottom: 20px;


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
        /* border: 1px solid blue; */
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


