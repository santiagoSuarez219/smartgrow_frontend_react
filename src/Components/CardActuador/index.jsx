import { CiPower } from "react-icons/ci";

import { HiArrowUpRight } from "react-icons/hi2";
import { CiCalendar } from "react-icons/ci";

const CardActuador = ({ text }) => {
  return (
    <div className="lg:w-[28rem] w-full h-96 lg:h-[28rem] bg-tertiary rounded-md lg:rounded-xl flex flex-col">
      <figure className="w-full h-4/5 relative rounded-t-md lg:rounded-t-xl">
        <span className="absolute bottom-0 left-0 bg-tertiary rounded-md text-primary font-bold m-4 px-2 py-0.5 lg:text-2xl">
          {text}
        </span>
        <img
          className="w-full h-full rounded-t-md lg:rounded-t-xl"
          src="./img/temperatura.jpg"
          alt="temperatura"
        />
      </figure>
      <div className="w-full h-full px-4 lg:px-6 flex justify-end items-center rounded-b-md lg:rounded-b-xl cursor-pointer">
        <CiPower className="w-12 h-12 hover:text-primary" />
      </div>
    </div>
  );
};

export default CardActuador;
