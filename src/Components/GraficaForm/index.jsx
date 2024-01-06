import { useState, useEffect, useContext } from "react";
import { SmartgrowContext } from "../../SmartgrowContext";

import GraficaFormUI from "./GraficaFormUI";

const GraficaForm = ({ text, sensor }) => {
  const { setOpenModalGrafica } = useContext(SmartgrowContext);
  const [data, setData] = useState([]);
  const [endDate, setEndDate] = useState();
  const [timeRange, setTimeRange] = useState("ALL");
  const [chartData, setChartData] = useState({
    series: [
      {
        data: [],
      },
    ],
    options: {
      chart: {
        id: "area-dateTime",
        zoom: {
          autoScaleYaxis: true,
        },
        toolbar: {
          show: true,
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
        text: `Gráfica de ${text}`,
        align: "left",
        style: {
          fontSize: "24px",
          color: "#6A994E",
        },
      },
    },
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/${sensor}?data=${text}`
      );
      const dataApi = await response.json();
      console.log(dataApi);
      const transformedData = dataApi.map((item) => [
        new Date(item.fecha).getTime(),
        parseData(item),
      ]);
      setEndDate(new Date(dataApi[dataApi.length - 1].fecha).getTime());
      setData(transformedData);
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

  const parseData = (item) => {
    if (text === "temperatura") {
      return parseFloat(item.temperatura.toFixed(2));
    }
    if (text === "humedad") {
      return parseFloat(item.humedad.toFixed(2));
    }
    if (text === "co2") {
      return parseFloat(item.co2.toFixed(2));
    }
    if (text === "VPD") {
      return parseFloat(item.VPD.toFixed(2));
    }
    if (text === "ph") {
      return parseFloat(item.ph.toFixed(2));
    }
    if (text === "ec") {
      return parseFloat(item.ec.toFixed(2));
    }
  };

  const handleTimeRangeChange = (timeRange) => {
    setTimeRange(timeRange);
    const filteredData = data.filter(
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
          min: new Date(filteredData[0][0]).getTime(),
        },
      },
    }));
  };

  const getTimeRangeMiliseconds = (timeRange) => {
    switch (timeRange) {
      case "1H":
        return 60 * 60 * 1000;
      case "6H":
        return 6 * 60 * 60 * 1000;
      case "1D":
        return 24 * 60 * 60 * 1000;
      case "1S":
        return 7 * 24 * 60 * 60 * 1000;
      case "1M":
        return 30 * 24 * 60 * 60 * 1000;
      case "ALL":
        return endDate;
    }
  };

  return (
    <GraficaFormUI
      text={text}
      sensor={sensor}
      timeRange={timeRange}
      chartData={chartData}
      handleTimeRangeChange={handleTimeRangeChange}
      fetchData={fetchData}
      setOpenModalGrafica={setOpenModalGrafica}
    />
  );
};

export default GraficaForm;
