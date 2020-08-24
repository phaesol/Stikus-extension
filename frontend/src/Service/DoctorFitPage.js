import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';
// import DocterFit from '../Components/DoctorFit';
import AgeFit from '../Components/DoctorFit/AgeFit.js';
import axios from "axios";
import { BACKEND } from '../config';
import ImageField from '../Components/Useful/ImageField';
// 이 컴포넌트에서는 유저 정보와 반려동물 정보를 저장하는 용도로 사용합니다!


function DoctorFitPage () {
    const [user, setUser] = useState({
        member_id: "로그인 안한 유저 ID",
        member_name: "닥터맘마",
      })

    const { member_id , member_name } = user;
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

    const { pet_name, age1, age2, weight1, weight2 } = status;
 
    const handleStatus = (event) => {
        // 여러 input요소들을 저장하는 공간입니다!
        const target = event.target;
        const { name } = target;
        const value = target.name === 'ispregnant' || target.name === 'neutralization' ? target.checked : target.value;
        // console.log(...status)
        // console.log([name])
        // console.log(value)
        setStatus({
          ...status,
          [name]: value
        })
      }
      
    const receiveMessage = (event) => {
        if (!event.data.source.includes('react-devtools') || event.data.source == undefined) {
            // react-devtool 때문에 local에서 작동안되는거.... 디버깅모드!
        console.log(event.data)
        const { member_id, member_name } = event.data;
        // console.log("동작!")
        setUser({
            member_id: member_id,
            member_name: member_name,
        })

        // setStatus({
        //     ...status,
        //     owner: member_id,
        // })
        }
        // console.log('parent message!!!!!!!!!!!!!!!!!!!!!!!');
        // console.log(event.data); // { childData : 'test data' }
        // console.log("event.origin : " + event.origin); // http://123.com(자식창 도메인)        
      }

    
    const [imageData, setImageData] = useState('');

    useEffect(() => {
        // drmamma 서비스에서 회원정보를 가져오는 eventListener 등록 및 해제입니다.
        window.addEventListener("message", receiveMessage)
        return () => window.removeEventListener("message", receiveMessage)
      }, [])








    
    
    const parseAgeToMonth = () => {
        console.log("파먼투에이지 작동")
        let ageOfMonth = 0
        if (age1) {
            ageOfMonth += parseInt(age1)*12
        }
        if (age2) {
            ageOfMonth += parseInt(age2)
        }
        return ageOfMonth
    }
    
    const parseMonthAge = useMemo(parseAgeToMonth, [age1, age2]);
    // age1, age2가 안바뀌면 메모이제이션

    const saveMyPetData = useCallback(async() => {
        const myPetFormData = new FormData();
        const parseWeight = weight1+"."+weight2
        // const postMyPetData = {
        //     "owner": member_id, "name": pet_name, "age": parseMonthAge, "weight": parseWeight
        // }
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
        .then(res => console.log(res.data, "success!!"))
        .catch(err => console.log("에러는", err))


        // console.log(postMyPetData)
    }, [member_id, pet_name, parseMonthAge, weight1, weight2, imageData])

    // useEffect(() => {
    //     // 디버깅용 !
    //     console.log("user: ",user)
    //     console.log("status: ",status)
    // }, [user, status])

    const [step, setStep] = useState(0);

    const prevAction = (event) => {
        if (event.target.id === "result_page_prev"){
            setStep(step - 2)
        } else {
            setStep(step - 1)}
        }

    const nextAction = () => {
        setStep(step + 1)
        saveMyPetData();
      }
    const [mypetImageSrc, setMyPetImageSrc] = useState('');
    const detectMyPetImageUpload = (event) => {
        const previewPath = URL.createObjectURL(event.target.files[0])
        setMyPetImageSrc(previewPath)
        setImageData(event.target.files[0])
    }
    if (step === 0) 
        return (
            <SubContainer>
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

                {pet_name && <Button1 onClick={nextAction}>닥터핏 이용하기</Button1>}
                
                <button onClick={saveMyPetData}>정보 POST요청</button>
            </SubContainer>
        )


    if (step === 1) 
        return (
            <SubContainer>
                <AgeFit status={status} parseAge={parseMonthAge} />
                <Button1 onClick={prevAction}>이전</Button1>
                
            </SubContainer>
        )
    }

export default React.memo(DoctorFitPage);


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