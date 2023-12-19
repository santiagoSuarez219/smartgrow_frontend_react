import { useContext } from "react";
import Navbar from "../../Components/Navbar";
import CardCultivo from "../../Components/CardCultivo";
import Layout from "../../Components/Layaout";
import HourDate from "../../Components/HourDate";
import SystemStatus from "../../Components/SystemStatus";
import ActuatorButtons from "../../Components/ActuatorButtons";
import HidroponicoControl from "../../Components/HidroponicoControl";
import CardHidroponico from "../../Components/CardHidroponico";
import SetPointForm from "../../Components/SetPointForm";
import TabBar from "../../Components/TabBar";
import { SmartgrowContext } from "../../SmartgrowContext";
import { Modal } from "../../Modal";

function Home() {
  const { openModal } = useContext(SmartgrowContext);
  return (
    <>
      <Layout>
        <Navbar />
        <HourDate />
        <SystemStatus />
        <ActuatorButtons />
        <HidroponicoControl />
        <div className="overflow-y-auto overscroll-y-contain">
          <CardCultivo />
          <CardHidroponico />
        </div>
        <TabBar />
      </Layout>
      {openModal && (
        <Modal>
          <SetPointForm />
        </Modal>
      )}
    </>
  );
}

export default Home;
