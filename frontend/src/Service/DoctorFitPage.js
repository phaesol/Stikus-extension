import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import axios from "axios";
import { BACKEND } from '../config';
// import ImageField from '../Components/Useful/ImageField';
// 이 컴포넌트에서는 유저 정보와 반려동물 정보를 저장하는 용도로 사용합니다!
import { setPetInfo } from '../Redux/Actions/petInfoActions'
import { connect } from 'react-redux';

import DEFAULT_PIC from '../Images/Basic/basic-dog-picture.png';
import MODIFY_ICON from '../Images/Basic/modify-icon1.png';
import MODIFY_ICON2 from '../Images/Basic/modify-icon2.png';



function DoctorFitPage ({ petInfo, dispatchSetPetInfo }) {
    console.log("펫인포 :", petInfo)
    const history = useHistory();
    const initialState = [{
        pet_name: "",
        age1: "0",
        age2: "0",
        weight1: "0",
        weight2: "0",
    }]
    const [status, setStatus] = useState(initialState)
    const [user, setUser] = useState({
        member_id: "로그인 안한 유저 ID",
        member_name: "닥터맘마",
      })
    const { pet_name, age1, age2, weight1, weight2 } = status;
    const [mypetImageSrc, setMyPetImageSrc] = useState('');
    const [imageData, setImageData] = useState('');

    // destructuring
    const { member_id , member_name } = user;

    const handleStatus = (event) => {
        // 여러 input요소들을 저장하는 공간입니다! // 페이지의 모든 요소에 다 의존적이기 때문에 useCallback 사용하지 않겠음.
        const target = event.target;
        const { name } = target;
        const value = target.name === 'ispregnant' || target.name === 'neutralization' ? target.checked : target.value;
        setStatus({
          ...status,
          [name]: value
        })
      }
      
    const receiveMessage = (event) => {
        // iframe으로 씌워질 시 drmamma.net과 통신하는 함수입니다.
        if (!event.data.source.includes('react-devtools') || event.data.source == undefined) {
            // 개발환경에서 react-devtool이 signal을 보내기 때문에 local에서는 무시하기 위해 if 구문으로 block
            // production에서는 if문을 주석처리!
            const { member_id, member_name } = event.data;
            setUser({
                member_id: member_id,
                member_name: member_name,
            })
        }
        // console.log(event.data); // { childData : 'test data' }
        // console.log("event.origin : " + event.origin); // http://123.com (메세지를 보낸 도메인)         
      }

    useEffect(() => {
        // drmamma 서비스에서 회원정보를 가져오는 eventListener 등록 및 해제입니다.
        window.addEventListener("message", receiveMessage);
        return () => window.removeEventListener("message", receiveMessage);
      }, [])



    const parseAgeToMonth = () => {
        // 받은 나이를 개월수로 parse 후 return
        let ageOfMonth = 0
        if (age1) {
            ageOfMonth += parseInt(age1)*12
        }
        if (age2) {
            ageOfMonth += parseInt(age2)
        }
        return ageOfMonth
    }
    
    // const parseMonthAge = useMemo(parseAgeToMonth, [age1, age2]);
    // age1, age2가 안바뀌면 메모이제이션 << redux로 전환시 이제 필요없어서 주석

    const parseMergeWeight = () => {
        console.log("파스웨이트");
        let parseWeight = ""
        if (weight1) {
            parseWeight += weight1
        }
        if (weight2) {
            parseWeight += "."+weight2
        }
        return parseWeight
    }

    const saveMyPetData = useCallback(() => {
        /* 
            status라는 state에 저장된 pet정보를 가져와서 
            1. redux store에 저장
            2. backend(django server)에 post요청 및 저장
        */
       
        const parseWeight = parseMergeWeight();
        const parseMonthAge = parseAgeToMonth();

        // 1. redux store에 저장
        dispatchSetPetInfo(member_id, pet_name, parseMonthAge, parseWeight, imageData) // owner, name, age, weight, image 
        
        // 2. backend에 저장
        const myPetFormData = new FormData(); // image Data를 serve 하기 위해 FormData생성

        myPetFormData.append("owner", member_id) 
        myPetFormData.append("name", pet_name) 
        myPetFormData.append("age", parseMonthAge) 
        myPetFormData.append("weight", parseWeight) 
        myPetFormData.append("image", imageData)
        
        axios({
            method: 'post',
            url: `${BACKEND}/mypet`,
            data: myPetFormData,
            header: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
              },
        })
        .then(res => console.log(res.data, "저장 성공"))
        .catch(err => console.log("에러: ", err))
    }, [member_id, pet_name, age1, age2, weight1, weight2, imageData])


    const goToMenu = () => {
        // DoctorFitMenuPage로 라우팅
        saveMyPetData();
        history.push('/menu')
        
    }
    const detectMyPetImageUpload = (event) => {
        // 이미지 파일 업로드 시 미리보기용 blob URL 추출 및 imageData 저장
        const previewPath = URL.createObjectURL(event.target.files[0])
        setMyPetImageSrc(previewPath)
        setImageData(event.target.files[0])
    }

    const inputImageRef = useRef();
    const inputImageActivate = () => {
        console.log(inputImageRef)
        inputImageRef.current.click();
    }
    return (
        <>
            
            {/* <MainInfo>{member_name && {member_name} <InnerInfo>을 이용해보세요</InnerInfo>}</MainInfo> */}
            <MainInfo>닥터핏
                <InnerInfo>을 이용해보세요</InnerInfo>
            </MainInfo>
            
            <SubInfo>내 아이만을 위한 맞춤정보와 제품을 만들 수 있어요<br />이미 5,352명의 아이들이 이용했어요</SubInfo>
            
            <ProfileImgWrapper onClick={inputImageActivate}>
                <ImageInput ref={inputImageRef} onChange={detectMyPetImageUpload} />
                {mypetImageSrc ? 
                    <>
                        <ProfileImg src={mypetImageSrc} /> 
                        <ModifyIcon src={MODIFY_ICON} />
                    </> 
                  : <ProfileImg src={DEFAULT_PIC} />
                }
            </ProfileImgWrapper>
            
            <InputLabel>반려견 이름</InputLabel>
            <NameInput onChange={handleStatus} name="pet_name" value={pet_name} />

            <InputLabel>나이</InputLabel>
                <SelectBetweenWrapper>
                    <SelectInput onChange={handleStatus} name="age1" id="input-age1" value={age1}>
                        {[...Array(31).keys()].map(i=> <option key={i}>{i} 년</option>)}
                    </SelectInput>
                    <SelectInput onChange={handleStatus} name="age2" id="input-age2" value={age2}>
                        {[...Array(12).keys()].map(i=> <option key={i} value={i}>{i} 개월</option>)}
                    </SelectInput>
                </SelectBetweenWrapper>

            <InputLabel>체중</InputLabel>
            <SelectBetweenWrapper>
                <SelectInput onChange={handleStatus} name="weight1" id="input-weight1" value={weight1}>
                    {[...Array(51).keys()].map(i=> <option key={i} value={i}>{i}</option>)}
                </SelectInput>
                <SelectInput onChange={handleStatus} name="weight2" id="input-weight2" value={weight2}>
                    {[...Array(10).keys()].map(i=> <option key={i} value={i}>.{i} kg</option>)}
                </SelectInput>
            </SelectBetweenWrapper>
            {pet_name && (age1 || age2) && (weight1 || weight2) ?
                <GoToUseButton onClick={goToMenu}>닥터핏 이용하기</GoToUseButton>
                : <GoToUseButtonDisabled>닥터핏 이용하기</GoToUseButtonDisabled>
            }
        </>
    )
}

const mapStateToProps = (state) => {
    return { petInfo: state.petInfo }
}
const mapDispatchToProps = (dispatch) => {
    return { 
        dispatchSetPetInfo : (owner, name, age, weight, image) => dispatch(setPetInfo(owner, name, age, weight, image))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(DoctorFitPage));



// basic

const MainInfo = styled.div`
    display: flex;
    margin: 25px 0;
    font-size: 28px; 
    font-weight: 700;
    width: 320px;
    color: #e16a49;
    letter-spacing: -1.4px;
`;
const InnerInfo = styled.div`
    font-weight: 300;
    color: #333333; 
`;

const SubInfo = styled.div`
    font-size: 15px;
    color: #080808;
    letter-spacing: -0.75px;
    line-height: 1.47;
    margin: 15px 0 30px;
`;

// ab. inputs
const InputLabel = styled.label`
    display: block;
    font-weight: 500;
    margin: 15px 0;
`;
const ImageInput = styled.input.attrs({
    type: 'file',
})`
    display: none;
`;
const NameInput = styled.input.attrs({
    type: 'text',
})`
    border: solid 1px #a5a4a4;
    box-sizing : border-box;
    border-radius: 5px;
    padding: 10px;
    font-size: 17px;
    width: 100%;
`;

const SelectBetweenWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;
const SelectInput = styled.select`
    border: solid 1px #a5a4a4;
    box-sizing: border-box;
    border-radius: 5px;
    padding: 10px;
    font-size: 17px;
    width: 49%;
    background: white;
`;

// buttons
const GoToUseButton = styled.div`
    margin-top: 20px;
    padding: 10px 20px;
    line-height: 1.47;
    letter-spacing: -0.85px;
    text-align: center;
    margin: 30px auto;
    cursor: pointer;
    font-size: 17px;
    background: #2b428e;
    color: #ffffff;
    border-radius: 5px;
`;

const GoToUseButtonDisabled = styled.div`
    margin-top: 20px;
    padding: 10px 20px;
    line-height: 1.47;
    letter-spacing: -0.85px;
    text-align: center;
    margin: 30px auto;
    cursor: pointer;
    font-size: 17px;
    background: #dddddd;
    color: #ffffff;
    border-radius: 5px;
`;

const ProfileImgWrapper = styled.div`
    width: 150px;
    cursor: pointer;
    margin: 0 auto;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;    
`;

const ProfileImg = styled.img.attrs({
    width: '144px',
    height: '144px'
})` 
    width: 144px;
    heigth: 144px;
    vertical-align: middle;
    overflow: hidden;
    border-radius: 50%;
`;

const ModifyIcon = styled.img`
    position: absolute;
    top: 100px;
    margin-left: 120px;
    // right: 150px;
    // bottom: 10px;
    // right: 10px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    padding: 5px;
    background: #f2f2f2;
`;