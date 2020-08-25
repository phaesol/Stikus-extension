import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

const IdCard = ({ petInfo }) => { 
    return (
        <>
           {petInfo.name} / {petInfo.weight}
        </>
    )
}

const mapStateToProps = (state) => {
    return { petInfo: state.petInfo }
}

export default connect(mapStateToProps)((IdCard));
