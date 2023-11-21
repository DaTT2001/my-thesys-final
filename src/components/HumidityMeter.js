import React from "react";
import Speedometer from "react-d3-speedometer";
import "./Button.css";

const HumidityMeter = ({ humidityLevel }) => {
  const normalizedHumidityLevel = Math.min(Math.max(humidityLevel, 0), 100);

  return (
    <div className="meterContainer">
      <h2>Humidity Meter</h2>
      <Speedometer
        value={normalizedHumidityLevel}
        needleHeightRatio={0.4}
        needleColor="blue"
        startColor="#66cc66"
        endColor="red"
        segments={5}
        maxSegmentLabels={5}
        valueText={`${normalizedHumidityLevel}%`}
        minValue={0}
        maxValue={100}
        ringWidth={30}
      />
    </div>
  );
};

export default HumidityMeter;
