import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components';
import axios from "axios";
import { BACKEND } from '../../config';

import { setPetID, setPetInfo, setPetImage } from '../../Redux/Actions/petInfoActions';
import { connect } from 'react-redux';

import DEFAULT_PIC from '../../Images/Basic/basic-dog-picture.png';
import MODIFY_ICON from '../../Images/Basic/modify-icon1.png';
import MAIN_TOP_BG from "../../Images/NutrientFit/common/main-top-bg.svg";

import BreedComboBox from '../../Components/NutrientFit/BreedComboBox';

function AddMyPetPage ({ dispatchPetInfo }) {
    const history = useHistory();
    const initialState = {
        petName: "",
        age1: "0",
        age2: "0",
        weight1: "0",
        weight2: "0",
        body_format: "",
        isDog: "true",
        activity: "",
        breed: "",
        sex: "",
        neutralization: "",
    }
    const [status, setStatus] = useState(initialState)

    const [user, setUser] = useState({
        memberId: "로그인 안한 유저 ID",
        memberName: "닥터맘마",
      })
    const { petName, age1, age2, weight1, weight2, body_format, isDog, activity, breed, sex, neutralization } = status;
    const [mypetImageSrc, setMyPetImageSrc] = useState('');
    const [imageData, setImageData] = useState('');

    // destructuring
    const { memberId , memberName } = user;

    const handleStatus = (event) => {
        // 여러 input요소들을 저장하는 공간입니다! // 페이지의 모든 요소에 다 의존적이기 때문에 useCallback 사용하지 않겠음.
        const { name } = event.target;
        const { value } = event.target;
        // console.log(event.target)
        setStatus({
          ...status,
          [name]: value
        })
      }
    
    
    useEffect(() => {
        console.log(status)
    }, [status])

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
            parseWeight += "." + weight2
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
            body_format, isDog, activity, breed, sex, neutralization
        ) // (이미지는 backend에 보낸 후에 다시 저장!)

        // 2. backend에 저장
        myPetFormData.append("owner", memberId) 
        myPetFormData.append("name", petName) 
        myPetFormData.append("age", parseMonthAge) 
        myPetFormData.append("weight", parseWeight) 
        myPetFormData.append("image", imageData)
        
        // 추가 데이터
        myPetFormData.append("body_format", body_format)
        myPetFormData.append("activity", activity)
        myPetFormData.append("breed", breed)     
        myPetFormData.append("neutralization", neutralization)
        isDog === 'true' ? myPetFormData.append("kind", "강아지") : myPetFormData.append("kind", "고양이")
        sex === 'true' ? myPetFormData.append("sex", "수컷") : myPetFormData.append("sex", "암컷")   



        // FormData의 key 확인
        for (let key of myPetFormData.keys()) {
            console.log("키", key);
        }
        
        // myPetFormData의 value 확인
        for (let value of myPetFormData.values()) {
            console.log("밸", value);
        }
        return myPetFormData
        
    }
    const saveMyPetData = () => {
        /* 
            status라는 state에 저장된 pet정보를 가져와서 
            1. redux store에 저장
            2. backend(django server)에 post요청 및 저장
        */
        const formData = makeFormMyPetData();

        axios({
            method: 'post',
            url: `${BACKEND}/mypet`,
            data: formData,
            header: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
              },
        })
        .then(res => {
            const { id: savedID, image : savedImage } = res.data;

            // 이미지와 ID는 백엔드에 저장 후 받아와야 하기 때문에 여기서 store에 dispatch합니다
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
            <StyledMainInfo>프로필 등록하기</StyledMainInfo>
            
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
                    <StyledSelectButtonBig onClick={handleStatus} name="isDog" value={true} active={isDog === "true" && true}>강아지</StyledSelectButtonBig>
                    <StyledSelectButtonBig onClick={handleStatus} name="isDog" value={false} active={isDog === "false" && true}>고양이</StyledSelectButtonBig>
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

            <StyledInputLabel>{isDog === "true" ? "견" : "묘"}종을 선택해주세요</StyledInputLabel>
            <BreedComboBox isDog={isDog} status={status} setStatus={setStatus} />


            <StyledSelectBetweenWrapper>
                <StyledSelectButtonBig onClick={handleStatus} name="sex" value="수컷" active={sex === "수컷" && true}>수컷</StyledSelectButtonBig>
                <StyledSelectButtonBig onClick={handleStatus} name="sex" value="암컷" active={sex === "암컷" && true}>암컷</StyledSelectButtonBig>
            </StyledSelectBetweenWrapper>

            <StyledInputLabel>중성화 수술 유무</StyledInputLabel>
            <StyledSelectBetweenWrapper margin->
                <StyledSelectButtonBigNoMargin onClick={handleStatus} name="neutralization" value={true} active={neutralization === "true" && true}>O</StyledSelectButtonBigNoMargin>
                <StyledSelectButtonBigNoMargin onClick={handleStatus} name="neutralization" value={false} active={neutralization === "false" && true}>X</StyledSelectButtonBigNoMargin>
            </StyledSelectBetweenWrapper>


            {petName && (age1 || age2) && (weight1 || weight2) ?
                <StyledGoToUseButton onClick={goToMenu}>닥터핏 이용하기</StyledGoToUseButton>
                : <StyledGoToUseButtonDisabled>닥터핏 이용하기</StyledGoToUseButtonDisabled>
            }
        </>
    )
}

const mapDispatchToProps = dispatch => {
    return { 
        dispatchPetInfo: {
            dispatchSetPetID: id => dispatch(setPetID(id)), 
            dispatchSetPetInfo : (owner, name, age, weight, body_format, isDog, activity, breed, sex, neutralization) => dispatch(setPetInfo(owner, name, age, weight, body_format, isDog, activity, breed, sex, neutralization)),
            dispatchSetPetImage : image => dispatch(setPetImage(image))    
            }
        }
}

export default connect(null, mapDispatchToProps)(React.memo(AddMyPetPage));

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

const StyledSelectInputBig = styled(StyledSelectInput)`
    width: 100%;
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

