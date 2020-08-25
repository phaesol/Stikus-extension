import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { BACKEND } from '../../config';
import MODIFY_ICON2 from '../../Images/Basic/modify-icon2.png';
import TEMP_IMAGE from '../../Images/Basic/basic-dog-picture.png';

const IdCard = ({ petInfo }) => { 
    const MyPetImageSrc = BACKEND + petInfo.image;
    return (
        <>
            <IdCardWrapper>

                <ProfileImg src={MyPetImageSrc} />
                <DetailInfoWrapper>
                    <IdCardName>{petInfo.name}</IdCardName>
                    <DetailInfo>
                        <DetailLabel>나이</DetailLabel><DetailDesc>{petInfo.age}개월</DetailDesc>
                        <DetailLabel>체중</DetailLabel><DetailDesc>{petInfo.weight}kg</DetailDesc>
                    </DetailInfo>
                </DetailInfoWrapper>
            </IdCardWrapper>
            <img src={MODIFY_ICON2} />

        </>
    )
}

const mapStateToProps = (state) => {
    return { petInfo: state.petInfo }
}

export default connect(mapStateToProps)((IdCard));

const IdCardWrapper = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    border-radius: 10px;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
`;


const ProfileImg = styled.img.attrs({
    width: '80px',
    height: '80px'
})` 
    margin-left: 10px;
    width: 80px;
    heigth: 80px;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.2);
    object-fit: cover;
    vertical-align: middle;
    overflow: hidden;
    border-radius: 50%;
`;

const DetailInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 15px;
    width: 70%;
    // border: 1px solid green;
`;

const IdCardName = styled.div`
    font-weight: 900;
    color: #333333;
    line-height: 25px;
    font-size: 20px;
`;

const DetailInfo = styled.div`
    letter-spacing: 0.85px;
    line-height: 25px;
`;

const DetailLabel = styled.span`
    color: #a5a4a4;
    // border: 1px solid red;
    font-size: 17px;
`;

const DetailDesc = styled.span`
    color: #2b428e;
    margin-left: 5px;
    line-height: 25px;
    font-weight: 500;
    margin-right: 5px;
`;
