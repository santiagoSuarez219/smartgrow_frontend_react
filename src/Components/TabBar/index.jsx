import { NavLink } from "react-router-dom";
import { HiHome } from "react-icons/hi";
import { RiPlantFill } from "react-icons/ri";
import { FaPowerOff } from "react-icons/fa6";
import { GrPowerCycle } from "react-icons/gr";

const TabBar = () => {
  const activeStyle = "text-primary flex flex-col items-center";
  const deactiveStyle = "text-primary/50 flex flex-col items-center";
  return (
    <div className="w-full h-16 bg-white fixed left-0 bottom-0 shadow-md flex items-center justify-around">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? activeStyle : deactiveStyle)}
      >
        <HiHome className="w-6 h-6" />
        <p className="text-base">Cultivo</p>
      </NavLink>
      <NavLink
        to="/hidroponico"
        className={({ isActive }) => (isActive ? activeStyle : deactiveStyle)}
      >
        <RiPlantFill className="w-6 h-6" />
        <p className="text-base">Hidroponico</p>
      </NavLink>
      <div className="flex flex-col items-center">
        <FaPowerOff className="w-6 h-6 text-primary/50" />
        <p className="text-base text-primary/50">Actuadores</p>
      </div>
      <div className="flex flex-col items-center">
        <GrPowerCycle className="w-6 h-6 text-primary/50" />
        <p className="text-base text-primary/50">Control</p>
      </div>
    </div>
  );
};

export default TabBar;
