import React, { useState } from 'react';
import styled from 'styled-components'
import IdCard from '../Components/Useful/IdCard';
import { useHistory } from 'react-router-dom';

function DoctorFitMenuPage () {
    const history = useHistory();
    const [which, setWhich] = useState('');
    const goToMakeNutrinet = () => {
        setWhich("make-nutrient")
    }
    if (!which) 
        return (
            <>
                <MainInfo>내 아이에게 &nbsp;
                    <InnerInfo>딱! 맞는 제품</InnerInfo>은?
                </MainInfo>
                        
                <SubInfo>내 아이만을 위한 맞춤정보와 제품을 만들 수 있어요<br />이미 5,352명의 아이들이 이용했어요</SubInfo>

                <IdCard />
                <button onClick={goToMakeNutrinet} />
            </>
        )
    if (which === "make-nutrient") 
        return (
            <>
                설문시작하는 컴포넌트
                ==> 여기서 추천 받아서 만들꺼냐, 직접 만들꺼냐 설문 받아서
                해당 체크된 사항으로 history.push() 동작 시키자.
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