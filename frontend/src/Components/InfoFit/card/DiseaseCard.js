import React, { useCallback, useState, useEffect } from "react";


function DiseaseCard ({ disease, filter }) {
    // alert("onO")
    // onOff 에 01 들어오면 색 바낌
    const [toggle, setToggle] = useState(false)
    const onClick = useCallback(() => {
        setToggle(!toggle)
        filter(disease[Object.keys(disease)])
    }, [filter, toggle])

    useEffect(() => {
        filter("init")
    }, [])

    return (
        <img onClick={onClick} src={require(`../../../Images/Disease/h-${Object.keys(disease)}${toggle ? "01" : ""}.png`)} />
    )
}

export default React.memo(DiseaseCard);