import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { HiHome } from "react-icons/hi";
import { RiPlantFill } from "react-icons/ri";
import { FaPowerOff } from "react-icons/fa6";
import { GrPowerCycle } from "react-icons/gr";

import { SmartgrowContext } from "../../SmartgrowContext";

const TabBar = () => {
  const {
    openModalActuadores,
    setOpenModalActuadores,
    openModalControl,
    setOpenModalControl,
  } = useContext(SmartgrowContext);
  const activeStyle = "text-primary flex flex-col items-center";
  const deactiveStyle = "text-primary/50 flex flex-col items-center";
  return (
    <div className="w-full h-16 bg-white fixed left-0 bottom-0 shadow-md flex items-center justify-around z-20">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive && !openModalActuadores && !openModalControl
            ? activeStyle
            : deactiveStyle
        }
        onClick={() => {
          setOpenModalActuadores(false);
          setOpenModalControl(false);
        }}
      >
        <HiHome className="w-6 h-6" />
        <p className="text-base">Cultivo</p>
      </NavLink>
      <NavLink
        to="/hidroponico"
        className={({ isActive }) =>
          isActive && !openModalActuadores && !openModalControl
            ? activeStyle
            : deactiveStyle
        }
        onClick={() => {
          setOpenModalActuadores(false);
          setOpenModalControl(false);
        }}
      >
        <RiPlantFill className="w-6 h-6" />
        <p className="text-base">Hidroponico</p>
      </NavLink>
      <div
        className={openModalActuadores ? activeStyle : deactiveStyle}
        onClick={() => {
          setOpenModalActuadores((state) => !state);
          setOpenModalControl(false);
        }}
      >
        <FaPowerOff className="w-6 h-6" />
        <p className="text-base">Actuadores</p>
      </div>
      <div
        className={openModalControl ? activeStyle : deactiveStyle}
        onClick={() => {
          setOpenModalControl((state) => !state);
          setOpenModalActuadores(false);
        }}
      >
        <GrPowerCycle className="w-6 h-6" />
        <p className="text-base">Control</p>
      </div>
    </div>
  );
};

export default TabBar;
