import React, { useEffect } from 'react';


function AddBasket() {


    const sendBasketSignal = (event) => {  
        const { id } = event.target;
        const category = 144;
        console.log('자식창 로드!');  
  
        //targetWindow.postMessage(message, targetOrigin, [transfer]);
        window.parent.postMessage({ target_id : id, target_category : category }, '*');

    }

    // useEffect(() => {
    //     sendMessageToParent();
    // })

    
    return (
        <>
            <button id="248" onClick={sendBasketSignal}>관절 처방사료 장바구니 담기</button>
            <br />
            <button id="251" onClick={sendBasketSignal}>실리콘 커버 장바구니 담기</button>
        </>
    )

}


export default AddBasket;