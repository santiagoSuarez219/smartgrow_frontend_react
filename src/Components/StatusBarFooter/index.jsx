import React from "react";

const StatusBarFooter = () => {
  return (
    <div className="w-full px-4 fixed bottom-20 z-50">
      <div className="bg-slate-400 px-2 py-0.5 rounded-md flex justify-between">
        <p className="text-base font-semibold">
          16 <span className="font-normal">Recirculaciones</span>
        </p>
        <p>03 Enero 2024</p>
      </div>
    </div>
  );
};

export default StatusBarFooter;
