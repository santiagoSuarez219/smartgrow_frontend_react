import { createContext, useState, useEffect } from "react";
import { useMqtt } from "./useMqtt";

const SmartgrowContext = createContext();

function SmartgrowProvider({ children }) {
  const { message, connectStatus, mqttConnect, mqttPublish } = useMqtt("smartgrow/sensores");

  const [temperatura, setTemperatura] = useState(null);
  const [humedad, setHumedad] = useState(null);
  const [co2, setCo2] = useState(null);
  const [ppf, setPpf] = useState(null);
  const [ppfd, setPpfd] = useState(null);
  const [vpd, setVpd] = useState(null);
  const [temperaturaAgua, setTemperaturaAgua] = useState(null)
  const [ph, setPh] = useState(null) 
  const [ec, setEc] = useState(null) 
  const [nivelAgua, setNivelAgua] = useState(null) 
  const [statusWaterInlet, setStatusWaterInlet] = useState(false);
  const [statusWaterOutlet, setStatusWaterOutlet] = useState(false);
  const [statusRecirculation, setStatusRecirculation] = useState(false);
  const [statusMqtt, setStatusMqtt] = useState(false);
  const [setPointPh, setSetPointPh ] = useState(0);
  const [setPointEc, setSetPointEc ] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [openModalGrafica, setOpenModalGrafica] = useState(false);
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
      setPh(data.ph_agua);
      setEc(data.ec_agua);
      setNivelAgua(data.nivel_agua);
      setTemperaturaAgua(data.temperatura_agua);
    } else if (topic === "smartgrow/actuadores") {
      console.log(data.message);
    }
  };

  useEffect(() => {
    mqttConnect();
  },[])

  useEffect(() => {
    if (message !== null) {
      handleMqttMessage(message);
    }
    if (connectStatus) {
      setStatusMqtt(true);
    } else {
      setStatusMqtt(false);
    }
  },[message, connectStatus])

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
        openModal,
        setOpenModal,
        valueModal,
        setValueModal,
        openModalGrafica,
        setOpenModalGrafica,
      }}
    >
      {children}
    </SmartgrowContext.Provider>
  );
}

export { SmartgrowContext, SmartgrowProvider };
