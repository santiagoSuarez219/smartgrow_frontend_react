import { useContext } from "react";

import Layout from "../../Components/Layaout";
import SystemStatusBar from "../../Components/SystemStatusBar";
import { SmartgrowContext } from "../../SmartgrowContext";

const StatusBars = () => {
  const {
    statusRecirculation,
    statusWaterInlet,
    statusWaterOutlet,
    statusMqtt,
  } = useContext(SmartgrowContext);
  return (
    <Layout>
      <div className="bg-tertiary rounded-md mb-4 h-8 w-full flex items-center justify-center">
        <h1 className="font-bold text-lg text-primary">Smartgrow</h1>
      </div>
      <section className="w-full mb-4">
        <SystemStatusBar text="Entrada de agua" status={statusWaterInlet} />
        <SystemStatusBar text="Salida de agua" status={statusWaterOutlet} />
        <SystemStatusBar text="Recirculacion" status={statusRecirculation} />
        <SystemStatusBar text="MQTT" status={statusMqtt} />
      </section>
    </Layout>
  );
};

export default StatusBars;
