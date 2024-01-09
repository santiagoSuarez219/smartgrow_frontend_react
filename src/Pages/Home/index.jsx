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
  const {
    openModalActuadores,
    openModalControl,
    openModalGrafica,
    valueModal,
    sensorModal,
  } = useContext(SmartgrowContext);
  return (
    <>
      <Navbar />
      <StatusBars />
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
      {openModalGrafica && (
        <Modal>
          <GraficaForm text={valueModal} sensor={sensorModal} />
        </Modal>
      )}
    </>
  );
}

export default Home;
