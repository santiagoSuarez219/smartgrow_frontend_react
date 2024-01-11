import { useContext } from "react";
import CardSmartgrow from "../../Components/CardSmartgrow";
import LayaoutCards from "../../Components/LayaoutCards";
import { formatDateTime } from "../../Utils";

import { SmartgrowContext } from "../../SmartgrowContext";

const Hidroponico = () => {
  const { sensorData, lastDates } = useContext(SmartgrowContext);
  const { formattedDate, formattedHour } = formatDateTime(lastDates.scd40);

  return (
    <LayaoutCards>
      <div className="w-full flex flex-col justify-center items-center gap-4 lg:flex lg:flex-row lg:gap-6">
        <CardSmartgrow
          text="Temperatura del agua"
          date={formattedDate}
          hour={formattedHour}
          value={sensorData.temperaturaAgua}
          units="°C"
          dataApi="temperatura"
          sensor="phec"
          image={"./img/cannabis4.jpg"}
        />
        <CardSmartgrow
          text="PH"
          date={formattedDate}
          hour={formattedHour}
          value={sensorData.ph}
          units=""
          dataApi="ph"
          sensor="phec"
          image={"./img/cannabis5.jpg"}
        />
        <CardSmartgrow
          text="Conductividad Electrica"
          date={formattedDate}
          hour={formattedHour}
          value={sensorData.ec}
          units="mS/cm"
          dataApi="ec"
          sensor="phec"
          image={"./img/cannabis6.jpg"}
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
          image={"./img/cannabis7.jpg"}
        />
      </div>
    </LayaoutCards>
  );
};

export default Hidroponico;
