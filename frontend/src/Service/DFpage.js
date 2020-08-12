import React, { useState, useEffect } from 'react';
// import AmountCalculator from '../Components/AmountCalculator/AmountCalculator';
import './DFpage.css';
import DocterFit from '../Components/DoctorFit';
// import AddBasket from '../Components/AddBasket';

function DFpage() {
  const [step, setStep] = useState(0)
  const [status, setStatus] = useState({
    pet_name: "",
    age1: 0,
    age2: 0,
    weight1: 0,
    weight2: 0,
    neutralization: false,
    bodyFormat: "",
    ispregnant: false,
  })
  const { pet_name, age1, age2, weight1, weight2, neutralization, bodyFormat, ispregnant } = status;
  const [standard, setStandard] = useState({
    name: "",
    calorie: "", 
    moisture: "",
    crude_protein: "",
    crude_fat: "",
    crude_fiber: "",
    crude_ash: "",
    calcium: "",
    phosphorus: "" 
  })

  const handleStatus = (event) => {

    const target = event.target;
    const { name } = target;
    const value = target.name === 'ispregnant' || target.name === 'neutralization' ? target.checked : target.value;
    
    setStatus({
      ...status,
      [name]: value
    })
  }

  const factorCalculate = () => {
    const ageParseMonth = age1 * 12 + age2
    // FACTOR 계산기
    if (bodyFormat === "fat") {
      return 1
    } 
    if (bodyFormat === "chubby") {
      return 1.4
    } 
    if (ageParseMonth <= 4) {
      return 3;
    } 
    else if (ageParseMonth <= 12 || ispregnant) {
      return 2; // 임신시 중성화 조건은 당연히 pass일거고, 1.8 or 1.4인데 , 만약 뚱뚱할경우 + 임신이면 => 1 또는 1.4가 나와버리는데 ispregnant condition을 bodyFormat위로 빼야하나? 이건 조건을 물어봐야할 것 같음
    }
    else if (ageParseMonth <= 84) {
      if (neutralization) {
        return 1.6
      }
      else {
        return 1.8
      }
    }
    else {
      return 1.4
    } 
  }


  const calculateStatus = () => {
    // DER = RER X Factor
    // DER(일일 권장 칼로리)
    // RER(기초 대사 칼로리)
    // weigth * 30 + 70 (kcal)
    const mergeWeight = parseFloat(weight1+'.'+weight2)
    const RER = mergeWeight * 30 + 70
    // console.log("RER : " , RER)
    // console.log("mergeWeight", mergeWeight)
    const FACTOR = factorCalculate()
    // console.log(FACTOR)

    // WATER => weight X 50~100
    // let FACTOR = 1
 

    
    // 근데 여기서 건식, 습식을 나눠버리믄.
    // 사료량이랑 비교해줬을 때 어떻게 해야하지.......흠
    // 나누지 말고 통일할까
    const DER = Math.round(RER * FACTOR);
    // 습식은 DER * 0.7
    const WATER = {
      minimun: Math.round(mergeWeight * 50),
      maximun: Math.round(mergeWeight * 100)
    };
    return { DER, WATER }
  } 

  const getCalculateStatus = () => {
      
      const { DER, WATER } = calculateStatus();
      setStandard({
        name: '맞춤 영양소 제공량',
        calorie: DER, 
        moisture: WATER.minimun,
        crude_protein: 100,
        crude_fat: 100,
        crude_fiber: 100,
        crude_ash: 100,
        calcium: 100,
        phosphorus: 100 
      })
  }


  const prevAction = (event) => {
    if (event.target.id === "result_page_prev"){
      setStep(step - 2)
    } else {
    setStep(step - 1)
  }
  }
  const nextAction = () => {
    setStep(step + 1)
  }



  useEffect(() => {
    // console.log(standard)
    console.log(status)
  }, [standard, age1, age2 , status])

  useEffect(() => {
    if(step===3) {
      getCalculateStatus()
      // console.log("계산!")
      setTimeout(() => {
        setStep(4)
      }, 250)
    }
  }, [step])

  
  const [myPet, setMyPet] = useState({

  })

  const receiveMessage = (event) => {
    const { member_id } = event.data;
    setMyPet({
      owner: member_id,
    })
    console.log('parent message!!!!!!!!!!!!!!!!!!!!!!!');
    console.log(event.data); // { childData : 'test data' }
    console.log("event.origin : " + event.origin); // http://123.com(자식창 도메인)        
  }

  useEffect(() => {
      window.addEventListener("message", receiveMessage)
      return () => window.removeEventListener("message", receiveMessage)
  }, [])
  
  useEffect(() => {
    console.log("마펫: " , myPet)
  }, [myPet])
  
  if (step === 0) 
    return (
      <>
        <input type="text" onChange={handleStatus} name="pet_name" value={pet_name} />
      
        {pet_name && <button onClick={nextAction}>다음</button>}
      </>
    )

  if (step === 1)
    return (
        <>
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

            <br />

            <select onChange={handleStatus} name="weight1" id="input-weight1" value={weight1}>
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
                <option>31</option>
                <option>32</option>
                <option>33</option>
                <option>34</option>
                <option>35</option>
                <option>36</option>
                <option>37</option>
                <option>38</option>
                <option>39</option>
                <option>40</option>
                <option>41</option>
                <option>42</option>
                <option>43</option>
                <option>44</option>
                <option>45</option>
            </select>
            <strong>.</strong>
            <select onChange={handleStatus} name="weight2" id="input-weight2" value={weight2}>
                <option value="0">0 kg</option>
                <option value="1">1 kg</option>
                <option value="2">2 kg</option>
                <option value="3">3 kg</option>
                <option value="4">4 kg</option>
                <option value="5">5 kg</option>
                <option value="6">6 kg</option>
                <option value="7">7 kg</option>
                <option value="8">8 kg</option>
                <option value="9">9 kg</option>
            </select>

            <br />
            <br />

            
            <button onClick={prevAction}>이전</button>
            {weight1 && age1 ? <button onClick={nextAction}>다음</button> : ""}

        </>
    )
    
  if (step === 2)
  return (
      <>
        <div className="">
            <div>
              <input onChange={handleStatus} type="radio" checked={bodyFormat === "thin" ? true : false} id="thin" name="bodyFormat" value="thin" />
              <label htmlFor="thin">날씬해요</label>
            </div>
            
            <div>
              <input onChange={handleStatus} type="radio" checked={bodyFormat === "ordinary" ? true : false} id="ordinary" name="bodyFormat" value="ordinary" />
              <label htmlFor="ordinary">보통이에요</label>
            </div>

            <div>
              <input onChange={handleStatus} type="radio" checked={bodyFormat === "chubby" ? true : false} id="chubby" name="bodyFormat" value="chubby" />
              <label htmlFor="chubby">통통해요</label>
            </div>

            <div>
              <input onChange={handleStatus} type="radio" checked={bodyFormat === "fat" ? true : false} id="fat" name="bodyFormat" value="fat" />
              <label htmlFor="fat">뚱뚱해요</label>
            </div>
        </div>
          <br />

          중성화여부

          <input onChange={handleStatus} type="checkbox" name="neutralization" checked={neutralization} />
          <br />
   
          <label htmlFor="ispregnant">임신 여부</label>
          <input onChange={handleStatus} type="checkbox" name="ispregnant" checked={ispregnant} />
          <br />
          
          <button onClick={prevAction}>이전</button>
          <button onClick={nextAction}>다음</button>
      </>
  )

  if (step === 3)  
  return (
    <>
      <div>계산중...</div>
    </>
  )

  if (step === 4) 
  return (
    <>
      <p>{pet_name}이의 정보입니다.</p>
      <p>입력 나이 : {age1}년 {age2}개월</p>
      <p>입력 몸무게: {weight1}.{weight2} kg</p>
      <p>중성화 여부: {neutralization ? '중성화' : "중성화 X"}</p> 
      <p>체형: {bodyFormat? bodyFormat : "선택하지 않음"}</p>
      <p>임신 여부: {ispregnant ? '임신' : '임신 X'}</p>

      {/* <AmountCalculator standard={standard} /> */}
      <button onClick={prevAction} id="result_page_prev">이전</button>


      <DocterFit />
    </>
    )



  }

export default DFpage;
