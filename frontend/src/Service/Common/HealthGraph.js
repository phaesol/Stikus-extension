import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';
import { useFetchHealth } from '../../Hooks/useFetchHealth';

import { ResponsiveBar } from '@nivo/bar';

function HealthGraph ({ petInfo }) {
    const initialData = [
        {
            "item": "피부",
            // '주의' : 11,
        },
        {
            "item": "장",
            // '양호': 7,
        },
        {
            "item": "관절",
        },
        {
            "item": "비만",
        },
        {
            "item": "심장",
        },
        {
            "item": "간",
        },
        {
            "item": "종양",
        },
        {
            "item": "신장",
        },
        {
            "item": "호흡기",
        },
        {
            "item": "눈",
        },
        {
            "item": "비뇨기",
        },
        {
            "item": "치아",
        },
        {
            "item": "당뇨",
        },
        {
            "item": "뇌(신경계)",
        },
        {
            "item": "칼슘 인 결핍",
        },
    ]
    const [data, setData] = useState(initialData);
    const { id } = petInfo;
    const keys = ['주의', '양호']
    const [healthData] = useFetchHealth(id);
    
    useEffect(() => {
        if (!healthData) {
            return
        }
        setData(healthData)
    }, [healthData])
    return (
        <StyledContainer>
        <ResponsiveBar
            label={false}
            data={data}
            keys={keys}
            indexBy="item"
            margin={{ top: 25, right: 30, bottom: 25, left: 67 }}
            padding={0.3}
            layout="horizontal"
            colors={{ scheme: 'set1' }}
            enableGridX={true}
            enableGridY={false}
            borderRadius={10}
            // defs => 위아래
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 0,
                tickPadding: 5,
                tickRotation: 0,
                legend: '',
                legendPosition: 'middle',
                legendOffset: 32
            }}
            axisLeft={{
                tickSize: 0,
                tickPadding: 5,
                tickRotation: 0,
                legend: '',
                legendPosition: 'middle',
                legendOffset: -40
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
            legends={[
                {
                    dataFrom: 'keys',
                    anchor: 'top-right',
                    direction: 'row',
                    justify: false,
                    translateX: 25,
                    translateY: -25,
                    itemsSpacing: 2,
                    itemWidth: 65,
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
        </StyledContainer>
    )
}

const mapStateToProps = state => {
    return { petInfo: state.petInfo }
};

export default connect(mapStateToProps)(HealthGraph);

const StyledContainer = styled.div`
    /* font-family: NotoSansKR !important; */
    height: 500px;
    width: 100%;
    margin-bottom: 20px;
`;