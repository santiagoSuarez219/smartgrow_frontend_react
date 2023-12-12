import { useState, useContext } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { AiFillCloseCircle } from "react-icons/ai";
import { SmartgrowContext } from "../../SmartgrowContext";

const SystemStatus = () => {
  const {
    statusRecirculation,
    statusWaterInlet,
    statusWaterOutlet,
    statusMqtt,
  } = useContext(SmartgrowContext);

  return (
    <div className="w-full flex justify-between">
      <div className="flex items-center">
        {statusWaterInlet && (
          <AiFillCheckCircle className="h-3 w-3 text-secondary" />
        )}
        {!statusWaterInlet && (
          <AiFillCloseCircle className="h-3 w-3 text-red-500" />
        )}
        <p className="ml-1 text-sm">Entrada de agua</p>
      </div>
      <div className="flex items-center">
        {statusWaterOutlet && (
          <AiFillCheckCircle className="h-3 w-3 text-secondary" />
        )}
        {!statusWaterOutlet && (
          <AiFillCloseCircle className="h-3 w-3 text-red-500" />
        )}
        <p className="ml-1 text-sm">Salida de agua</p>
      </div>
      <div className="flex items-center">
        {statusRecirculation && (
          <AiFillCheckCircle className="h-3 w-3 text-secondary" />
        )}
        {!statusRecirculation && (
          <AiFillCloseCircle className="h-3 w-3 text-red-500" />
        )}
        <p className="ml-1 text-sm">Recirculacion</p>
      </div>
      <div className="flex items-center">
        {statusMqtt && <AiFillCheckCircle className="h-3 w-3 text-secondary" />}
        {!statusMqtt && <AiFillCloseCircle className="h-3 w-3 text-red-500" />}
        <p className="ml-1 text-sm">MQTT</p>
      </div>
    </div>
  );
};

export default SystemStatus;