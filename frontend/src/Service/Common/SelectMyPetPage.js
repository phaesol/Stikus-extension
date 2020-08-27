import React from 'react';
import { useFetchMyPet } from '../../Hooks/useFetchMyPet';
import IdCard from '../../Components/Useful/IdCard';

import { connect } from 'react-redux';

function SelectMyPetPage ({ petInfo }) {
    const myPet = useFetchMyPet(petInfo.owner);
    // 나중에 owner 넘겨주는 부분을 user reducer를 하나둬서, 따로 넣어줘야 할 것 같군요! 아니면 mount하자마자 owner는 petInfo에 바로 넣어주던가! 
    // 왜냐면 가장 초기 1회에 pet생성을 하지 않으면 ............ 추가등록하기를 해야하니까 괜찮나? 이건 다시 생각해봅씨당
    return (
        <>
        {myPet && myPet.map(
            petInfo => <IdCard key={petInfo.id} petInfo={petInfo}/> )}
        </>
    )
}


const mapStateToProps = state => {
    return { petInfo: state.petInfo }   
}

export default connect(mapStateToProps)(SelectMyPetPage);