import { useContext } from "react";
import CardSmartgrow from "../../Components/CardSmartgrow";
import LayaoutCards from "../../Components/LayaoutCards";

import { SmartgrowContext } from "../../SmartgrowContext";

const Cultivo = () => {
  const { sensorData, lastDates } = useContext(SmartgrowContext);
  const nombresMesAbreviados = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];

  const formatDate = (value) => {
    if (value < 10) {
      return `0${value}`;
    }
    return value;
  };

  const date = `${formatDate(lastDates.scd40.getDate())} ${
    nombresMesAbreviados[lastDates.scd40.getMonth()]
  } ${lastDates.scd40.getFullYear()}`;

  const hour = `${formatDate(lastDates.scd40.getHours())}:${formatDate(
    lastDates.scd40.getMinutes()
  )}`;

  return (
    <LayaoutCards>
      <div className="w-full flex flex-col justify-center items-center gap-4 lg:flex lg:flex-row lg:gap-6">
        <CardSmartgrow
          text="Temperatura"
          date={date}
          hour={hour}
          value={sensorData.temperatura}
          units="°C"
          dataApi="temperatura"
          sensor="scd40"
          image="./img/cannabis10.jpg"
        />
        <CardSmartgrow
          text="Humedad"
          date={date}
          hour={hour}
          value={sensorData.humedad}
          units="%"
          dataApi="humedad"
          sensor="scd40"
          image="./img/cannabis9.jpg"
        />
        <CardSmartgrow
          text="Dioxido de carbono"
          date={date}
          hour={hour}
          value={sensorData.co2}
          units="ppm"
          dataApi="co2"
          sensor="scd40"
          image="./img/cannabis8.jpg"
        />
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-4 lg:flex lg:flex-row lg:gap-6">
        <CardSmartgrow
          text="PPF"
          date="Sin datos"
          hour=""
          value=""
          units="umol"
          image="./img/cannabis.jpg"
        />
        <CardSmartgrow
          text="VPD"
          date={date}
          hour={hour}
          value={sensorData.vpd}
          units="Kpa"
          dataApi="VPD"
          sensor="scd40"
          image="./img/cannabis2.jpg"
        />
        <CardSmartgrow
          text="PPFD"
          date="Sin datos"
          hour=""
          value=""
          units="umol*m2"
          image="./img/cannabis3.jpg"
        />
      </div>
    </LayaoutCards>
  );
};

export default Cultivo;
