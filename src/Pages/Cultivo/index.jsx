import React from "react";

import CardSmartgrow from "../../Components/CardSmartgrow";
import Layout from "../../Components/Layaout";

const Cultivo = () => {
  return (
    <section className="cultivo-section overflow-y-scroll flex flex-col space-y-4 px-4">
      <CardSmartgrow
        text="Temperatura"
        date="03 Enero, 2024"
        hour="08:21 AM"
        value="28"
        units="°C"
      />
      <CardSmartgrow
        text="Humedad"
        date="03 Enero, 2024"
        hour="08:21 AM"
        value="28"
        units="%"
      />
      <CardSmartgrow
        text="Dioxido de carbono"
        date="03 Enero, 2024"
        hour="08:21 AM"
        value="116"
        units="ppm"
      />
      <CardSmartgrow
        text="PPF"
        date="03 Enero, 2024"
        hour="08:21 AM"
        value="0.12"
        units="umol"
      />
      <CardSmartgrow
        text="VPD"
        date="03 Enero, 2024"
        hour="08:21 AM"
        value="96"
        units="%"
      />
      <CardSmartgrow
        text="PPFD"
        date="03 Enero, 2024"
        hour="08:21 AM"
        value="96"
        units="umol*m2"
      />
    </section>
  );
};

export default Cultivo;
