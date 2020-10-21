import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import axios from "axios";
import { BACKEND } from '../../config';
// import ImageField from '../Components/Useful/ImageField';
// 이 컴포넌트에서는 유저 정보와 반려동물 정보를 저장하는 용도로 사용합니다!
import { setPetID, setPetInfo, setPetImage } from '../../Redux/Actions/petInfoActions';
import { connect } from 'react-redux';

import DEFAULT_PIC from '../../Images/Basic/basic-dog-picture.png';
import MODIFY_ICON from '../../Images/Basic/modify-icon1.png';

// backend에서는 
function ModifyMyPetPage ({ petInfo, dispatchPetInfo }) {
    const { 
        id: idFromStore,
        owner: ownerFromStore, 
        name: petNameFromStore, 
        weight: weightFromStore, 
        age: ageFromStore, 
        image: imageFromStore 
    } = petInfo;

    const age1FromStore = parseInt(ageFromStore/12);
    const age2FromStore = age1FromStore%12;
    const weight1FromStore = weightFromStore.split('.')[0]
    const weight2FromStore = weightFromStore.split('.')[1]
    
    const history = useHistory();
    const initialState = {
        petName: petNameFromStore,
        age1: age1FromStore,
        age2: age2FromStore,
        weight1: weight1FromStore,
        weight2: weight2FromStore,
    }
    const [status, setStatus] = useState(initialState)

    const [user, setUser] = useState({
        memberId: ownerFromStore,
        memberName: "닥터맘마",
      })
    const { petName, age1, age2, weight1, weight2 } = status;
    const [mypetImageSrc, setMyPetImageSrc] = useState(imageFromStore);
    const [imageData, setImageData] = useState('');

    // destructuring
    const { memberId , memberName } = user;

    const handleStatus = (event) => {
        // 여러 input요소들을 저장하는 공간입니다! // 페이지의 모든 요소에 다 의존적이기 때문에 useCallback 사용하지 않겠음.
        const target = event.target;
        const { name } = target;
        const value = target.value;
        setStatus({
          ...status,
          [name]: value
        })
      }
      
    const receiveMessage = (event) => {
        // iframe으로 씌워질 시 drmamma.net과 통신하는 함수입니다.
        if (!event.data.source.includes('react-devtools') || event.data.source === undefined) {
            // 개발환경에서 react-devtool이 signal을 보내기 때문에 local에서는 무시하기 위해 if 구문으로 block
            // production에서는 if문을 주석처리!
            const { member_id: memberIdFromDrmamma, member_name: nameFromDrmamma } = event.data;
            setUser({
                memberId: memberIdFromDrmamma,
                memberName: nameFromDrmamma,
            })
        }
        // console.log(event.data); // { childData : 'test data' }
        // console.log("event.origin : " + event.origin); // http://123.com (메세지를 보낸 도메인)         
      }

    useEffect(() => {
        /*
            Production 환경에서 주석을 풀어주세요!!!
            아래 eventListner가 장착되면 iframe과 통신해서 user_id, user_name을 가져올 수 있습니다.
        */
        // drmamma 서비스에서 회원정보를 가져오는 eventListener 등록 및 해제입니다.
        // window.addEventListener("message", receiveMessage);
        // return () => window.removeEventListener("message", receiveMessage);
      }, [])


    const parseAgeToMonth = useCallback(() => {
        // 받은 나이를 개월수로 parse 후 return
        let ageOfMonth = 0
        if (age1) {
            ageOfMonth += parseInt(age1)*12
        }
        if (age2) {
            ageOfMonth += parseInt(age2)
        }
        return ageOfMonth
    }, [age1, age2])
    
    // const parseMonthAge = useMemo(parseAgeToMonth, [age1, age2]);
    // age1, age2가 안바뀌면 메모이제이션 << redux로 전환시 이제 필요없어서 주석

    const parseMergeWeight = useCallback(() => {
        let parseWeight = ""
        if (weight1) {
            parseWeight += weight1
        }
        if (weight2) {
            parseWeight += "."+weight2
        }
        return parseWeight
    }, [weight1, weight2])

    const saveMyPetData = useCallback(() => {
        /* 
            status라는 state에 저장된 pet정보를 가져와서 
            1. redux store에 저장
            2. backend(django server)에 post요청 및 저장
        */
       
        const parseWeight = parseMergeWeight();
        const parseMonthAge = parseAgeToMonth();

        // 1. redux store에 저장
        dispatchPetInfo.dispatchSetPetInfo(
            memberId, petName, parseMonthAge, parseWeight
        ) // owner, name, age, weight (이미지는 backend에 보낸 후에 다시 저장!)

        // 2. backend에 저장
        const myPetFormData = new FormData(); // image Data를 serve 하기 위해 FormData생성

        myPetFormData.append("owner", memberId) 
        myPetFormData.append("name", petName) 
        myPetFormData.append("age", parseMonthAge) 
        myPetFormData.append("weight", parseWeight) 
        if (imageData) {
            myPetFormData.append("image", imageData)
        } 

        axios({
            method: 'patch',
            url: `${BACKEND}/mypet_modify/${idFromStore}`,
            data: myPetFormData,
            header: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
        })
        .then(res => {
            const { id: savedID, image : savedImage } = res.data;
            // 이미지는 백엔드에 저장 후 src를 받아와야 하기 때문에 여기서 store에 dispatch합니다
            dispatchPetInfo.dispatchSetPetID(savedID)
            dispatchPetInfo.dispatchSetPetImage(savedImage)

            console.log("returned Data : ", res.data)
            }
        )
        .catch(err => console.log("에러: ", err))
    }, [idFromStore, memberId, petName, parseAgeToMonth, parseMergeWeight, imageData, dispatchPetInfo])


    const goToMenu = () => {
        // DoctorFitMenuPage로 라우팅
        saveMyPetData();
        history.push('/')
    }

    const detectMyPetImageUpload = useCallback(event => {
        // 이미지 파일 업로드 시 미리보기용 blob URL 추출 및 imageData 저장
        if (event.target.files[0] !== undefined) {
            const previewPath = URL.createObjectURL(event.target.files[0])
            setMyPetImageSrc(previewPath)
            setImageData(event.target.files[0])
        }
    }, [mypetImageSrc, imageData])

    // 이미지 눌렀을 때 단순히 input type file을 클릭한 효과 구현 
    const inputImageRef = useRef();
    const inputImageActivate = () => {
        inputImageRef.current.click();
    }
    
    return (
        <> 
            <StyledMainInfo>반려동물 
                <StyledInnerInfo>정보 수정</StyledInnerInfo>
            </StyledMainInfo>
            
            <StyledSubInfo>내 아이만을 위한 맞춤정보와 제품을 만들 수 있어요<br />이미 5,352명의 아이들이 이용했어요</StyledSubInfo>
            
            <StyledProfileImgWrapper onClick={inputImageActivate}>
                <StyledImageInput ref={inputImageRef} onChange={detectMyPetImageUpload} />
                {mypetImageSrc ? 
                    <>
                        <StyledProfileImg src={mypetImageSrc} /> 
                        <StyledModifyIcon src={MODIFY_ICON} />
                    </> 
                  : <StyledProfileImg src={DEFAULT_PIC} />
                }
            </StyledProfileImgWrapper>
            
            <StyledInputLabel>반려견 이름</StyledInputLabel>
            <StyledNameInput onChange={handleStatus} name="petName" value={petName} />

            <StyledInputLabel>나이</StyledInputLabel>
                <StyledSelectBetweenWrapper>
                    <StyledSelectInput onChange={handleStatus} name="age1" id="input-age1" value={age1}>
                        {[...Array(31).keys()].map(i=> <option key={i} value={i}>{i} 년</option>)}
                    </StyledSelectInput>
                    <StyledSelectInput onChange={handleStatus} name="age2" id="input-age2" value={age2}>
                        {[...Array(12).keys()].map(i=> <option key={i} value={i}>{i} 개월</option>)}
                    </StyledSelectInput>
                </StyledSelectBetweenWrapper>

            <StyledInputLabel>체중</StyledInputLabel>
            <StyledSelectBetweenWrapper>
                <StyledSelectInput onChange={handleStatus} name="weight1" id="input-weight1" value={weight1}>
                    {[...Array(51).keys()].map(i=> <option key={i} value={i}>{i}</option>)}
                </StyledSelectInput>
                <StyledSelectInput onChange={handleStatus} name="weight2" id="input-weight2" value={weight2}>
                    {[...Array(10).keys()].map(i=> <option key={i} value={i}>.{i} kg</option>)}
                </StyledSelectInput>
            </StyledSelectBetweenWrapper>

            {petName && (age1 || age2) && (weight1 || weight2) ?
                <StyledGoToUseButton onClick={goToMenu}>닥터핏 이용하기</StyledGoToUseButton>
                : <StyledGoToUseButtonDisabled>닥터핏 이용하기</StyledGoToUseButtonDisabled>
            }
        </>
    )
}

const mapStateToProps = state => {
    return { petInfo: state.petInfo }
}

const mapDispatchToProps = dispatch => {
    return { 
        dispatchPetInfo: {
            dispatchSetPetID: id => dispatch(setPetID(id)),
            dispatchSetPetInfo : (owner, name, age, weight) => dispatch(setPetInfo(owner, name, age, weight)),
            dispatchSetPetImage : image => dispatch(setPetImage(image))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ModifyMyPetPage));



// basic
const StyledMainInfo = styled.div`
    display: flex;
    padding: 25px 0 9px 0;
    font-size: 28px; 
    font-weight: 700;
    color: #e16a49;
    letter-spacing: -1.4px;
`;
const StyledInnerInfo = styled.div`
    font-weight: 300;
    color: #333333; 
`;

const StyledSubInfo = styled.div`
    font-size: 15px;
    color: #080808;
    letter-spacing: -0.75px;
    line-height: 1.47;
    margin: 15px 0 30px;
`;

// ab. inputs
const StyledInputLabel = styled.label`
    display: block;
    font-weight: 500;
    margin: 15px 0;
`;
const StyledImageInput = styled.input.attrs({
    type: 'file',
})`
    display: none;
`;
const StyledNameInput = styled.input.attrs({
    type: 'text',
})`
    border: solid 1px #a5a4a4;
    box-sizing : border-box;
    border-radius: 5px;
    padding: 10px;
    font-size: 17px;
    width: 100%;
`;

const StyledSelectBetweenWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;
const StyledSelectInput = styled.select`
    border: solid 1px #a5a4a4;
    box-sizing: border-box;
    border-radius: 5px;
    padding: 10px;
    font-size: 17px;
    width: 49%;
    background: white;
`;

// buttons
const StyledGoToUseButton = styled.div`
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

const StyledGoToUseButtonDisabled = styled.div`
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


// profile images
const StyledProfileImgWrapper = styled.div`
    width: 150px;
    cursor: pointer;
    margin: 0 auto;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;    
`;

const StyledProfileImg = styled.img.attrs({
    width: '144px',
    height: '144px'
})` 
    width: 144px;
    heigth: 144px;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.2);
    object-fit: cover;
    vertical-align: middle;
    overflow: hidden;
    border-radius: 50%;
`;

const StyledModifyIcon = styled.img`
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