import React from "react";

const ActuadoresButtons = () => {
  return (
    <div className="px-4 pt-8 fixed left-0 bottom-16 bg-white h-52 w-full rounded-t-md shadow flex flex-col items-center gap-4">
      <button className="w-full border-2 border-primary rounded-md p-2 text-secondary">
        Entrada de agua
      </button>
      <button className="w-full border-2 border-primary rounded-md p-2 text-secondary">
        Salida de agua
      </button>
    </div>
  );
};

export default ActuadoresButtons;
