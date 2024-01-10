import React, { useContext, useState, useEffect } from "react";
import { SmartgrowContext } from "../../SmartgrowContext";
import { HiXMark } from "react-icons/hi2";
import { useUtilsSetPointForm } from "./useUtilsSetPointForm";

const SetPointForm = () => {
  const { setOpenModal, openModal, mqttPublish } = useContext(SmartgrowContext);

  const [setPointLabel, setSetPointLabel] = useState("ph");
  const [value, setValue] = React.useState("");
  const [newValue, setNewValue] = React.useState("");

  const { fetchData, validateAndSend } = useUtilsSetPointForm(
    setValue,
    setPointLabel,
    newValue,
    mqttPublish,
    setOpenModal,
    openModal
  );

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await validateAndSend();
    } catch (error) {
      console.error("Error al enviar el SetPoint:", error);
    }
  };

  const onChange = (event) => {
    setNewValue(event.target.value);
  };

  useEffect(() => {
    fetchData();
  }, [setPointLabel]);

  return (
    <form
      className="w-full h-64 px-4 pt-4 lg:p-6 fixed left-0 bottom-16 bg-white rounded-t-md shadow flex flex-col gap-4 lg:relative lg:w-1/3 lg:h-1/3 lg:rounded-xl lg:justify-center"
      onSubmit={onSubmit}
    >
      <div className="lg:flex lg:flex-col lg:gap-4">
        <p className="text-sm lg:text-2xl">
          Eliga el valor que desea modificar
        </p>
        <select
          className="w-1/2 border-2 p-1 rounded-md text-sm lg:text-2xl text-black text-center"
          name="control_label"
          id="control_label"
          onChange={(e) => setSetPointLabel(e.target.value)}
        >
          <option value="ph">PH</option>
          <option value="ec">Electroconductividad</option>
        </select>
      </div>
      <div className="w-full flex flex-col">
        <p className="text-xs lg:text-xl text-primary">
          El valor actual es {value}
        </p>
        <input
          type="number"
          name="value"
          id="value"
          placeholder="Escriba el valor del SetPoint"
          onChange={onChange}
          value={newValue}
          className="w-full border-2 lg:border-3 border-primary rounded-md p-1 lg:p-2 text-sm lg:text-2xl text-black"
        />
      </div>
      <div className="w-full flex justify-end">
        <button
          type="submit"
          className="w-1/2 border-2 lg:border-3 border-primary p-2 rounded-md text-sm lg:text-2xl text-secondary lg:hover:bg-primary lg:hover:text-white"
        >
          Enviar
        </button>
      </div>
      <span
        className="hidden lg:block absolute -right-5 -top-5 bg-quartiary rounded-full p-1 cursor-pointer hover:bg-quartiary/90"
        onClick={() => {
          setOpenModal({
            ...openModal,
            control: false,
          });
        }}
      >
        <HiXMark className="w-12 h-12" />
      </span>
    </form>
  );
};

export default SetPointForm;
