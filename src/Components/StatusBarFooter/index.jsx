import React from "react";

const StatusBarFooter = () => {
  return (
    <div className="w-full px-4 fixed bottom-20 z-20 lg:bottom-6">
      <div className="bg-slate-400 px-2 py-0.5 rounded-md font-semibold flex text-base justify-between lg:text-2xl lg:px-6">
        <p>
          16 <span className="font-normal">Recirculaciones</span>
        </p>
        <p>03 Enero 2024</p>
      </div>
    </div>
  );
};

export default StatusBarFooter;
