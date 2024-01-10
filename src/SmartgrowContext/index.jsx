import { createContext, useState, useEffect } from "react";
import { useMqtt } from "./useMqtt";
import { parseValue } from "./contextUtils";

const SmartgrowContext = createContext();

const API_BASE_URL = "http://200.122.207.134:8311";

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

  const [statusSystem, setStatusSystem] = useState({
    entrada: false,
    salida: false,
    recirculacion: false,
  });

  const [openModal, setOpenModal] = useState({
    actuadores: false,
    control: false,
    grafica: false,
  });

  const [statusMqtt, setStatusMqtt] = useState(false);
  const [valueModal, setValueModal] = useState("");
  const [sensorModal, setSensorModal] = useState("");
  const [lastDates, setLastDates] = useState({
    scd40: new Date(),
    phEc: new Date(),
  });

  const handleMqttMessage = (data) => {
    const topic = data.topic;
    if (topic === "smartgrow/sensores/scd40") {
      handleScd40Message(JSON.parse(data.message));
    } else if (topic === "smartgrow/sensores/phec") {
      handlePhEcMessage(JSON.parse(data.message));
    } else if (topic === "smartgrow/hidroponico/actuadores/estado") {
      handleActuadoresMessage(JSON.parse(data.message));
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

  const handleActuadoresMessage = (data) => {
    setStatusSystem({
      entrada: !data.entrada_de_agua,
      salida: !data.salida_de_agua,
      recirculacion: !data.recirculacion,
    });
  };

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
      const response = await fetch(`${API_BASE_URL}/actuadores`);
      const data = await response.json();
      data.forEach(({ text, estado }) => updateActuadores(text, estado));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const FetchGetData = async () => {
    try {
      const responseScd40 = await fetch(`${API_BASE_URL}/scd40/last_data`);
      const dataScd40 = await responseScd40.json();
      const responsePhEc = await fetch(`${API_BASE_URL}/phec/last_data`);
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

  const updateActuadores = (item, status) => {
    switch (item) {
      case "salida de agua":
        setStatusSystem((prev) => ({ ...prev, entrada: status }));
        break;
      case "entrada de agua":
        setStatusSystem((prev) => ({ ...prev, salida: status }));
        break;
      case "recirculacion":
        setStatusSystem((prev) => ({ ...prev, recirculacion: status }));
        break;
      default:
        break;
    }
  };

  return (
    <SmartgrowContext.Provider
      value={{
        sensorData,
        statusSystem,
        statusMqtt,
        mqttPublish,
        openModal,
        setOpenModal,
        valueModal,
        setValueModal,
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
