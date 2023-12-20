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
    fetch(`http://localhost:3000/scd40?data=${filter_data}`)
      .then((response) => response.json())
      .then((data) => {
        setDataInit(data);
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching scd40 data:", error);
      });

    fetch(`http://localhost:3000/sensores`)
      .then((response) => response.json())
      .then((data) => {
        setSensors(data);
      })
      .catch((error) => {
        console.error("Error fetching sensors data:", error);
      });
  }, []);

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

  const handleDateInit = (e) => {
    setDateInit(e.target.value);
  };

  const handleDateEnd = (e) => {
    setDateEnd(e.target.value);
  };

  const handleSensor = (e) => {
    setSensor(e.target.value);
  };

  const handleScale = (e) => {
    setScale(e.target.value);
  };

  return (
    <GraficaFormUI 
      filter_data={filter_data}
      sensor={sensor}
      handleSensor={handleSensor}
      sensors={sensors}
      handleDateInit={handleDateInit}
      handleDateEnd={handleDateEnd}
      handleScale={handleScale}
      scale={scale}
      chartData={chartData}
      options={options}
      filterData={filterData}
    />
  );
};

export default GraficaForm;