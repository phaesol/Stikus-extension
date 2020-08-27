import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { BACKEND } from '../../config';
import MODIFY_ICON1 from '../../Images/Basic/modify-icon1.png';
import { useHistory } from 'react-router-dom';
import { setPetInfo, setPetImage } from '../../Redux/Actions/petInfoActions';

const IdCard = ({ petInfo, dispatchSetPetInfo, dispatchSetPetImage }) => { 
    const { owner, name, age, weight, image } = petInfo;
    const MyPetImageSrc = BACKEND + image;
    const history = useHistory();
    const modifyProfile = () => {
        history.push('/');
    }
    
    const selectMyPet = () => {
        dispatchSetPetInfo(owner, name, age, weight);
        dispatchSetPetImage(image);
        history.push('/menu');
    }
    
    return (
        <>
            <IdCardWrapper onClick={selectMyPet}>
                <ProfileImg src={MyPetImageSrc} />
                <DetailInfoWrapper>
                    <IdCardName>{name}</IdCardName>
                    <DetailInfo>
                        <DetailLabel>나이</DetailLabel><DetailDesc>{age}개월</DetailDesc>
                        <DetailLabel>체중</DetailLabel><DetailDesc>{weight}kg</DetailDesc>
                    </DetailInfo>
                </DetailInfoWrapper>
                <ModifyIcon src={MODIFY_ICON1} onClick={modifyProfile} />
            </IdCardWrapper>
        </>
    )
}

const mapDispatchToProps = dispatch => {
    return { 
        dispatchSetPetInfo : (owner, name, age, weight) => dispatch(setPetInfo(owner, name, age, weight)),
        dispatchSetPetImage : image => dispatch(setPetImage(image))
    }
};

export default connect(null, mapDispatchToProps)(IdCard);

const IdCardWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    border-radius: 10px;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    margin: 10px 0;
    cursor: pointer;
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

const ModifyIcon = styled.img`
    width: 20px;
    position: absolute;
    top: 10px;
    right: 10px;
`;