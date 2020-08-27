import React from 'react';
import { useFetchMyPet } from '../../Hooks/useFetchMyPet';
import IdCard from '../../Components/Useful/IdCard';

import { connect } from 'react-redux';

const owner = "로그인 안한 유저 ID";

function SelectMyPetPage ({ petInfo }) {
    const myPet = useFetchMyPet(owner);

    return (
        <>
        {myPet && myPet.map(
            petInfo => <IdCard petInfo={petInfo}/> )}
        </>
    )
}


const mapStateToProps = state => {
    console.log(state.petInfo)
    return { petInfo: state.petInfo }   
}

export default connect(mapStateToProps)(SelectMyPetPage);