import React, { useEffect } from 'react';


function AddBasket() {


    const sendMessageToParent = () => {  
        
        console.log('자식창 로드!');  
  
        //targetWindow.postMessage(message, targetOrigin, [transfer]);
        window.parent.postMessage({ childData : 'test data!!!!!!!!!!!!!! 들어가!!!!!!' }, '*');
    }

    useEffect(() => {
        sendMessageToParent();
    })

    
    return (
        <button id="콘솔에 찍히나 보자!" onClick={sendMessageToParent}>장바구니 담기</button>
    )

}


export default AddBasket;