import { Line } from "react-chartjs-2";
import { HiOutlineX } from "react-icons/hi";

const GraficaFormUI = ({
  filter_data,
  sensor,
  handleSensor,
  sensors,
  handleDateInit,
  handleDateEnd,
  handleScale,
  scale,
  chartData,
  options,
  filterData,
}) => {
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
          <option value="hour">hora</option>
          <option value="day">dia</option>
          <option value="week">semana</option>
          <option value="month">mes</option>
          <option value="year">anio</option>
        </select>
      </div>
      <HiOutlineX className="w-9 h-9 p-2 bg-red-500 text-white cursor-pointer rounded-full absolute -right-3 -top-5 " />
    </div>
  );
};

export default GraficaFormUI;
