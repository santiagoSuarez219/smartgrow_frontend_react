import { useContext } from "react";
import CardSmartgrow from "../../Components/CardSmartgrow";
import LayaoutCards from "../../Components/LayaoutCards";

import { SmartgrowContext } from "../../SmartgrowContext";

const Hidroponico = () => {
  const { temperaturaAgua, ph, ec, lastDatePhEc } =
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

  const date = `${formatDate(lastDatePhEc.getDate())} ${
    nombresMesAbreviados[lastDatePhEc.getMonth()]
  } ${lastDatePhEc.getFullYear()}`;

  const hour = `${formatDate(lastDatePhEc.getHours() + 5)}:${formatDate(
    lastDatePhEc.getMinutes()
  )}`;

  return (
    <LayaoutCards>
      <div className="w-full flex flex-col justify-center items-center gap-4 lg:flex lg:flex-row lg:gap-6">
        <CardSmartgrow
          text="Temperatura del agua"
          date={date}
          hour={hour}
          value={temperaturaAgua}
          units="°C"
          dataApi="temperatura"
          sensor="phec"
        />
        <CardSmartgrow
          text="PH"
          date={date}
          hour={hour}
          value={ph}
          units=""
          dataApi="ph"
          sensor="phec"
        />
        <CardSmartgrow
          text="Conductividad Electrica"
          date={date}
          hour={hour}
          value={ec}
          units="mS/cm"
          dataApi="ec"
          sensor="phec"
        />
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-4 lg:flex lg:flex-row lg:gap-6">
        <CardSmartgrow
          text="Nivel de agua"
          date="Sin datos"
          hour=""
          value=""
          units="cm"
          dataApi=""
          sensor="phec"
        />
      </div>
    </LayaoutCards>
  );
};

export default Hidroponico;
