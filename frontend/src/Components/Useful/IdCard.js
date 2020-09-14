import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { BACKEND } from '../../config';
import MODIFY_ICON1 from '../../Images/Basic/modify-icon1.png';
import { useHistory } from 'react-router-dom';
import { setPetInfo, setPetImage, setPetID } from '../../Redux/Actions/petInfoActions';

function IdCard ({ petInfo, dispatchPetInfo }) { 
    const { id, owner, name, age, weight, image } = petInfo;
    const MyPetImageSrc = BACKEND + image;
    const history = useHistory();
    const modifyProfile = () => {
        history.push('/');
    }
    const selectMyPet = () => {
        if (history.location.pathname === "/menu") {
            /*
                메뉴에서 onClick 이벤트가 일어날 때
                수정 등 팝업 기능이 실행!
                현재 등록된 펫의 정보는 store에서 getState
            */
            history.push('/modify-my-pet')
        } else if (history.location.pathname === "/") {
            /*
                셀렉트페이지에서 onClick 이벤트가 일어날 때
                간단하게 redux-store의 petInfo만 바꿔줍니다!
            */
            dispatchPetInfo.dispatchSetPetID(id);
            dispatchPetInfo.dispatchSetPetInfo(owner, name, age, weight);
            dispatchPetInfo.dispatchSetPetImage(image);
            history.push('/menu');
        } else {
            return;
        }

    }
    
    return (
        <>
            <IdCardWrapper onClick={selectMyPet}>
                <ProfileImg src={MyPetImageSrc} />
                <DetailInfoWrapper>
                    <IdCardName>{name}</IdCardName>
                    <DetailInfo>
                        <DetailLabel>나이</DetailLabel><DetailDesc>{age}개월</DetailDesc>
                        <DetailLabel>체중</DetailLabel><DetailDesc>{weight} kg</DetailDesc>
                    </DetailInfo>
                </DetailInfoWrapper>
                <ModifyIcon src={MODIFY_ICON1} onClick={modifyProfile} />
            </IdCardWrapper>
        </>
    )
}

const mapDispatchToProps = dispatch => {
    return { 
        dispatchPetInfo: {
            dispatchSetPetID: id => dispatch(setPetID(id)),
            dispatchSetPetInfo : (owner, name, age, weight) => dispatch(setPetInfo(owner, name, age, weight)),
            dispatchSetPetImage : image => dispatch(setPetImage(image))
        }
    };
}

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
    margin-left: 15px;
    width: 70%;
`;

const IdCardName = styled.div`
    font-weight: 900;
    color: #333333;
    line-height: 30px;
    font-size: 20px;
    letter-spacing: -0.9px;
`;

const DetailInfo = styled.div`
    letter-spacing: 0.85px;
    line-height: 30px;
    font-size: 15px;
`;

const DetailLabel = styled.span`
    font-weight: 500;
    color: #a5a4a4;
    letter-spacing: -0.85px;
`;

const DetailDesc = styled.span`
    color: #2b428e;
    margin-left: 5px;
    line-height: 25px;
    font-weight: 500;
    margin-right: 5px;
    letter-spacing: -0.85px;

`;

const ModifyIcon = styled.img`
    width: 20px;
    position: absolute;
    top: 10px;
    right: 10px;
`;