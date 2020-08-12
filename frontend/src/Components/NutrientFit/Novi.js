import React, { useEffect, useState } from "react";
import { ResponsiveBar } from '@nivo/bar';

const NoviGraph = ({ data = [] , keys }) => {
    const [screenWidth, setScreenWidth] = useState(window.screen.width);

    const handleScreenWidth = () => {
      let { width } = window.screen;
      setScreenWidth(width)
      console.log(width)
      console.log(screenWidth)
    }
    // 반응형 그래프 생김새!
    useEffect(()=>{
      window.addEventListener('resize', handleScreenWidth)
      return () => window.removeEventListener('resize', handleScreenWidth)
    }, [])

  return (
    <ResponsiveBar
        data={data}
        keys={keys}
        indexBy="item"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        layout={screenWidth < 1024 ? "horizontal" : "vertical"}
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
        // fill={[
        //     {
        //         match: {
        //             id: 'fries'
        //         },
        //         id: 'dots'
        //     },
        //     {
        //         match: {
        //             id: '간식 temp'
        //         },
        //         id: 'lines'
        //     }
        // ]}
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
}

export default NoviGraph;