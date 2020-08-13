import React, { useEffect } from "react";

function AgeFit ({ status }) {
    const { owner, pet_name, age1, age2 } = status;
    useEffect(() => {
        console.log("AgeFit mount!")
    }, [])
    return (
        <>
        {owner}
        {pet_name}
        {age1}년 {age2}개월
        </>
    )
}

export default AgeFit;