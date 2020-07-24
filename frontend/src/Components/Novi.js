import React from "react";
import { ResponsiveBar } from '@nivo/bar';
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const datas = [
    {
      "nutrient": "칼로리",
      "촉촉 사료": 598,
    //   "촉촉 사료Color": "hsl(266, 70%, 50%)",
      "영양제 temp": 51,
    //   "영양제 tempColor": "hsl(202, 70%, 50%)",
      "간식 temp": 23,
    //   "간식 tempColor": "hsl(41, 70%, 50%)",
      },
    {
      "nutrient": "수분량",
      "촉촉 사료": 322,
    //   "촉촉 사료Color": "hsl(230, 70%, 50%)",
      "영양제 temp": 13,
    //   "영양제 tempColor": "hsl(295, 70%, 50%)",
      "간식 temp": 5,
    //   "간식 tempColor": "hsl(123, 70%, 50%)",
      },
    {
      "nutrient": "조단백",
      "촉촉 사료": 39,
    //   "촉촉 사료Color": "hsl(313, 70%, 50%)",
      "영양제 temp": 13,
    //   "영양제 tempColor": "hsl(121, 70%, 50%)",
      "간식 temp": 71,
    //   "간식 tempColor": "hsl(64, 70%, 50%)",
      },
    {
      "nutrient": "조지방",
      "촉촉 사료": 35,
    //   "촉촉 사료Color": "hsl(145, 70%, 50%)",
      "영양제 temp": 100,
    //   "영양제 tempColor": "hsl(116, 70%, 50%)",
      "간식 temp": 143,
    //   "간식 tempColor": "hsl(115, 70%, 50%)",
      },
    {
      "nutrient": "조섬유",
      "촉촉 사료": 150,
    //   "촉촉 사료Color": "hsl(285, 70%, 50%)",
      "영양제 temp": 100,
    //   "영양제 tempColor": "hsl(264, 70%, 50%)",
      "간식 temp": 156,
    //   "간식 tempColor": "hsl(337, 70%, 50%)",
      },
    {
      "nutrient": "조회분",
      "촉촉 사료": 179,
    //   "촉촉 사료Color": "hsl(275, 70%, 50%)",
      "영양제 temp": 100,
    //   "영양제 tempColor": "hsl(256, 70%, 50%)",
      "간식 temp": 188,
    //   "간식 tempColor": "hsl(341, 70%, 50%)",
      },
    {
      "nutrient": "칼슘",
      "촉촉 사료": 169,
    //   "촉촉 사료Color": "hsl(115, 70%, 50%)",
      "영양제 temp": 163,
    //   "영양제 tempColor": "hsl(232, 70%, 50%)",
      "간식 temp": 119,
    //   "간식 tempColor": "hsl(159, 70%, 50%)",
      },
    {
      "nutrient": "인",
      "촉촉 사료": 169,
    //   "촉촉 사료Color": "hsl(115, 70%, 50%)",
      "영양제 temp": 163,
    //   "영양제 tempColor": "hsl(232, 70%, 50%)",
      "간식 temp": 119,
    //   "간식 tempColor": "hsl(159, 70%, 50%)",
       }
  ]
// console.log(datas)

const NoviGraph = ({ data , keys }) => (
    <ResponsiveBar
        data={data}
        // keys={[ '닥터맘마 강아지 습식사료 오리 촉촉사료' ]}
        keys={keys}
        indexBy="item"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        colors={{ scheme: 'nivo' }}
        // defs => 위아래
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'fries'
                },
                id: 'dots'
            },
            {
                match: {
                    id: '간식 temp'
                },
                id: 'lines'
            }
        ]}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'item',
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'amount',
            legendPosition: 'middle',
            legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
    />
)

export default NoviGraph;