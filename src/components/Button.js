import React, { useEffect, useState } from 'react';
import Switch from 'react-switch';
import { API_TOKEN } from '../constants';
import axios from 'axios';
import './Button.css'
const Button = () => {
  const [isOn, setIsOn] = useState(false);
  const [value, setValue] = useState(0)
  const handleChange = (checked) => {
    setIsOn(checked);
    if (checked) {
        setValue(1)
    } else {
        setValue(0)
    }
};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://blynk.cloud/external/api/update?token=${API_TOKEN}&v0=${value}`);
        console.log(response)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [isOn]);

  return (
    <div className='buttonContainer'>
      <Switch
        onChange={handleChange}
        checked={isOn}
        onColor="#86d3ff"
        onHandleColor="#2693e6"
        handleDiameter={30}
        uncheckedIcon={false}
        checkedIcon={false}
        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
        height={20}
        width={48}
      />
    </div>
  );
};

export default Button;

