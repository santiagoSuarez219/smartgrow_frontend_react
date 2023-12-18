import React, { useContext } from "react";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import { PiPlant } from "react-icons/pi";
import { WiLightning } from "react-icons/wi";
import { SmartgrowContext } from "../../SmartgrowContext";

const HidroponicoControl = () => {
  const { openModal, setOpenModal, setValueModal } = useContext(SmartgrowContext);

  return (
    <div className="mt-4 w-full h-1/2 flex flex-col rounded-md">
      <h2 className="font-semibold mb-2 text-lg">Control Hidroponico</h2>
      <div className="w-full h-1/2 flex space-x-4 justify-between">
        <ButtonIcon
          text={"PH"}
          icon={PiPlant}
          onClick={() => {
            setOpenModal((state) => !state);
            setValueModal("ph");
          }}
        />
        <ButtonIcon
          text={"Electroconductividad"}
          icon={WiLightning}
          onClick={() => {
            setOpenModal((state) => !state);
            setValueModal("ec");
          }}
        />
      </div>
    </div>
  );
};

export default HidroponicoControl;
