import React, { useState, useEffect } from "react";

function AgeCard ({ age, filter, infoAge, toggleAge, setToggleAge }) {
    const [toggle, setToggle] = useState(false)
    const onClick = () => {
        setToggle(!toggle)
        filter(age[Object.keys(age)])

        if (!toggle) { 
            setToggleAge(age[Object.keys(age)]) 
        } else {
            if(toggleAge === age[Object.keys(age)]) {
                setToggleAge(null)
            }   
        }
    }

    useEffect(() => {
        if (!infoAge) {
            filter("init")
        }
    }, [])

    useEffect(() => {
        if (!infoAge) {
            return;
        }


        if(infoAge === age[Object.keys(age)]) {
            setToggle(true);
            filter(age[Object.keys(age)], true)
            setToggleAge(age[Object.keys(age)]) 

        } else {
            setToggle(false)
        }
    }, [infoAge])

    return (    
        <>
        <img onClick={onClick} src={require(`../../../Images/Age/${toggle ? "on" : "off"}-${Object.keys(age)}.svg`)} />
        </>
    )
}

export default React.memo(AgeCard);