import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { DateTime } from "luxon";
import { HiOutlineX } from "react-icons/hi";
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
    <div className="w-auto h-auto p-4 relative bg-quartiary rounded-lg shadow-lg flex flex-col space-y-2 justify-center items-center">
      <h1 className="text-lg font-semibold">Grafica de {filter_data}</h1>
      <form action="" className="w-full flex space-x-4">
        <div className="flex space-x-2 items-center">
          <label className="">Sensor: </label>
          <select
            className="p-2"
            name="sensores"
            id=""
            value={sensor}
            onChange={handleSensor}
          >
            {sensors.map((sensor) => (
              <option key={sensor._id} value={sensor._id}>
                {sensor.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex space-x-2 items-center">
          <label htmlFor="">Fecha inicial: </label>
          <input
            className="p-2"
            type="datetime-local"
            onChange={handleDateInit}
            name=""
            id=""
          />
        </div>
        <div className="flex space-x-2 items-center">
          <label htmlFor="">Fecha final: </label>
          <input
            className="p-2"
            type="datetime-local"
            onChange={handleDateEnd}
            name=""
            id=""
          />
        </div>
        <div className="w-full flex justify-end">
          <button
            type="button"
            className="border-2 border-primary p-2 rounded-lg hover:bg-primary hover:text-white"
            onClick={filterData}
          >
            Actualizar
          </button>
        </div>
      </form>
      <Line data={chartData} options={options} />
      <div className="w-full mt-2 flex justify-end space-x-2">
        <label className="font-semibold">Escala: </label>
        <select
          name="escalaGrafica"
          className="bg-white rounded-sm"
          value={scale}
          onChange={handleScale}
        >
          <option option value="hour">
            hora
          </option>
          <option value="day">dia</option>
          <option value="week">semana</option>
          <option value="month">mes</option>
          <option value="year">anio</option>
        </select>
      </div>
      <HiOutlineX className="w-9 h-9 p-2 bg-red-500 text-white cursor-pointer rounded-full absolute -right-3 -top-5 "/>
    </div>
  );
};

export default GraficaForm;
