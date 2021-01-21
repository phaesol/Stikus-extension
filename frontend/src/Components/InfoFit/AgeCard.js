import React, { useCallback, useState } from "react";


function AgeCard ({ age, filter }) {
    const [toggle, setToggle] = useState(false)
    const onClick = useCallback(() => {
        setToggle(!toggle)
        filter(age[Object.keys(age)])
    }, [filter, toggle])

    return (    
        <img onClick={onClick} src={require(`../../Images/Age/${toggle ? "on" : "off"}-${Object.keys(age)}.svg`)} />
    )
}

export default React.memo(AgeCard);