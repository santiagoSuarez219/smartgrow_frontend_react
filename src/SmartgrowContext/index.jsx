import { createContext, useState, useEffect } from "react";
import { useMqtt } from "./useMqtt";
import { parseValue } from "./contextUtils";

const SmartgrowContext = createContext();

function SmartgrowProvider({ children }) {
  const { message, connectStatus, mqttConnect, mqttPublish } =
    useMqtt("smartgrow/#");

  const [sensorData, setSensorData] = useState({
    temperatura: null,
    humedad: null,
    co2: null,
    vpd: null,
    ph: null,
    ec: null,
    temperaturaAgua: null,
    ppf: null,
    ppfd: null,
    nivelAgua: null,
  });
  const [statusWaterInlet, setStatusWaterInlet] = useState(false);
  const [statusWaterOutlet, setStatusWaterOutlet] = useState(false);
  const [statusRecirculation, setStatusRecirculation] = useState(false);
  const [statusMqtt, setStatusMqtt] = useState(false);
  const [setPointPh, setSetPointPh] = useState(0);
  const [setPointEc, setSetPointEc] = useState(0);
  const [openModalActuadores, setOpenModalActuadores] = useState(false);
  const [openModalControl, setOpenModalControl] = useState(false);
  const [openModalGrafica, setOpenModalGrafica] = useState(false);
  const [valueModal, setValueModal] = useState("");
  const [sensorModal, setSensorModal] = useState("");
  const [lastDates, setLastDates] = useState({
    scd40: new Date(),
    phEc: new Date(),
  });

  const handleMqttMessage = (data) => {
    const topic = data.topic;
    if (topic === "smartgrow/sensores/scd40") {
      data = JSON.parse(data.message);
      handleScd40Message(data);
    } else if (topic === "smartgrow/sensores/phec") {
      data = JSON.parse(data.message);
      handlePhEcMessage(data);
    } else if (topic === "smartgrow/hidroponico/actuadores/estado") {
      data = JSON.parse(data.message);
      setStatusWaterInlet(!data.entrada_de_agua);
      setStatusWaterOutlet(!data.salida_de_agua);
      setStatusRecirculation(!data.recirculacion);
    }
  };

  const handleScd40Message = (data) => {
    setSensorData({
      ...sensorData,
      temperatura: parseValue(data.temperatura, 2),
      humedad: parseValue(data.humedad, 2),
      co2: parseValue(data.co2, 0),
      vpd: parseValue(data.VPD, 2),
    });
    setLastDates({ ...lastDates, scd40: formatDateInit(new Date(), 0) });
  };

  const handlePhEcMessage = (data) => {
    setSensorData({
      ...sensorData,
      ph: parseValue(data.ph, 2),
      ec: parseValue(data.ec, 1),
      temperaturaAgua: parseValue(data.temperatura, 2),
    });
    setLastDates({ ...lastDates, phEc: formatDateInit(new Date(), -5) });
  };

  // const parseValue = (value, decimalPlaces) =>
  //   parseFloat(value).toFixed(decimalPlaces);

  useEffect(() => {
    mqttConnect();
    FetchGetActuadores();
    FetchGetData();
  }, []);

  useEffect(() => {
    if (message !== null) {
      handleMqttMessage(message);
    }
    if (connectStatus) {
      setStatusMqtt(true);
    } else {
      setStatusMqtt(false);
    }
  }, [message, connectStatus]);

  const FetchGetActuadores = async () => {
    try {
      const response = await fetch(`http://200.122.207.134:8311/actuadores`);
      const data = await response.json();
      data.forEach((item) => ActualizarActuadores(item.text, item.estado));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const FetchGetData = async () => {
    try {
      const responseScd40 = await fetch(
        "http://200.122.207.134:8311/scd40/last_data"
      );
      const dataScd40 = await responseScd40.json();
      const responsePhEc = await fetch(
        "http://200.122.207.134:8311/phec/last_data"
      );
      const dataPhEc = await responsePhEc.json();
      setSensorData({
        ...sensorData,
        temperatura: parseValue(dataScd40[0].temperatura, 2),
        humedad: parseValue(dataScd40[0].humedad, 2),
        co2: parseValue(dataScd40[0].co2, 0),
        vpd: parseValue(dataScd40[0].VPD, 2),
        ph: parseValue(dataPhEc[0].ph, 2),
        ec: parseValue(dataPhEc[0].ec, 1),
        temperaturaAgua: parseValue(dataPhEc[0].temperatura, 2),
      });
      setLastDates({
        ...lastDates,
        scd40: formatDateInit(new Date(dataScd40[0].fecha), 5),
        phEc: formatDateInit(new Date(dataPhEc[0].fecha), 0),
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const formatDateInit = (date, number) => {
    date.setHours(date.getHours() + number);
    return date;
  };

  const ActualizarActuadores = (item, status) => {
    switch (item) {
      case "salida de agua":
        setStatusWaterOutlet(status);
        break;
      case "entrada de agua":
        setStatusWaterInlet(status);
        break;
      case "recirculacion":
        setStatusRecirculation(status);
        break;
    }
  };

  return (
    <SmartgrowContext.Provider
      value={{
        sensorData,
        statusWaterInlet,
        statusWaterOutlet,
        statusRecirculation,
        statusMqtt,
        setPointPh,
        setSetPointPh,
        setPointEc,
        setSetPointEc,
        mqttPublish,
        openModalActuadores,
        setOpenModalActuadores,
        openModalControl,
        setOpenModalControl,
        valueModal,
        setValueModal,
        openModalGrafica,
        setOpenModalGrafica,
        sensorModal,
        setSensorModal,
        lastDates,
      }}
    >
      {children}
    </SmartgrowContext.Provider>
  );
}

export { SmartgrowContext, SmartgrowProvider };
