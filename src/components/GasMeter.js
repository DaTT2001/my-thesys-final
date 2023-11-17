import React from 'react';
import Speedometer from 'react-d3-speedometer';
import './Button.css'

const GasMeter = ({ gasLevel }) => {
  const normalizedGasLevel = Math.min(Math.max(gasLevel, 0), 255);

  return (
    <div className='meterContainer'>
      <h3>Gas Meter</h3>
      <Speedometer
        value={normalizedGasLevel}
        needleHeightRatio={0.4}
        needleColor="orange" // Màu của kim
        startColor="#66cc66"
        endColor="red"
        segments={5}
        maxSegmentLabels={5}
        valueText={`${normalizedGasLevel} ppm`}
        minValue={0}
        maxValue={255}
        ringWidth={30}
      />
    </div>
  );
};

export default GasMeter;
