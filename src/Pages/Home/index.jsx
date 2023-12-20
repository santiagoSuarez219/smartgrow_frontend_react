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
import GraficaForm from "../../Components/GraficaForm";
import { ImSwitch } from "react-icons/im";
import { HiOutlinePencilAlt } from "react-icons/hi";
import CardDesktop from "../../Components/CardDesktop";

function Home() {
  const { openModal, openModalGrafica } = useContext(SmartgrowContext);
  return (
    <>
      <Layout>
        <div className="w-full lg:bg-secondary lg:flex lg:justify-between lg:items-center lg:px-2">
          <Navbar />
          <HourDate />
        </div>
        <SystemStatus />
        <ActuatorButtons />
        <HidroponicoControl />
        <div className="w-full overflow-y-auto overscroll-y-contain lg:flex lg:justify-start lg:space-x-2 lg:p-4">
          <CardCultivo />
          <CardHidroponico />
          <div className="hidden lg:flex flex-col w-1/3 h-full space-y-2">
            <CardDesktop
              title="Actuadores"
              primer_parametro="Entrada de agua"
              segundo_parametro="Salida de agua"
              icon={ImSwitch}
            />
            <CardDesktop
              title="Control Hidroponico"
              primer_parametro="PH del agua"
              segundo_parametro="Electroconductividad"
              icon={HiOutlinePencilAlt}
            />
          </div>
        </div>
        <TabBar />
      </Layout>
      {openModal && (
        <Modal>
          <SetPointForm />
        </Modal>
      )}
      {openModalGrafica && (
        <Modal>
          <GraficaForm filter_data="temperatura" />
        </Modal>
      )}
    </>
  );
}

export default Home;
