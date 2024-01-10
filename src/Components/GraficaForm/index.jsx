import { useState, useEffect, useContext } from "react";
import { SmartgrowContext } from "../../SmartgrowContext";

import GraficaFormUI from "./GraficaFormUI";
import { useUtilsGraficaForm } from "./useUtilsGraficaForm";

import LoadingModal from "../../Components/LoadingModal";

const GraficaForm = ({ text, sensor }) => {
  const { setOpenModal, openModal } = useContext(SmartgrowContext);
  const [data, setData] = useState([]);
  const [loadingModal, setLoadingModal] = useState(true);
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
  const { fetchData, getTimeRangeMiliseconds } = useUtilsGraficaForm(
    setLoadingModal,
    text,
    sensor,
    setEndDate,
    setData,
    setChartData,
    endDate
  );

  console.log(loadingModal);

  useEffect(() => {
    fetchData();
  }, [sensor, text]);

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

  return (
    <>
      {loadingModal && <LoadingModal />}
      {!loadingModal && (
        <GraficaFormUI
          timeRange={timeRange}
          chartData={chartData}
          handleTimeRangeChange={handleTimeRangeChange}
          fetchData={fetchData}
          setOpenModal={setOpenModal}
          openModal={openModal}
        />
      )}
    </>
  );
};

export default GraficaForm;
