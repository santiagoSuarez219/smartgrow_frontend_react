import { useState, useEffect, useContext } from "react";
import ReactApexChart from "react-apexcharts";
import { SmartgrowContext } from "../../SmartgrowContext";

import { HiOutlineX } from "react-icons/hi";

const GraficaForm = () => {
  const { setOpenModalGrafica } = useContext(SmartgrowContext);
  const [selectedTimeRange, setSelectedTimeRange] = useState("ALL");
  const [endDate, setEndDate] = useState();
  const [chartData, setChartData] = useState({
    series: [
      {
        data: [],
      },
    ],
    options: {
      chart: {
        id: "area-dateTime",
        type: "area",
        zoom: {
          autoScaleYaxis: true,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ["#6A994E"],
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,
        style: "hollow",
      },
      xaxis: {
        type: "datetime",
        min: new Date("01 Mar 2021").getTime(),
        tickAmount: 6,
        labels: {
          style: {
            fontSize: "16px",
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            fontSize: "20px",
          },
        },
      },
      tooltip: {
        x: {
          format: "dd MMM yyyy HH:mm",
        },

        style: {
          fontSize: "16px",
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 100],
        },
      },
      title: {
        text: "Grafica de temperatura",
        align: "left",
        style: {
          fontSize: "24px",
          color: "#6A994E",
        },
      },
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/scd40?data=temperatura`
        );
        const dataApi = await response.json();
        const transformedData = dataApi.map((item) => [
          new Date(item.fecha).getTime(),
          parseFloat(item.temperatura.toFixed(2)),
        ]);
        setEndDate(new Date(dataApi[dataApi.length - 1].fecha).getTime());
        setChartData((prevChartData) => ({
          ...prevChartData,
          series: [
            {
              data: transformedData,
            },
          ],
          options: {
            ...prevChartData.options,
            xaxis: {
              ...prevChartData.options.xaxis,
              min: new Date(dataApi[0].fecha).getTime(),
            },
          },
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleTimeRangeChange = (timeRange) => {
    setSelectedTimeRange(timeRange);
    console.log(endDate);
    const filteredData = chartData.series[0].data.filter(
      (item) => endDate - item[0] <= getTimeRangeMiliseconds(timeRange)
    );

    setChartData((prevChartData) => ({
      ...prevChartData,
      series: [
        {
          data: filteredData,
        },
      ],
      options: {
        ...prevChartData.options,
        xaxis: {
          ...prevChartData.options.xaxis,
          min: endDate - getTimeRangeMiliseconds(timeRange),
        },
      },
    }));
  };

  const getTimeRangeMiliseconds = (timeRange) => {
    switch (timeRange) {
      case "1H":
        return 60 * 60 * 1000;
    }
  };

  return (
    <div className="w-auto h-auto p-4 relative bg-white rounded-lg shadow-lg flex flex-col space-y-2 justify-center items-center">
      <div className="w-full text-xl text-primary flex gap-6 p-2">
        <button
          className="p-2 rounded-lg active:bg-secondary active:text-white"
          onClick={() => handleTimeRangeChange("1H")}
        >
          1H
        </button>
        <button>6H</button>
        <button>1D</button>
        <button>1S</button>
        <button>1M</button>
        <button>ALL</button>
      </div>
      <div id="chart-timeline">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="area"
          height={800}
          width={1200}
        />
      </div>
      <HiOutlineX
        className="w-9 h-9 p-2 bg-red-500 text-white cursor-pointer rounded-full absolute -right-3 -top-5 "
        onClick={() => {
          setOpenModalGrafica(false);
        }}
      />
    </div>
  );
};

export default GraficaForm;
