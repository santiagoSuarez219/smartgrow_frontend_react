import React from "react";

import { HiArrowUpRight } from "react-icons/hi2";
import { CiCalendar } from "react-icons/ci";

const CardSmartgrow = () => {
  return (
    <div className="bg-tertiary w-full h-96 rounded-md">
      <figure className="relative bg-red-200 w-full h-4/5 rounded-t-md ">
        <span className="absolute bottom-0 left-0 bg-tertiary rounded-md text-primary font-bold  m-4 px-1 py-0.5">
          Temperatura
        </span>
        <img
          className="w-full h-full object-cover rounded-t-md"
          src="./img/temperatura.jpg"
          alt="temperatura"
        />
        <div className="absolute top-0 right-0 flex justify-center items-center bg-primary w-12 h-12 rounded-full m-4 cursor-pointer">
          <HiArrowUpRight className="w-4 h-4" />
        </div>
      </figure>
      <div className="flex justify-between m-4">
        <div className="flex items-center w-full">
          <CiCalendar className="w-5 h-5 mr-2" />
          <p className="text-base">
            24 Julio 2022 <span className="font-semibold">5:01 AM</span>
          </p>
        </div>
        <div className="flex">
          <p className="text-4xl font-semibold text-primary">28</p>
          <p className="text-base text-primary">°C</p>
        </div>
      </div>
    </div>
  );
};

export default CardSmartgrow;
