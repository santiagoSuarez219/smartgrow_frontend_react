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
  const [valueModal, setValueModal] = useState("");

  const handleMqttMessage = (data) => {
    const topic = data.topic;
    if (topic === "smartgrow/sensores") {
      data = JSON.parse(data.message);
      setTemperatura(data.temperatura);
      setHumedad(data.humedad);
      setCo2(data.co2);
      setPpf(data.PPF);
      setPpfd(data.PPFD);
      setVpd(data.VPD);
      setNivelAgua(data.nivel_agua);
    } else if (topic === "smartgrow/actuadores") {
      console.log(data.message);
    } else if (topic === "smartgrow/sensores/phec") {
      data = JSON.parse(data.message);
      setPh(data.ph);
      setEc(data.ec);
      setTemperaturaAgua(data.temperatura);
      console.log(data);
    }
  };

  useEffect(() => {
    mqttConnect();
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
      }}
    >
      {children}
    </SmartgrowContext.Provider>
  );
}

export { SmartgrowContext, SmartgrowProvider };
