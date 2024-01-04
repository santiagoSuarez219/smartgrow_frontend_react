import { useContext } from "react";

import Navbar from "../../Components/Navbar";
import StatusBars from "../../Components/StatusBars";
import ActuadoresButtons from "../../Components/ActuadoresButtons";
import SetPointForm from "../../Components/SetPointForm";
import TabBar from "../../Components/TabBar";
import StatusBarFooter from "../../Components/StatusBarFooter";
import { SmartgrowContext } from "../../SmartgrowContext";
import { Modal } from "../../Modal";
import "./styles.css";

function Home() {
  const { openModalActuadores, openModalControl } =
    useContext(SmartgrowContext);
  return (
    <>
      <Navbar />
      <StatusBars />
      <StatusBarFooter />
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
