import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

function DoctorFitMenuPage ({ petInfo }) {
    console.log("props from redux store!!!! 이게 먼저나오면 안댐 ", petInfo)
    
    
    return (
        <SubContainer>
            d
        </SubContainer>
    )
}

const mapStateToProps = (state) => {
    return { petInfo: state.petInfo }
}

export default connect(mapStateToProps)((DoctorFitMenuPage));

const SubContainer = styled.div`
    // border: 10px; solid blue;
`;

