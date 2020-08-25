import React from 'react';
import styled from 'styled-components'
import IdCard from '../Components/Useful/IdCard';

function DoctorFitMenuPage () {
    return (
        <SubContainer>
            <h1>메뉴페이지입니당</h1>
            
            <IdCard />
        </SubContainer>
    )
}

export default DoctorFitMenuPage;

const SubContainer = styled.div`
    // border: 10px; solid blue;
`;

