import { createContext, useState, useEffect } from "react";
import { useMqtt } from "./useMqtt";

const SmartgrowContext = createContext();

function SmartgrowProvider({ children }) {
  const { message, connectStatus, mqttConnect, mqttPublish } =
    useMqtt("smartgrow/#");

  const [temperatura, setTemperatura] = useState(null);
  const [humedad, setHumedad] = useState(null);
  const [co2, setCo2] = useState(null);
  const [ppf, setPpf] = useState(null);
  const [ppfd, setPpfd] = useState(null);
  const [vpd, setVpd] = useState(null);
  const [temperaturaAgua, setTemperaturaAgua] = useState(null);
  const [ph, setPh] = useState(null);
  const [ec, setEc] = useState(null);
  const [nivelAgua, setNivelAgua] = useState(null);
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
  const [lastDateScd40, setLastDateScd40] = useState(new Date());
  const [lastDatePhEc, setLastDatePhEc] = useState(new Date());

  const handleMqttMessage = (data) => {
    const topic = data.topic;
    if (topic === "smartgrow/sensores") {
      data = JSON.parse(data.message);
      setTemperatura(data.temperatura);
      setHumedad(data.humedad);
      setCo2(data.co2);
      setVpd(data.VPD);
      setLastDateScd40(formatDateInit(new Date(), -5));
    } else if (topic === "smartgrow/sensores/phec") {
      data = JSON.parse(data.message);
      setPh(parseFloat(data.ph).toFixed(2));
      setEc(parseFloat(data.ec).toFixed(1));
      setTemperaturaAgua(parseFloat(data.temperatura).toFixed(2));
      setLastDatePhEc(formatDateInit(new Date(), -5));
    } else if (topic === "smartgrow/hidroponico/actuadores/estado") {
      data = JSON.parse(data.message);
      setStatusWaterInlet(!data.entrada_de_agua);
      setStatusWaterOutlet(!data.salida_de_agua);
      setStatusRecirculation(!data.recirculacion);
    }
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
      setTemperatura(parseFloat(dataScd40[0].temperatura).toFixed(2));
      setHumedad(parseFloat(dataScd40[0].humedad).toFixed(2));
      setCo2(parseFloat(dataScd40[0].co2));
      setVpd(parseFloat(dataScd40[0].VPD).toFixed(2));
      setLastDateScd40(formatDateInit(new Date(dataScd40[0].fecha), 5));
      setPh(parseFloat(dataPhEc[0].ph).toFixed(2));
      setEc(parseFloat(dataPhEc[0].ec).toFixed(1));
      setTemperaturaAgua(parseFloat(dataPhEc[0].temperatura).toFixed(2));
      setLastDatePhEc(new Date(dataPhEc[0].fecha));
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
        temperatura,
        humedad,
        co2,
        ppf,
        ppfd,
        vpd,
        temperaturaAgua,
        ph,
        ec,
        nivelAgua,
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
        lastDateScd40,
        lastDatePhEc,
      }}
    >
      {children}
    </SmartgrowContext.Provider>
  );
}

export { SmartgrowContext, SmartgrowProvider };
