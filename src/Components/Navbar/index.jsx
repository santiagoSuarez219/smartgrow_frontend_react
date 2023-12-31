import { NavLink } from "react-router-dom";
import { useContext } from "react";

import { HiCheck } from "react-icons/hi2";
import { HiMiniXMark } from "react-icons/hi2";

import { SmartgrowContext } from "../../SmartgrowContext";

const NavBarDesktop = () => {
  const {
    statusRecirculation,
    statusWaterInlet,
    statusWaterOutlet,
    statusMqtt,
    openModalActuadores,
    setOpenModalActuadores,
    openModalControl,
    setOpenModalControl,
  } = useContext(SmartgrowContext);
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
                isActive && !openModalActuadores && !openModalControl
                  ? activeStyle
                  : undefined
              }
            >
              <h2 className="font-medium text-primary text-xl">Hidroponico</h2>
            </NavLink>
          </li>
          <li
            className={openModalActuadores ? activeStyle : undefined}
            onClick={() => {
              setOpenModalActuadores((state) => !state);
              setOpenModalControl(false);
            }}
          >
            <h2 className="font-medium text-primary text-xl cursor-pointer">
              Actuadores
            </h2>
          </li>
          <li
            className={openModalControl ? activeStyle : undefined}
            onClick={() => {
              setOpenModalControl((state) => !state);
              setOpenModalActuadores(false);
            }}
          >
            <h2 className="font-medium text-primary text-xl cursor-pointer">
              Control
            </h2>
          </li>
        </ul>
        <div className="text-xl flex items-center gap-6">
          <div className="flex items-center gap-2">
            {statusWaterInlet && <HiCheck className="h-6 w-6 text-secondary" />}
            {!statusWaterInlet && (
              <HiMiniXMark className="h-6 w-6 text-quartiary" />
            )}
            <p className="text-primary">Entrada de agua</p>
          </div>
          <div className="flex items-center gap-2">
            {statusWaterOutlet && (
              <HiCheck className="h-6 w-6 text-secondary" />
            )}
            {!statusWaterOutlet && (
              <HiMiniXMark className="h-6 w-6 text-quartiary" />
            )}
            <p className="text-primary">Salida de agua</p>
          </div>
          <div className="flex items-center gap-2">
            {statusRecirculation && (
              <HiCheck className="h-6 w-6 text-secondary" />
            )}
            {!statusRecirculation && (
              <HiMiniXMark className="h-6 w-6 text-quartiary" />
            )}
            <p className="text-primary">Recirculacion</p>
          </div>
          <div className="flex items-center gap-2">
            {statusMqtt && <HiCheck className="h-6 w-6 text-secondary" />}
            {!statusMqtt && <HiMiniXMark className="h-6 w-6 text-quartiary" />}
            <p className="text-primary">MQTT</p>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBarDesktop;
