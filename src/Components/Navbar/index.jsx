import { NavLink } from "react-router-dom";
import { useContext } from "react";

import { HiCheck } from "react-icons/hi2";
import { HiMiniXMark } from "react-icons/hi2";

import { SmartgrowContext } from "../../SmartgrowContext";

const NavBar = () => {
  const { statusSystem, openModal, setOpenModal } =
    useContext(SmartgrowContext);
  const activeStyle = "underline underline-offset-2";
  return (
    <>
      <nav className="hidden lg:flex w-full h-14 px-6 justify-between">
        <ul className="flex items-center gap-4">
          <li>
            <NavLink to="/">
              <h1 className="font-bold text-primary text-2xl">Smartgrow</h1>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              <h2 className="font-medium text-primary text-xl">Cultivo</h2>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/hidroponico"
              className={({ isActive }) =>
                isActive && !openModal.actuadores && !openModal.control
                  ? activeStyle
                  : undefined
              }
            >
              <h2 className="font-medium text-primary text-xl">Hidroponico</h2>
            </NavLink>
          </li>
          <li
            className={openModal.actuadores ? activeStyle : undefined}
            onClick={() => {
              setOpenModal({
                ...openModal,
                actuadores: !openModal.actuadores,
                control: false,
              });
            }}
          >
            <h2 className="font-medium text-primary text-xl cursor-pointer">
              Actuadores
            </h2>
          </li>
          <li
            className={openModal.control ? activeStyle : undefined}
            onClick={() => {
              setOpenModal({
                ...openModal,
                actuadores: false,
                control: !openModal.control,
              });
            }}
          >
            <h2 className="font-medium text-primary text-xl cursor-pointer">
              Control
            </h2>
          </li>
        </ul>
        <div className="text-xl flex items-center gap-6">
          <div className="flex items-center gap-2">
            {statusSystem.entrada && (
              <HiCheck className="h-6 w-6 text-secondary" />
            )}
            {!statusSystem.entrada && (
              <HiMiniXMark className="h-6 w-6 text-quartiary" />
            )}
            <p className="text-primary">Entrada de agua</p>
          </div>
          <div className="flex items-center gap-2">
            {statusSystem.salida && (
              <HiCheck className="h-6 w-6 text-secondary" />
            )}
            {!statusSystem.salida && (
              <HiMiniXMark className="h-6 w-6 text-quartiary" />
            )}
            <p className="text-primary">Salida de agua</p>
          </div>
          <div className="flex items-center gap-2">
            {statusSystem.recirculacion && (
              <HiCheck className="h-6 w-6 text-secondary" />
            )}
            {!statusSystem.recirculacion && (
              <HiMiniXMark className="h-6 w-6 text-quartiary" />
            )}
            <p className="text-primary">Recirculacion</p>
          </div>
          <div className="flex items-center gap-2">
            {statusSystem.mqtt && (
              <HiCheck className="h-6 w-6 text-secondary" />
            )}
            {!statusSystem.mqtt && (
              <HiMiniXMark className="h-6 w-6 text-quartiary" />
            )}
            <p className="text-primary">MQTT</p>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
