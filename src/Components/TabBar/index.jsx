import { HiHome } from "react-icons/hi";
import { RiPlantFill } from "react-icons/ri";
import { FaPowerOff } from "react-icons/fa6";
import { GrPowerCycle } from "react-icons/gr";

const TabBar = () => {
  return (
    <div className="w-full h-16 bg-white fixed left-0 bottom-0 shadow-md flex items-center justify-around">
      <div className="flex flex-col items-center">
        <HiHome className="w-6 h-6 text-secondary" />
        <p className="text-base text-secondary">Cultivo</p>
      </div>
      <div className="flex flex-col items-center">
        <RiPlantFill className="w-6 h-6 text-secondary" />
        <p className="text-base text-secondary">Hidroponico</p>
      </div>
      <div className="flex flex-col items-center">
        <FaPowerOff className="w-6 h-6 text-secondary" />
        <p className="text-base text-secondary">Actuadores</p>
      </div>
      <div className="flex flex-col items-center">
        <GrPowerCycle className="w-6 h-6 text-secondary" />
        <p className="text-base text-secondary">Control</p>
      </div>
    </div>
  );
};

export default TabBar;
