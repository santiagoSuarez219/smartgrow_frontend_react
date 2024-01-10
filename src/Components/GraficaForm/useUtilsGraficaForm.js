const useUtilsGraficaForm = (
  setLoadingModal,
  text,
  sensor,
  setEndDate,
  setData,
  setChartData,
  endDate
) => {
  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://200.122.207.134:8311/${sensor}?data=${text}`
      );
      const dataApi = await response.json();
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
      setLoadingModal(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const parseData = (item) => {
    switch (text) {
      case "temperatura":
      case "humedad":
      case "co2":
      case "VPD":
      case "ph":
      case "ec":
        return parseFloat(item[text].toFixed(2));
      default:
        return 0;
    }
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

  return { fetchData, getTimeRangeMiliseconds, parseData };
};

export { useUtilsGraficaForm };
