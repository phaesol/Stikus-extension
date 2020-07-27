import React, { useEffect, useState } from 'react';
import NoviGraph from './Novi';
import { useFetchData } from '../../Hooks/useFetchData';

// 플로우를, 처음에 기준 그래프를 띄워주는게 아니라
// 사료나 간식을 선택하면, 빨간줄, limit를 생성해주자. + 양 미세조정 가능하게.

const tempStyle={
  height:"93vh"
}

function AmountCalculator({ standard }) {
  const [feed, nutrient] = useFetchData();
  const [keys, setKeys] = useState([]);
  const [feedKey, setFeedKey] = useState([]);
  const [feedAmount, setFeedAmount] = useState(1);
  const [nutrientKey, setNutrientKey] = useState([]);
  const [nutrinetAmount, setNutrientAmount] = useState(1)
  const initialDataState = [
      {
          "item": "칼로리(Kcal)",
      },
      {
          "item": "수분량",
      },
      {
          "item": "조단백(g)",
      },
      {
          "item": "조지방(g)",
      },
      {
          "item": "조섬유(g)",
      },
      {
          "item": "조회분(g)",
      },
      {
          "item": "칼슘(g)",
      },
      {
          "item": "인(g)",
      }
    ]
  const [data, setData] = useState(initialDataState)

  const filterData = (type, id) => {
    if (type==="feed") {
      return feed.filter(object => {
        return object['id'] === parseInt(id)
      })
    } else if (type==="nutrient") {
      return nutrient.filter(object => {
        return object['id'] === parseInt(id)
      })
    }
  }

  const useHandleFeedData = async(event) => {
    const { id } = event.target;
    const targetFeedData = await filterData("feed", id)
    // 넣을껀 target id를 가진 하나의 것이다.
    const { 
      name,
      calorie,
      moisture,
      crude_protein,
      crude_fat,
      crude_fiber,
      crude_ash,
      calcium,
      phosphorus
    } = targetFeedData[0];
    
    // console.log("cal" , calorie)
    // console.log(data)

    let tempData = data

    if (tempData[0].hasOwnProperty(name)) {
      // key 값이 있는지 확인
      for(let i=0; i<tempData.length; i++) {
        delete tempData[i][name]
      }
    } else {

      // 추천값 곱하고 소숫점 2자리 수에서 반올림, toFixed를 쓰면 string이 되기 때문에 연산 후 Float 형변환
      tempData[0][name] = parseFloat((parseFloat(calorie)*feedAmount).toFixed(2))
      tempData[1][name] = parseFloat((parseFloat(moisture)*feedAmount).toFixed(2))
      tempData[2][name] = parseFloat((parseFloat(crude_protein)*feedAmount).toFixed(2))
      tempData[3][name] = parseFloat((parseFloat(crude_fat)*feedAmount).toFixed(2))
      tempData[4][name] = parseFloat((parseFloat(crude_fiber)*feedAmount).toFixed(2))
      tempData[5][name] = parseFloat((parseFloat(crude_ash)*feedAmount).toFixed(2))
      tempData[6][name] = parseFloat((parseFloat(calcium)*feedAmount).toFixed(2))
      tempData[7][name] = parseFloat((parseFloat(phosphorus)*feedAmount).toFixed(2))
    }

    setData(tempData)
    if (!tempData[0].hasOwnProperty(name)) {
      setFeedKey([])
    } else {
      setFeedKey([name])
    }  
  };

  const useHandleNutrientData = async(event) => {
    // 여기서 setData로 초기화?
    const { id } = event.target;
    const targetNutrientData = await filterData("nutrient", id)

    // console.log(targetNutrientData)

    // 넣을껀 target id를 가진 하나의 것이다.
    const { 
      name,
      calorie,
      moisture,
      crude_protein,
      crude_fat,
      crude_fiber,
      crude_ash,
      calcium,
      phosphorus
    } = targetNutrientData[0];
    
    // console.log("cal" , calorie)
    // console.log(data)

    let tempData = data

    if (tempData[0].hasOwnProperty(name)) {
      // key 지워주자
      setNutrientKey(nutrientKey.filter(item => item !== name))

      // key 값이 있는지 확인
      for(let i=0; i<tempData.length; i++) {
        delete tempData[i][name]
      }
    } else {
      // 추천값 곱하고 소숫점 2자리 수에서 반올림
      tempData[0][name] = parseFloat((parseFloat(calorie)*nutrinetAmount).toFixed(2))
      tempData[1][name] = parseFloat((parseFloat(moisture)*nutrinetAmount).toFixed(2))
      tempData[2][name] = parseFloat((parseFloat(crude_protein)*nutrinetAmount).toFixed(2))
      tempData[3][name] = parseFloat((parseFloat(crude_fat)*nutrinetAmount).toFixed(2))
      tempData[4][name] = parseFloat((parseFloat(crude_fiber)*nutrinetAmount).toFixed(2))
      tempData[5][name] = parseFloat((parseFloat(crude_ash)*nutrinetAmount).toFixed(2))
      tempData[6][name] = parseFloat((parseFloat(calcium)*nutrinetAmount).toFixed(2))
      tempData[7][name] = parseFloat((parseFloat(phosphorus)*nutrinetAmount).toFixed(2))
    
      setNutrientKey([...nutrientKey, name])
    }
    // console.log(tempData)
    setData(tempData)
  }

  useEffect(() => {
    // console.log("작동")
    console.log("data",data)
    console.log("위아래")
    console.log("standard", standard)
    // feed & nutrient 합치게 생성
    // let mergeKeys = new Array();
    // mergeKeys = mergeKeys.concat(feedKey, nutrientKey)
    // setKeys(mergeKeys) 

    setKeys(
      new Array().concat(feedKey, nutrientKey)
    )

    // console.log("feed keys", feedKey)
    // console.log("nutrient Keys", nutrientKey)

  }, [data, feedKey, nutrientKey])

  const useReset = () => {
    setData(initialDataState);
    setKeys([])
    setFeedKey([])
    setNutrientKey([])
  }

  return (
    <div>

      <div>standard data</div>
      기준 이름: {standard.name} <br />
      기준 칼로리: {standard.calorie} <br />
      기준 수분량: {standard.moisture} <br />
      기준 단백질: {standard.crude_protein} <br />
      기준 조지방: {standard.crude_fat} <br />
      기준 조섬유: {standard.crude_fiber} <br />
      기준 ~~: {standard.crude_ash} <br />
      기준 칼슘: {standard.calcium} <br />
      기준 인: {standard.phosphorus} <br />
      <div style={tempStyle}>
        <NoviGraph data={data} keys={keys} />

      </div>
      

      
      <div>
        {feed && feed.map(data=> 
          <button key={data.id} id={data.id} onClick={useHandleFeedData}>{data.name}</button>)}
        <br />   <br />   <br />   <br />   <br />   
        
        {nutrient && nutrient.map(data=> 
          <button key={data.id} id={data.id} onClick={useHandleNutrientData}>{data.name}</button>)}
        <br />   <br />   <br />   <br />   <br />   

        <button onClick={useReset}>🗑</button>
      </div>
    </div>
  );
}

export default AmountCalculator;
