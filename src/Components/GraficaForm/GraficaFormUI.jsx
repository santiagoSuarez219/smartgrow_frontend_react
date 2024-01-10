import ReactApexChart from "react-apexcharts";
import { HiOutlineX } from "react-icons/hi";

const GraficaFormUI = ({
  timeRange,
  handleTimeRangeChange,
  fetchData,
  chartData,
  setOpenModal,
  openModal,
}) => {
  const styleActivate = "bg-secondary text-white";
  return (
    <div className="w-auto h-auto p-4 relative bg-white rounded-lg shadow-lg flex flex-col space-y-2 justify-center items-center">
      <div className="w-full text-xl pr-6 text-primary flex items-center justify-between">
        <div className=" text-primary flex gap-6">
          <button
            className={`p-2 rounded-xl ${
              timeRange === "1H" ? styleActivate : ""
            }`}
            onClick={() => handleTimeRangeChange("1H")}
          >
            1H
          </button>
          <button
            className={`p-2 rounded-xl ${
              timeRange === "6H" ? styleActivate : ""
            }`}
            onClick={() => handleTimeRangeChange("6H")}
          >
            6H
          </button>
          <button
            className={`p-2 rounded-xl ${
              timeRange === "1D" ? styleActivate : ""
            }`}
            onClick={() => handleTimeRangeChange("1D")}
          >
            1D
          </button>
          <button
            className={`p-2 rounded-xl ${
              timeRange === "1S" ? styleActivate : ""
            }`}
            onClick={() => handleTimeRangeChange("1S")}
          >
            1S
          </button>
          <button
            className={`p-2 rounded-xl ${
              timeRange === "1M" ? styleActivate : ""
            }`}
            onClick={() => handleTimeRangeChange("1M")}
          >
            1M
          </button>
          <button
            className={`p-2 rounded-xl ${
              timeRange === "ALL" ? styleActivate : ""
            }`}
            onClick={() => handleTimeRangeChange("ALL")}
          >
            ALL
          </button>
        </div>
        <div className="p-2 border-2 border-primary rounded-xl hover:bg-primary hover:text-white">
          <button
            onClick={() => {
              fetchData();
            }}
          >
            Actualizar
          </button>
        </div>
      </div>
      <div id="chart-timeline">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="line"
          height={800}
          width={1200}
        />
      </div>
      <HiOutlineX
        className="w-12 h-12 p-2 bg-red-500 text-white cursor-pointer rounded-full absolute -right-5 -top-5 "
        onClick={() => {
          setOpenModal({
            ...openModal,
            grafica: false,
          });
        }}
      />
    </div>
  );
};

export default GraficaFormUI;
