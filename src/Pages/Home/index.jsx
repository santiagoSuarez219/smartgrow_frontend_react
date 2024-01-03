import { useContext } from "react";

import Layout from "../../Components/Layaout";
import Navbar from "../../Components/Navbar";
import SystemStatusBar from "../../Components/SystemStatusBar";
import SetPointForm from "../../Components/SetPointForm";
import TabBar from "../../Components/TabBar";
import StatusBarFooter from "../../Components/StatusBarFooter";
import { SmartgrowContext } from "../../SmartgrowContext";
import { Modal } from "../../Modal";
import "./styles.css";

function Home() {
  const {
    openModal,
    statusRecirculation,
    statusWaterInlet,
    statusWaterOutlet,
    statusMqtt,
  } = useContext(SmartgrowContext);
  return (
    <>
      <Layout>
        <Navbar />
        <section className="w-full mb-4">
          <SystemStatusBar text="Entrada de agua" status={statusWaterInlet} />
          <SystemStatusBar text="Salida de agua" status={statusWaterOutlet} />
          <SystemStatusBar text="Recirculacion" status={statusRecirculation} />
          <SystemStatusBar text="MQTT" status={statusMqtt} />
        </section>
        <StatusBarFooter />
      </Layout>

      <TabBar />
      {openModal && (
        <Modal>
          <SetPointForm />
        </Modal>
      )}
    </>
  );
}

export default Home;
