import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components';
import axios from "axios";
import { BACKEND } from '../../config';
// import ImageField from '../Components/Useful/ImageField';
// 이 컴포넌트에서는 유저 정보와 반려동물 정보를 저장하는 용도로 사용합니다!
import { setPetID, setPetInfo, setPetImage } from '../../Redux/Actions/petInfoActions';
import { connect } from 'react-redux';

import DEFAULT_PIC from '../../Images/Basic/basic-dog-picture.png';
import MODIFY_ICON from '../../Images/Basic/modify-icon1.png';
import MAIN_TOP_BG from "../../Images/NutrientFit/common/main-top-bg.svg";

import BreedComboBox from '../../Components/NutrientFit/BreedComboBox';

// backend에서는 
function ModifyMyPetPage ({ user, petInfo, dispatchPetInfo }) {
    const { 
        id: idFromStore,
        owner: ownerFromStore, 
        name: petNameFromStore, 
        weight: weightFromStore, 
        age: ageFromStore,
        body_format: body_formatFromStore,
        kind: kindFromStore,
        activity: activityFromStore,
        breed: breedFromStore,
        sex: sexFromStore,
        neutralization: neutralizationFromStore, 
        image: imageFromStore 
    } = petInfo;

    // console.log("petInfo", petInfo)
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
        body_format: body_formatFromStore,
        kind: kindFromStore,
        activity: activityFromStore,
        breed: breedFromStore,
        sex: sexFromStore,
        neutralization: neutralizationFromStore,
    }
    const [status, setStatus] = useState(initialState)

    const { memberId } = user;
    const { petName, age1, age2, weight1, weight2, body_format, kind, activity, breed, sex, neutralization } = status;
    const [mypetImageSrc, setMyPetImageSrc] = useState(imageFromStore);
    const [imageData, setImageData] = useState('');


    const handleStatus = (event) => {
        // 여러 input요소들을 저장하는 공간입니다! // 페이지의 모든 요소에 다 의존적이기 때문에 useCallback 사용하지 않겠음.
        const { name } = event.target;
        const { value } = event.target;
        setStatus({
          ...status,
          [name]: value
        })
      }
      
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


    const makeFormMyPetData = () => {
        const myPetFormData = new FormData(); // image Data를 serve 하기 위해 FormData생성
       
        const parseWeight = parseMergeWeight();
        const parseMonthAge = parseAgeToMonth();

        // 1. redux store에 저장
        dispatchPetInfo.dispatchSetPetInfo(
            memberId, petName, parseMonthAge, parseWeight,
            body_format, kind, activity, breed, sex, neutralization
        ) // (이미지는 backend에 보낸 후에 다시 저장!)

        // 2. backend에 저장
        // myPetFormData.append("owner", memberId) 
        myPetFormData.append("name", petName) 
        myPetFormData.append("age", parseMonthAge) 
        myPetFormData.append("weight", parseWeight)
        
        // 추가 데이터
        myPetFormData.append("body_format", body_format)
        myPetFormData.append("activity", activity)
        myPetFormData.append("breed", breed)     
        myPetFormData.append("neutralization", neutralization)
        kind === '강아지' ? myPetFormData.append("kind", "강아지") : myPetFormData.append("kind", "고양이")
        sex === '수컷' ? myPetFormData.append("sex", "수컷") : myPetFormData.append("sex", "암컷")   

        if (imageData) {
            myPetFormData.append("image", imageData)
        } 

        return myPetFormData
        
    }

    const saveMyPetData = () => {
        const formData = makeFormMyPetData();

        axios({
            method: 'patch',
            url: `${BACKEND}/mypet_modify/${idFromStore}`,
            data: formData,
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
            }
        )
        .catch(err => console.log("에러: ", err))
    }

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
        <> <StyledBackGround></StyledBackGround>
            <StyledMainInfo>프로필 수정하기</StyledMainInfo>
            
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
            
            <StyledInputLabel>반려동물 이름</StyledInputLabel>
            <StyledNameInput onChange={handleStatus} name="petName" value={petName} />
            
            <StyledSelectBetweenWrapper>
                <>  
                    <StyledSelectButtonBig onClick={handleStatus} name="kind" value="강아지" active={kind === "강아지" && true}>강아지</StyledSelectButtonBig>
                    <StyledSelectButtonBig onClick={handleStatus} name="kind" value="고양이" active={kind === "고양이" && true}>고양이</StyledSelectButtonBig>
                </>
            </StyledSelectBetweenWrapper>

            <StyledInputLabel>나이를 입력하세요</StyledInputLabel>
                <StyledSelectBetweenWrapper>
                    <StyledSelectInput onChange={handleStatus} name="age1" id="input-age1" value={age1}>
                        {[...Array(31).keys()].map(i=> <option key={i} value={i}>{i} 년</option>)}
                    </StyledSelectInput>
                    <StyledSelectInput onChange={handleStatus} name="age2" id="input-age2" value={age2}>
                        {[...Array(12).keys()].map(i=> <option key={i} value={i}>{i} 개월</option>)}
                    </StyledSelectInput>
                </StyledSelectBetweenWrapper>

            <StyledInputLabel>어떤 체형을 가지고 있나요?</StyledInputLabel>

            <StyledSelectBetweenWrapper>
                <StyleSelectButtonSmall onClick={handleStatus} name="body_format" value="날씬" active={body_format === "날씬" && true}>날씬</StyleSelectButtonSmall>
                <StyleSelectButtonSmall onClick={handleStatus} name="body_format" value="보통" active={body_format === "보통" && true}>보통</StyleSelectButtonSmall>
                <StyleSelectButtonSmall onClick={handleStatus} name="body_format" value="통통" active={body_format === "통통" && true}>통통</StyleSelectButtonSmall>
                <StyleSelectButtonSmall onClick={handleStatus} name="body_format" value="뚱뚱" active={body_format === "뚱뚱" && true}>뚱뚱</StyleSelectButtonSmall>
            </StyledSelectBetweenWrapper>

            <StyledInputLabel>체중을 입력하세요</StyledInputLabel>
            <StyledSelectBetweenWrapper>
                <StyledSelectInput onChange={handleStatus} name="weight1" id="input-weight1" value={weight1}>
                    {[...Array(51).keys()].map(i=> <option key={i} value={i}>{i}</option>)}
                </StyledSelectInput>
                <StyledSelectInput onChange={handleStatus} name="weight2" id="input-weight2" value={weight2}>
                    {[...Array(10).keys()].map(i=> <option key={i} value={i}>.{i} kg</option>)}
                </StyledSelectInput>
            </StyledSelectBetweenWrapper>

            <StyledInputLabel>활동량을 선택해주세요</StyledInputLabel>
            <StyledSelectBetweenWrapper>
                <StyleSelectButtonSmall onClick={handleStatus} name="activity" value="게으름" active={activity === "게으름" && true}>게으름</StyleSelectButtonSmall>
                <StyleSelectButtonSmall onClick={handleStatus} name="activity" value="보통" active={activity === "보통" && true}>보통</StyleSelectButtonSmall>
                <StyleSelectButtonSmall onClick={handleStatus} name="activity" value="활발" active={activity === "활발" && true}>활발</StyleSelectButtonSmall>
                <StyleSelectButtonSmall onClick={handleStatus} name="activity" value="많이 활발" active={activity === "많이 활발" && true}>많이 활발</StyleSelectButtonSmall>
            </StyledSelectBetweenWrapper>
            
            <StyledInputLabel>{kind === "강아지" ? "견" : "묘"}종을 선택해주세요</StyledInputLabel>
            <BreedComboBox kind={kind} status={status} setStatus={setStatus} breed={breed} />


            <StyledSelectBetweenWrapper>
                <StyledSelectButtonBig onClick={handleStatus} name="sex" value="수컷" active={sex === "수컷" && true}>수컷</StyledSelectButtonBig>
                <StyledSelectButtonBig onClick={handleStatus} name="sex" value="암컷" active={sex === "암컷" && true}>암컷</StyledSelectButtonBig>
            </StyledSelectBetweenWrapper>

            
            <StyledInputLabel>중성화 수술 유무</StyledInputLabel>
            <StyledSelectBetweenWrapper>
                <StyledSelectButtonBigNoMargin onClick={handleStatus} name="neutralization" value={true} active={neutralization === "true" && true}>O</StyledSelectButtonBigNoMargin>
                <StyledSelectButtonBigNoMargin onClick={handleStatus} name="neutralization" value={false} active={neutralization === "false" && true}>X</StyledSelectButtonBigNoMargin>
            </StyledSelectBetweenWrapper>

            {(petName && body_format && activity && breed && sex && neutralization) ?
                <StyledGoToUseButton onClick={goToMenu}>프로필 수정하기</StyledGoToUseButton>
                : <StyledGoToUseButtonDisabled>프로필 수정하기</StyledGoToUseButtonDisabled>
            }
        </>
    )
}

const mapStateToProps = state => {
    return { 
        user: state.user,
        petInfo: state.petInfo 
    }
}

const mapDispatchToProps = dispatch => {
    return { 
        dispatchPetInfo: {
            dispatchSetPetID: id => dispatch(setPetID(id)),
            dispatchSetPetInfo : (owner, name, age, weight, body_format, kind, activity, breed, sex, neutralization) => dispatch(setPetInfo(owner, name, age, weight, body_format, kind, activity, breed, sex, neutralization)),
            dispatchSetPetImage : image => dispatch(setPetImage(image))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ModifyMyPetPage));


const StyledBackGround = styled.div`
  position: absolute;
  z-index: -1;
  top: 0;
  right: 0;
  width: 100%;
  height: 225px;
  background-image: url(${MAIN_TOP_BG});
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 0 0 25px 25px;
`;

// basic
const StyledMainInfo = styled.div`
    display: flex;
    padding: 25px 0 10px;
    font-size: 28px; 
    font-weight: normal;
    color: #FFFFFF;
    letter-spacing: -1.4px;
`;

const StyledSubInfo = styled.div`
    font-size: 15px;
    color: #FFFFFF;
    font-weight: 300;
    letter-spacing: -0.75px;
    line-height: 1.47;
    margin: 15px 0;
`;

// ab. inputs
const StyledInputLabel = styled.label`
    display: block;
    font-weight: normal;
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



// 추가 개발

const StyledSelectButtonBig = styled.button`
  outline: none;
  background: inherit;
  border:none;
  box-shadow:none;

  width: 49%;
  height: 45px;
  letter-spacing: -0.85px;
  font-size: 16px;
  border: 1px solid #A5A4A4;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #A5A4A4;
  border-radius: 5px;
  margin-top: 20px;
  cursor: pointer;

  ${(props) =>
    props.active &&
    css`
      border: 2px solid #e16a49 ;
      color: #e16a49;
    `}
`;

const StyleSelectButtonSmall = styled(StyledSelectButtonBig)`
  width: 24%;
  margin: 0;
`;

const StyledSelectButtonBigNoMargin = styled(StyledSelectButtonBig)`
    margin: 0;
`;

