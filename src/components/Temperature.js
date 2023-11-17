import React from 'react';
import Speedometer from 'react-d3-speedometer';
import './Button.css'

const Temperature = ({ temperature }) => {
  // Giới hạn giá trị từ 0 đến 50
  const normalizedTemperature = Math.min(Math.max(temperature, 0), 50);

  return (
    <div className='meterContainer'>
      <h3>Temperature Gauge</h3>
      <Speedometer
        value={normalizedTemperature}
        needleHeightRatio= "0.4"
        needleColor="red"
        startColor="#66cc66"
        endColor="red"
        segments={5}
        maxSegmentLabels={5}
        valueText={`${normalizedTemperature}°C`}
        minValue={0}
        maxValue={50}
        ringWidth={30}
      />
    </div>
  );
};

export default Temperature;
