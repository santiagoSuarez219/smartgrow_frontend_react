import { useContext } from "react";

import Navbar from "../../Components/Navbar";
import StatusBars from "../../Components/StatusBars";
import ActuadoresButtons from "../../Components/ActuadoresButtons";
import SetPointForm from "../../Components/SetPointForm";
import GraficaForm from "../../Components/GraficaForm";
import TabBar from "../../Components/TabBar";
import { SmartgrowContext } from "../../SmartgrowContext";
import { Modal } from "../../Modal";
import "./styles.css";

function Home() {
  const { openModal, valueModal, sensorModal } = useContext(SmartgrowContext);
  return (
    <>
      <Navbar />
      <StatusBars />
      <TabBar />
      {openModal.actuadores && (
        <Modal>
          <ActuadoresButtons />
        </Modal>
      )}
      {openModal.control && (
        <Modal>
          <SetPointForm />
        </Modal>
      )}
      {openModal.grafica && (
        <Modal>
          <GraficaForm text={valueModal} sensor={sensorModal} />
        </Modal>
      )}
    </>
  );
}

export default Home;
