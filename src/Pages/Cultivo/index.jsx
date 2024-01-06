import CardSmartgrow from "../../Components/CardSmartgrow";
import LayaoutCards from "../../Components/LayaoutCards";

const Cultivo = () => {
  return (
    <LayaoutCards>
      <div className="w-full flex flex-col justify-center items-center gap-4 lg:flex lg:flex-row lg:gap-6">
        <CardSmartgrow
          text="Temperatura"
          date="03 Ene, 2024"
          hour="08:21 AM"
          value="28"
          units="°C"
          dataApi="temperatura"
          sensor="scd40"
        />
        <CardSmartgrow
          text="Humedad"
          date="03 Ene, 2024"
          hour="08:21 AM"
          value="28"
          units="%"
          dataApi="humedad"
          sensor="scd40"
        />
        <CardSmartgrow
          text="Dioxido de carbono"
          date="03 Enero, 2024"
          hour="08:21 AM"
          value="116"
          units="ppm"
          dataApi="co2"
          sensor="scd40"
        />
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-4 lg:flex lg:flex-row lg:gap-6">
        <CardSmartgrow
          text="PPF"
          date="03 Ene, 2024"
          hour="08:21 AM"
          value="0.12"
          units="umol"
        />
        <CardSmartgrow
          text="VPD"
          date="03 Ene, 2024"
          hour="08:21 AM"
          value="96"
          units="%"
          dataApi="VPD"
          sensor="scd40"
        />
        <CardSmartgrow
          text="PPFD"
          date="03 Ene, 2024"
          hour="08:21 AM"
          value="96"
          units="umol*m2"
        />
      </div>
    </LayaoutCards>
  );
};

export default Cultivo;
