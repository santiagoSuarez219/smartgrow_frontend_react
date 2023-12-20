import { useState, useEffect } from "react";
import { DateTime } from "luxon";
import "chartjs-adapter-luxon";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";

import GraficaFormUI from "./GraficaFormUI";

ChartJS.register(
  TimeScale,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const GraficaForm = ({ filter_data }) => {
  const [dataInit, setDataInit] = useState([]);
  const [data, setData] = useState([]);
  const [sensors, setSensors] = useState([]);
  const [sensor, setSensor] = useState("");
  const [dateInit, setDateInit] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [scale, setScale] = useState("day");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const scd40Response = await fetch(`http://localhost:3000/scd40?data=${filter_data}`);
        const scd40Data = await scd40Response.json();
        setDataInit(scd40Data);
        setData(scd40Data);
  
        const sensorsResponse = await fetch(`http://localhost:3000/sensores`);
        const sensorsData = await sensorsResponse.json();
        setSensors(sensorsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [ filter_data ]);
  

  const filterData = () => {
    setData(dataInit);
    setData(
      dataInit.filter((item) => {
        const date = new Date(item.fecha);
        return (
          item.sensor === sensor &&
          date >= new Date(dateInit) &&
          date <= new Date(dateEnd)
        );
      })
    );
  };

  const chartData = {
    labels: data.map((entry) => DateTime.fromISO(entry.fecha).toJSDate()),
    datasets: [
      {
        label: filter_data,
        data: dataInit.map((entry) => entry[filter_data]),
        borderColor: "green",
        fill: false,
      },
    ],
  };

  let options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        type: "time",
        time: {
          unit: scale,
        },
      },
    },
  };

  const handleDateChange = (setter) => (e) => {
    setter(e.target.value);
  };

  return (
    <GraficaFormUI 
      filter_data={filter_data}
      sensor={sensor}
      handleSensor={handleDateChange(setSensor)}
      sensors={sensors}
      handleDateInit={handleDateChange(setDateInit)}
      handleDateEnd={handleDateChange(setDateEnd)}
      handleScale={handleDateChange(setScale)}
      scale={scale}
      chartData={chartData}
      options={options}
      filterData={filterData}
    />
  );
};

export default GraficaForm;