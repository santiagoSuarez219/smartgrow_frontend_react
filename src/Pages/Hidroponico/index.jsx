import CardSmartgrow from "../../Components/CardSmartgrow";
import LayaoutCards from "../../Components/LayaoutCards";

const Hidroponico = () => {
  return (
    <LayaoutCards>
      <div className="w-full flex flex-col justify-center items-center gap-4 lg:flex lg:flex-row lg:gap-6">
        <CardSmartgrow
          text="Temperatura del agua"
          date="03 Ene, 2024"
          hour="08:21 AM"
          value="28"
          units="°C"
          dataApi="temperatura"
          sensor="phec"
        />
        <CardSmartgrow
          text="PH"
          date="03 Ene, 2024"
          hour="08:21 AM"
          value="116"
          units=""
          dataApi="ph"
          sensor="phec"
        />
        <CardSmartgrow
          text="Conductividad Electrica"
          date="03 Ene, 2024"
          hour="08:21 AM"
          value="0.12"
          units="mS/cm"
          dataApi="ec"
          sensor="phec"
        />
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-4 lg:flex lg:flex-row lg:gap-6">
        <CardSmartgrow
          text="Nivel de agua"
          date="03 Ene, 2024"
          hour="08:21 AM"
          value="28.23"
          units="cm"
          dataApi=""
          sensor="phec"
        />
      </div>
    </LayaoutCards>
  );
};

export default Hidroponico;
