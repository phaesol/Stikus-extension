import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
// import DocterFit from '../Components/DoctorFit';
// import AgeFit from '../Components/DoctorFit/AgeFit.js';
import axios from "axios";
import { BACKEND } from '../config';
// import ImageField from '../Components/Useful/ImageField';
// 이 컴포넌트에서는 유저 정보와 반려동물 정보를 저장하는 용도로 사용합니다!
import { setPetInfo } from '../Redux/Actions/petInfoActions'
import { connect } from 'react-redux';

function DoctorFitPage ({ petInfo, dispatchSetPetInfo }) {
    // hooks
    const history = useHistory();
    const initialState = [{
        // owner: "",
        pet_name: "",
        age1: "0",
        age2: "0",
        weight1: "0",
        weight2: "0",
        // neutralization: false,
        // bodyFormat: "",
        // ispregnant: false,
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

    const saveMyPetData = useCallback(async() => {
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
        // 이미지 파일 업로드 시 미리보기용 blob URL 추출
        const previewPath = URL.createObjectURL(event.target.files[0])
        setMyPetImageSrc(previewPath)
        setImageData(event.target.files[0])
    }
    const actionDispaths = () => {
        dispatchSetPetInfo("안녕");   
    }
    if (mypetImageSrc){
        console.log(mypetImageSrc)
    }
     
    return (
        <SubContainer>
            <button onClick={actionDispaths}>액션 함수 실행!</button>
            <MainInfo>{member_name && <div>{member_name}/닥터핏을 이용해보세요</div>}</MainInfo>
            
            <ProfileImgWrapper>
                <input onChange={detectMyPetImageUpload} type="file" />
                {mypetImageSrc ? <ProfileImg src={mypetImageSrc} />
                                : <ProfileImg src="https://littledeep.com/wp-content/uploads/2019/04/littledeep_puppy_style1.png" />
                }
            </ProfileImgWrapper>
            <h4>반려견 이름</h4>
            <NameInput onChange={handleStatus} name="pet_name" value={pet_name} />

            <div>
                나이
                <select onChange={handleStatus} name="age1" id="input-age1" value={age1}>
                    {[...Array(31).keys()].map(i=> <option>{i}</option>)}
                </select>

                <strong>년</strong>
                
                <select onChange={handleStatus} name="age2" id="input-age2" value={age2}>
                    {[...Array(12).keys()].map(i=> <option value={i}>{i} 개월</option>)}
                </select>
            </div>

            <div>
                체중
                <select onChange={handleStatus} name="weight1" id="input-weight1" value={weight1}>
                    {[...Array(12).keys()].map(i=> <option value={i}>{i} 개월</option>)}
                </select>
                <strong>.</strong>
                <select onChange={handleStatus} name="weight2" id="input-weight2" value={weight2}>
                    {[...Array(10).keys()].map(i=> <option value={i}>{i} kg</option>)}
                </select>
            </div>

            {pet_name && <Button1 onClick={goToMenu}>닥터핏 이용하기</Button1>}
            
            {/* <button onClick={saveMyPetData}>정보 POST요청</button> */}
        </SubContainer>
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

const SubContainer = styled.div`
    // border: 10px; solid blue;
`;

const MainInfo = styled.h3`
    font-weight: bold;
    width: 320px;
`;

const NameInput = styled.input.attrs({
    type: 'text',
})`
    min-width: 280px;
    border-radius: 13px;
    padding: 10px;
    font-size: 1.5rem;
`;

const Button1 = styled.div`
    // transition: all ease 1s;
    // margin-top: 20px;
    border: 2px solid black;
    padding: 20px;
    width: 300px;
    text-align: center;
    cursor: pointer;
`;

const ProfileImgWrapper = styled.div`
    // border: 1px solid red;
    display: flex;
    flex-direction: column;
    align-items: center;
    
`;
const ProfileImg = styled.img.attrs({
    width: '125px',
    height: '125px'
})` 

    border: 1px solid red;
    width: 125px !important;
    min-heigth: 125px !important;
    vertical-align: middle;
    overflow: hidden;
    border-radius: 50%;
`;