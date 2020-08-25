import React from 'react';
import styled from 'styled-components'
import IdCard from '../Components/Useful/IdCard';

function DoctorFitMenuPage () {
    return (
        <>
            <MainInfo>내 아이에게 &nbsp;
                <InnerInfo>딱! 맞는 제품</InnerInfo>은?
            </MainInfo>
                    
            <SubInfo>내 아이만을 위한 맞춤정보와 제품을 만들 수 있어요<br />이미 5,352명의 아이들이 이용했어요</SubInfo>

            <IdCard />
        </>
    )
}

export default DoctorFitMenuPage;


const MainInfo = styled.div`
    margin: 25px 0;
    font-size: 28px;
    font-weight: 300;
    color: #333333; 
    letter-spacing: -1.4px;
`;
const InnerInfo = styled.div`
    display: inline;
    font-weight: 700;
    
    color: #e16a49;
`;

const SubInfo = styled.div`
    font-size: 15px;
    color: #080808;
    letter-spacing: -0.75px;
    line-height: 1.47;
    margin: 15px 0 30px;
`;