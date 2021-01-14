import React, { useCallback, useState } from "react";


function DiseaseCard ({disease}) {
    // alert("onO")
    // onOff 에 01 들어오면 색 바낌
    const [toggle, setToggle] = useState(false)
    const onClick = useCallback(() => {
        setToggle(!toggle)
        console.log(toggle, disease)
    }, [toggle])

    return (
        <img onClick={onClick} src={require(`../../Images/Disease/h-${disease}${toggle ? "01" : ""}.png`)} />
    )
}

export default React.memo(DiseaseCard);