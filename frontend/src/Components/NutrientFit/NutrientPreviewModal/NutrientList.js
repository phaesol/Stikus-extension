import React from 'react';
import styled from 'styled-components';

function NutrientList ({item}) {
    return (
        <>
            {/* <StyledItemContainer> */}
                <StyledItemWrapper color={item.color}>
                    <StyledItem1>{item.name}</StyledItem1>  
                    <StyledItem2>{item.amount}g</StyledItem2>
                    <StyledItem3>{item.price}원</StyledItem3>
                </StyledItemWrapper>
            {/* </StyledItemContainer> */}
        </>
    )
}

export default React.memo(NutrientList);


const StyledItemWrapper = styled.div`
    display: flex;
    border-bottom: 1px solid #ffffff;
    flex-direction: row;
    justify-content: space-between;
    font-size: 13px;
    letter-spacing: -0.65px;
    color: #ffffff;
    padding: 2px 6px;
    background: ${({color}) => color}
    `;

const StyledItem1 = styled.div`
    width: 160px;
`;
const StyledItem2 = styled.div``;

const StyledItem3 = styled.div`
    width: 40px;
`;