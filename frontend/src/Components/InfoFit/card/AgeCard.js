import React, { useCallback, useState, useEffect } from "react";


function AgeCard ({ age, filter, infoAge }) {
    const [toggle, setToggle] = useState(false)
    const onClick = useCallback(() => {
        setToggle(!toggle)
        filter(age[Object.keys(age)])
    }, [age, filter, toggle])

    useEffect(() => {
        if (!infoAge) {
            filter("init")
        }
    }, [])

    useEffect(() => {
        if (!infoAge) {
            // console.log("null 이야", infoAge)
            return;
        }
        if(infoAge === age[Object.keys(age)]) {
            setToggle(true);
            // console.log("인포 에이지는 이거구요ㅕ .>>", infoAge)
            // console.log(" 이 친구가 걸렸어요>>>", age[Object.keys(age)])
            filter(age[Object.keys(age)], true)
        } else {
            setToggle(false)
        }
    }, [infoAge])

    return (    
        <img onClick={onClick} src={require(`../../../Images/Age/${toggle ? "on" : "off"}-${Object.keys(age)}.svg`)} />
    )
}

export default React.memo(AgeCard);