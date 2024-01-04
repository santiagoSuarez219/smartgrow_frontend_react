import React from "react";
import CardSmartgrow from "../../Components/CardSmartgrow";

const Hidroponico = () => {
  return (
    <section className="cultivo-section overflow-y-scroll flex flex-col space-y-4 px-4 pb-14">
      <CardSmartgrow
        text="Temperatura del agua"
        date="03 Enero, 2024"
        hour="08:21 AM"
        value="28"
        units="°C"
      />
      <CardSmartgrow
        text="PH"
        date="03 Enero, 2024"
        hour="08:21 AM"
        value="116"
        units=""
      />
      <CardSmartgrow
        text="Conductividad Electrica"
        date="03 Enero, 2024"
        hour="08:21 AM"
        value="0.12"
        units="mS/cm"
      />
      <CardSmartgrow
        text="Nivel de agua"
        date="03 Enero, 2024"
        hour="08:21 AM"
        value="28.23"
        units="cm"
      />
    </section>
  );
};

export default Hidroponico;
