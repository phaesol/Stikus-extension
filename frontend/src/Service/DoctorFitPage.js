import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DocterFit from '../Components/DoctorFit';

// 이 컴포넌트에서는 유저 정보와 반려동물 정보를 저장하는 용도로 사용합니다!


function DoctorFitPage () {
    const [user, setUser] = useState({
        member_id: "",
        member_name: "",
      })

    const { member_id , member_name } = user;

    const [status, setStatus] = useState({
        owner: "",
        pet_name: "",
        age1: 0,
        age2: 0,
        weight1: 0,
        weight2: 0,
        neutralization: false,
        bodyFormat: "",
        ispregnant: false,
      })

    const { owner, pet_name, age1, age2, weight1, weight2, neutralization, bodyFormat, ispregnant } = status;
 
    const handleStatus = (event) => {
        // 여러 input요소들을 저장하는 공간입니다!
        const target = event.target;
        const { name } = target;
        const value = target.name === 'ispregnant' || target.name === 'neutralization' ? target.checked : target.value;
        
        setStatus({
          ...status,
          [name]: value
        })
      }
      
    const receiveMessage = (event) => {
        const { member_id, member_name } = event.data;

        setUser({
            member_id: member_id,
            member_name: member_name,
        })
        setStatus({
            ...status,
            owner: member_id,
        })
        // console.log('parent message!!!!!!!!!!!!!!!!!!!!!!!');
        // console.log(event.data); // { childData : 'test data' }
        // console.log("event.origin : " + event.origin); // http://123.com(자식창 도메인)        
      }
    
    useEffect(() => {
        // drmamma 서비스에서 회원정보를 가져오는 eventListener 등록 및 해제입니다.
        window.addEventListener("message", receiveMessage)
        return () => window.removeEventListener("message", receiveMessage)
      }, [])







    const [step, setStep] = useState(0);

    const prevAction = (event) => {
        if (event.target.id === "result_page_prev"){
            setStep(step - 2)
        } else {
            setStep(step - 1)}
        }

    const nextAction = () => {
        setStep(step + 1)
      }
    





    useEffect(() => {
        // 디버깅용 !
        console.log("user: ",user)
        console.log("status: ",status)
    }, [user, status])

    
    if (step === 0) 
        return (
            <>
                <CustomH1>{member_name && <div>{member_name}님 안녕하세요!</div>}</CustomH1>


                <CustomH1>반려동물 이름을 입력해주세요 😺</CustomH1> 

                <InputStatus onChange={handleStatus} name="pet_name" value={pet_name} />

                {pet_name && <Button onClick={nextAction}>반려동물 맞춤 데이터 알아보기!</Button>}

            </>
        )


    if (step === 1) 
        return (
            <>
            으아
            </>
        )
    }

export default DoctorFitPage;




const CustomH1 = styled.h1`
    font-weight: bold;
`;

const InputStatus = styled.input.attrs({
    type: 'text',
})`
    border: 0;
    border-bottom: 2px solid black;
    padding: 10px;
    font-size: 2.5rem;
`;

const Button = styled.div`
    margin-top: 20px;
    border: 2px solid black;
    padding: 20px;
    width: 320px;
    text-align: center;
`;