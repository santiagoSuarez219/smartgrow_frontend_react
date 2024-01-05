import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const GraficaForm = () => {
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
          style: {
            width: "100%",
            height: "800px",
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,
        style: "hollow",
      },
      xaxis: {
        type: "datetime",
        min: new Date("01 Dec 2023").getTime(),
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
            fontSize: "16px",
          },
        },
      },
      tooltip: {
        x: {
          format: "dd MMM yyyy",
        },
      },
      toolbar: {
        show: false,
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
        text: "Stock Price Movement",
        align: "left",
      },
    },
    selection: "one_year",
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
        setChartData((prevChartData) => ({
          ...prevChartData,
          series: [
            {
              data: transformedData,
            },
          ],
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div id="chart">
      <div className="">
        <button>1M</button>
        &nbsp;
        <button>6M</button>
        &nbsp;
        <button>1Y</button>
        &nbsp;
        <button>YTD</button>
        &nbsp;
        <button>ALL</button>
      </div>

      <div id="chart-timeline" className="bg-white">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="area"
          height={800}
          width={1200}
        />
      </div>
    </div>
  );
};

export default GraficaForm;
