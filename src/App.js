import Button from "./components/Button";
import GasMeter from "./components/GasMeter";
import HumidityMeter from "./components/HumidityMeter";
import Temperature from "./components/Temperature";
import "./App.css";
import { API_TOKEN } from "./constants";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [temp, setTemp] = useState(0);
  const [humi, setHumi] = useState(0);
  const [gas, setGas] = useState(0);
  const [data, setData] = useState([]);
  // sync dữ liệu từ cổng ảo v1 : nhiệt độ
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://blynk.cloud/external/api/get?token=${API_TOKEN}&v1`
        );
        setTemp(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const intervalId = setInterval(() => {
      fetchData();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  // sync du lieu tu cong ao v2 do am
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://blynk.cloud/external/api/get?token=${API_TOKEN}&v2`
        );
        setHumi(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const intervalId = setInterval(() => {
      fetchData();
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
  // sync du lieu tu cong ao v3: khi gas
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://blynk.cloud/external/api/get?token=${API_TOKEN}&v3`
        );
        setGas(response.data);
        if (response.data > 100) {
          handleNotificationClick();
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const intervalId = setInterval(() => {
      fetchData();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  // update data lên Firebase mỗi khi có giá trị thay đổi
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("https://thesys-40f9d-default-rtdb.asia-southeast1.firebasedatabase.app/test.json", {humi: humi, gas: gas, temp: temp}
        );
        console.log(response)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    fetchData();
  },[humi, gas, temp])
  // lấy data về 
  useEffect(() => {
    axios.get("https://thesys-40f9d-default-rtdb.asia-southeast1.firebasedatabase.app/test.json")
      .then(response => {
        const dataArr = Object.values(response.data)
        setData(dataArr)
        console.log('Data received:', dataArr);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);


  const handleNotificationClick = () => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          const notification = new Notification("Nguy hiểm", {
            body: "Lượng khí gas vượt quá mức cho phép! hãy ra khỏi phòng ngay lập tức",
          });
          const audio = new Audio("/sss.mp3");
          audio.play();
          if ("vibrate" in navigator) {
            navigator.vibrate([200, 100, 200]);
          }
        }
      });
    }
  };

  return (
    <div className="App">
      <h2 className="main-header">Environmental parameters</h2>
      <div className="meter">
        <Temperature temperature={temp} />
        <GasMeter gasLevel={gas} />
        <HumidityMeter humidityLevel={humi} />
      </div>
      <div className="light-container">
        <h2>Light control</h2>
        <Button />
      </div>
    </div>
  );
}

export default App;
