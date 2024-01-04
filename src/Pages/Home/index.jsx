import { useContext } from "react";

import Layout from "../../Components/Layaout";
import Navbar from "../../Components/Navbar";
import SystemStatusBar from "../../Components/SystemStatusBar";
import ActuadoresButtons from "../../Components/ActuadoresButtons";
import SetPointForm from "../../Components/SetPointForm";
import TabBar from "../../Components/TabBar";
import StatusBarFooter from "../../Components/StatusBarFooter";
import { SmartgrowContext } from "../../SmartgrowContext";
import { Modal } from "../../Modal";
import "./styles.css";

function Home() {
  const {
    openModalActuadores,
    openModalControl,
    statusRecirculation,
    statusWaterInlet,
    statusWaterOutlet,
    statusMqtt,
  } = useContext(SmartgrowContext);
  return (
    <>
      <Navbar />
      <Layout>
        <div className="bg-tertiary rounded-md mb-4 h-8 w-full flex items-center justify-center lg:hidden">
          <h1 className="font-bold text-lg text-primary">Smartgrow</h1>
        </div>
        <section className="w-full mb-4 lg:hidden">
          <SystemStatusBar text="Entrada de agua" status={statusWaterInlet} />
          <SystemStatusBar text="Salida de agua" status={statusWaterOutlet} />
          <SystemStatusBar text="Recirculacion" status={statusRecirculation} />
          <SystemStatusBar text="MQTT" status={statusMqtt} />
        </section>
        <StatusBarFooter />
      </Layout>

      <TabBar />
      {openModalActuadores && (
        <Modal>
          <ActuadoresButtons />
        </Modal>
      )}
      {openModalControl && (
        <Modal>
          <SetPointForm />
        </Modal>
      )}
    </>
  );
}

export default Home;
