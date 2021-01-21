import React, { useCallback, useState } from "react";
import styled from "styled-components";

function BehaviorCard ({ behavior, filter }) {
    const [toggle, setToggle] = useState(false)
    const onClick = useCallback(() => {
        setToggle(!toggle)
        filter(behavior)
    }, [filter, toggle])

    return (    
        // <StyledTagContainer>
            <StyledTag onClick={onClick} toggle={toggle}>#{behavior}</StyledTag>
        // </StyledTagContainer>
    )
}

export default React.memo(BehaviorCard);

const StyledTagContainer = styled.div`
    display: flex;
    flex-wrap : wrap;

`;

const StyledTag = styled.span`
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 5px;
    letter-spacing: -0.75px;
    font-family: "NotoSansKR";
    padding: 8px 8px;
    font-size: 15px;
    margin-right: 10px;

    color: ${(props) => props.toggle ? "#FFFFFF" : "#E16A49"};
    background: ${(props) => props.toggle ? "#E16A49" : "#FFFFFF"};


`;