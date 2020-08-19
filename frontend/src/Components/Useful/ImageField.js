import React, { useRef, useEffect, useState } from 'react';
import { useFetchAge } from '../../Hooks/useFetchAge';





const ImageField = () => {
    const [mypetImageSrc, setMyPetImageSrc] = useState('');
    const detectMyPetImageUpload = (event) => {
        const previewPath = URL.createObjectURL(event.target.files[0])
        setMyPetImageSrc(previewPath)
    }   
    return (
        <>
            <input onChange={detectMyPetImageUpload} type="file" />
            {mypetImageSrc && <img src={mypetImageSrc} width="300px;" />}
        </>
    )
}


export default ImageField;