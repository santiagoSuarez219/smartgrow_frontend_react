import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { HiCheck } from "react-icons/hi2";
import { HiMiniXMark } from "react-icons/hi2";
import { SmartgrowContext } from "../../SmartgrowContext";

const NavBar = () => {
  const { statusSystem, openModal, setOpenModal } =
    useContext(SmartgrowContext);

  const handleToggleModal = (modal) => {
    setOpenModal({
      ...openModal,
      actuadores: modal === "actuadores" ? !openModal.actuadores : false,
      control: modal === "control" ? !openModal.control : false,
    });
  };

  const renderStatusItem = (status, label) => (
    <div className="flex items-center gap-2">
      {status ? (
        <HiCheck className="h-4 w-4 text-secondary" />
      ) : (
        <HiMiniXMark className="h-4 w-4 text-quartiary" />
      )}
      <p className="text-primary">{label}</p>
    </div>
  );

  const activeStyle = "underline underline-offset-2";
  return (
    <>
      <nav className="hidden lg:flex w-full h-12 px-6 justify-between">
        <ul className="flex items-center gap-4">
          <li>
            <NavLink to="/">
              <h1 className="font-bold text-primary text-lg">Smartgrow</h1>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "underline underline-offset-2" : undefined
              }
            >
              <h2 className="font-medium text-primary text-base">Cultivo</h2>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/hidroponico"
              className={({ isActive }) =>
                isActive && !openModal.actuadores && !openModal.control
                  ? "underline underline-offset-2"
                  : undefined
              }
            >
              <h2 className="font-medium text-primary text-base">
                Hidroponico
              </h2>
            </NavLink>
          </li>
          <li
            className={
              openModal.actuadores ? "underline underline-offset-2" : undefined
            }
            onClick={() => handleToggleModal("actuadores")}
          >
            <h2 className="font-medium text-primary text-base cursor-pointer">
              Actuadores
            </h2>
          </li>
          <li
            className={
              openModal.control ? "underline underline-offset-2" : undefined
            }
            onClick={() => handleToggleModal("control")}
          >
            <h2 className="font-medium text-primary text-base cursor-pointer">
              Control
            </h2>
          </li>
        </ul>
        <div className="text-base flex items-center gap-6">
          {renderStatusItem(statusSystem.entrada, "Entrada de agua")}
          {renderStatusItem(statusSystem.salida, "Salida de agua")}
          {renderStatusItem(statusSystem.recirculacion, "Recirculacion")}
          {renderStatusItem(statusSystem.mqtt, "MQTT")}
        </div>
      </nav>
    </>
  );
};

export default NavBar;
