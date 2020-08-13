import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// import DocterFit from '../Components/DoctorFit';
import AgeFit from '../Components/DoctorFit/AgeFit.js';

// 이 컴포넌트에서는 유저 정보와 반려동물 정보를 저장하는 용도로 사용합니다!


function DoctorFitPage () {
    const [user, setUser] = useState({
        member_id: "",
        member_name: "",
      })

    const { member_id , member_name } = user;
    const initialState = [{
            owner: "",
            pet_name: "",
            age1: 0,
            age2: 0,
            // weight1: 0,
            // weight2: 0,
            // neutralization: false,
            // bodyFormat: "",
            // ispregnant: false,
        }]
    const [status, setStatus] = useState(initialState)

    const { owner, pet_name, age1, age2 } = status;
 
    const handleStatus = (event) => {
        // 여러 input요소들을 저장하는 공간입니다!
        const target = event.target;
        const { name } = target;
        const value = target.name === 'ispregnant' || target.name === 'neutralization' ? target.checked : target.value;
        // console.log(...status)
        console.log([name])
        console.log(value)
        setStatus({
          ...status,
          [name]: value
        })
      }
      
    const receiveMessage = (event) => {
 
        if (event.data.source !==  'react-devtools-bridge') {
            // react-devtool 때문에 local에서 작동안되는거.... 디버깅모드!

        const { member_id, member_name } = event.data;
        console.log("동작!")
        setUser({
            member_id: member_id,
            member_name: member_name,
        })

        setStatus({
            ...status,
            owner: member_id,
        })
        }
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

                나이
                <select onChange={handleStatus} name="age1" id="input-age1" value={age1}>
                    <option>0</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
                    <option>13</option>
                    <option>14</option>
                    <option>15</option>
                    <option>16</option>
                    <option>17</option>
                    <option>18</option>
                    <option>19</option>
                    <option>20</option>
                    <option>21</option>
                    <option>22</option>
                    <option>23</option>
                    <option>24</option>
                    <option>25</option>
                    <option>26</option>
                    <option>27</option>
                    <option>28</option>
                    <option>29</option>
                    <option>30</option>
                </select>
                <strong>년</strong>
                <select onChange={handleStatus} name="age2" id="input-age2" value={age2}>
                    <option value="0">0 개월</option>
                    <option value="1">1 개월</option>
                    <option value="2">2 개월</option>
                    <option value="3">3 개월</option>
                    <option value="4">4 개월</option>
                    <option value="5">5 개월</option>
                    <option value="6">6 개월</option>
                    <option value="7">7 개월</option>
                    <option value="8">8 개월</option>
                    <option value="9">9 개월</option>
                    <option value="9">10 개월</option>
                    <option value="9">11 개월</option>
                </select>

                <CustomH1>반려동물 이름을 입력해주세요 <span>😺</span></CustomH1> 

                <InputStatus onChange={handleStatus} name="pet_name" value={pet_name} />

                {pet_name && <Button onClick={nextAction}>반려동물 맞춤 데이터 알아보기!</Button>}

            </>
        )


    if (step === 1) 
        return (
            <>
                <AgeFit status={status}/>
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