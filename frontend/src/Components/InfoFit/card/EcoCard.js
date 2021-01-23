import React, { useCallback, useState, useEffect } from "react";
import styled from "styled-components";

function EcoCard ({ eco, filter }) {
    const [toggle, setToggle] = useState(false)

    const onClick = useCallback(() => {
        setToggle(!toggle)
        filter(eco)
    }, [filter, toggle])

    useEffect(() => {
        filter("init")
    }, [])


    return (    
        <StyledTag onClick={onClick} toggle={toggle}>#{eco}</StyledTag>
    )
}

export default React.memo(EcoCard);


const StyledTag = styled.span`
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 5px;
    letter-spacing: -0.75px;
    font-family: "NotoSansKR";
    padding: 8px 8px;
    font-size: 15px;
    margin-right: 10px;
    margin-bottom: 5px;

    color: ${(props) => props.toggle ? "#FFFFFF" : "#E16A49"};
    background: ${(props) => props.toggle ? "#E16A49" : "#FFFFFF"};
`;