import React, { useState } from 'react';
// 아이 상태 체크 후 양계산


function CheckStatus() {
    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');
    
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

        </>
    )
}


export default CheckStatus;