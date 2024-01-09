import { useContext } from "react";
import CardSmartgrow from "../../Components/CardSmartgrow";
import LayaoutCards from "../../Components/LayaoutCards";

import { SmartgrowContext } from "../../SmartgrowContext";

const Cultivo = () => {
  const { temperatura, humedad, co2, vpd, lastDateScd40 } =
    useContext(SmartgrowContext);
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

  const date = `${formatDate(lastDateScd40.getDate())} ${
    nombresMesAbreviados[lastDateScd40.getMonth()]
  } ${lastDateScd40.getFullYear()}`;

  const hour = `${formatDate(lastDateScd40.getHours())}:${formatDate(
    lastDateScd40.getMinutes()
  )}`;

  return (
    <LayaoutCards>
      <div className="w-full flex flex-col justify-center items-center gap-4 lg:flex lg:flex-row lg:gap-6">
        <CardSmartgrow
          text="Temperatura"
          date={date}
          hour={hour}
          value={temperatura}
          units="°C"
          dataApi="temperatura"
          sensor="scd40"
        />
        <CardSmartgrow
          text="Humedad"
          date={date}
          hour={hour}
          value={humedad}
          units="%"
          dataApi="humedad"
          sensor="scd40"
        />
        <CardSmartgrow
          text="Dioxido de carbono"
          date={date}
          hour={hour}
          value={co2}
          units="ppm"
          dataApi="co2"
          sensor="scd40"
        />
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-4 lg:flex lg:flex-row lg:gap-6">
        <CardSmartgrow
          text="PPF"
          date="Sin datos"
          hour=""
          value=""
          units="umol"
        />
        <CardSmartgrow
          text="VPD"
          date={date}
          hour={hour}
          value={vpd}
          units="Kpa"
          dataApi="VPD"
          sensor="scd40"
        />
        <CardSmartgrow
          text="PPFD"
          date="Sin datos"
          hour=""
          value=""
          units="umol*m2"
        />
      </div>
    </LayaoutCards>
  );
};

export default Cultivo;
