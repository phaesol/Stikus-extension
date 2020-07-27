import React, { useState } from 'react';
import AmountCalculator from '../Components/AmountCalculator/AmountCalculator';

function ACpage() {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
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

  const handleInputStatus = (event) => {
      const { name, value } = event.target;
      if(name==="age") {
          setAge(value)
      }
      else {
          setWeight(value)
      }
  }


  const getCalculateStatus = () => {
      
      const { DER, WATER } = calculateStatus();
      console.log(DER, WATER)
  }



  const calculateStatus = () => {

      const DER = 229;
      const WATER = 300;
      return { DER, WATER }
  }

  return (
      <>

          <label for="age">나이</label>
          <input onChange={handleInputStatus} type="text" name="age" />
          
          <label for="weight">몸무게</label>
          <input onChange={handleInputStatus} type="text" name="weight" />

          <button onClick={getCalculateStatus}>이거 하면 딱.. 다 계산값 return</button>
          <AmountCalculator />
      </>
  )
  }


export default ACpage;
