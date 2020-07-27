import React, { useState, useEffect } from 'react';
import AmountCalculator from '../Components/AmountCalculator/AmountCalculator';

function ACpage() {
  // const [age, setAge] = useState(''); // checkbox로 n년 m개월로 가야하나..
  const [step, setStep] = useState(0)
  const [status, setStatus] = useState({
    age: "",
    weight: "",
    neutralization: "",
    bodyFormat: "",
    ispregnant: "",
  })
  const { age, weight, neutralization, bodyFormat, ispregnant } = status;

  // const [weight, setWeight] = useState('');  // n . m kg?
  // const [neutralization, setNeutralization] = useState(false) // 중성화 여부
  // const [bodyFormat, setBodyFormat] = useState('') // 체형(비만, 뚱뚱.. etc)
  // const [ispregnant, setPregnant] = useState(false) // 임신여부
  // 활발해요? < 이건 아직 필요를 모르겠음
  const [standard, setStandard] = useState({
    'isSet': false, 
    'calorie': "", 
    'moisture': "",
    'crude_protein': "",
    'crude_fat': "",
    'crude_fiber': "",
    'crude_ash': "",
    'calcium': "",
    'phosphorus': "" 
  })

  const handleStatus = (event) => {
    const { value, name } = event.target;
    setStatus({
      ...status,
      [name]: value
    })
  }

  const factorCalculate = () => {
    // factor 계산기
    if (bodyFormat === "fat") {
      return 1
    } 
    if (bodyFormat === "chubby") {
      return 1.4
    } 
    if (age*12 <= 4) {
      return 3;
    } 
    else if (age*12 <= 12 || ispregnant) {
      return 2; // 임신시 중성화 조건은 당연히 pass일거고, 1.8 or 1.4인데 , 만약 뚱뚱할경우 + 임신이면 => 1 또는 1.4가 나와버리는데 ispregnant condition을 bodyFormat위로 빼야하나? 이건 조건을 물어봐야할 것 같음
    }
    else if (age*12 <= 84) {
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
    const RER = weight * 30 + 70

    const FACTOR = factorCalculate()
    // console.log(FACTOR)

    // WATER => weight X 50~100
    // let FACTOR = 1
 

    
    // 근데 여기서 건식, 습식을 나눠버리믄.
    // 사료량이랑 비교해줬을 때 어떻게 해야하지.......흠
    // 나누지 말고 통일할까
    const DER = Math.round(RER * FACTOR);
 
    const WATER = {
      minimun: Math.round(weight * 50),
      maximun: Math.round(weight * 100)
    };
    return { DER, WATER }
  } 

  const getCalculateStatus = () => {
      
      const { DER, WATER } = calculateStatus();
      setStandard({
        name: '맞춤 영양소 제공량',
        calorie: DER, 
        moisture: WATER.minimun + '~' + WATER.maximun,
        crude_protein: 100,
        crude_fat: 100,
        crude_fiber: 100,
        crude_ash: 100,
        calcium: 100,
        phosphorus: 100 
      })
      setStep(2)
  }

  useEffect(() => {
    console.log(standard)
    console.log(status)
  }, [standard, age])

  if (!standard.isSet)
    return (
        <>

            <label htmlFor="age">나이</label>
            <input onChange={handleStatus} type="text" name="age" />
            <br />
            <label htmlFor="weight">몸무게</label>
            <input onChange={handleStatus} type="text" name="weight" />
            <br />
            <label htmlFor="neutralization">중성화 여부</label>
            <input onChange={handleStatus} type="checkbox" name="neutralization" />
            <br />
            <label htmlFor="bodyFormat">체형</label>
            <input onChange={handleStatus} type="text" name="bodyFormat" />
            <br />
            <label htmlFor="ispregnant">임신여부</label>
            <input onChange={handleStatus} type="checkbox" name="ispregnant" />
            <br />
            <button onClick={getCalculateStatus}>이전 버튼만 있으면 될 듯</button>
             
            <button onClick={getCalculateStatus}>이거 하면 딱.. 다 계산값 return</button>
             
        </>
    )
  
    return (
      <AmountCalculator props={standard}/>
    )

  }


export default ACpage;
