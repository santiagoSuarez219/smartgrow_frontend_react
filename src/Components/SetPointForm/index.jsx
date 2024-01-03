import React, { useContext, useState } from "react";
import { SmartgrowContext } from "../../SmartgrowContext";

const SetPointForm = () => {
  const { setOpenModal, valueModal } = useContext(SmartgrowContext);

  const [newValue, setNewValue] = React.useState("");

  const onSubmit = (event) => {
    event.preventDefault();
  };

  const onChange = (event) => {
    setNewValue(event.target.value);
  };

  const onCancel = () => {
    setOpenModal(false);
  };

  return (
    <form
      className="px-4 pt-8 fixed left-0 bottom-16 bg-white h-64 w-full rounded-t-md shadow flex flex-col items-center gap-4"
      onSubmit={onSubmit}
    >
      <div className="w-full flex gap-2">
        <button className="w-1/2 border-2 border-primary p-2 rounded-md text-sm text-secondary">
          PH
        </button>
        <button className="w-1/2 border-2 border-primary p-2 rounded-md text-sm text-secondary">
          Electroconductividad
        </button>
      </div>
      <div className="w-full flex flex-col">
        <p className="text-xs text-primary">El valor actual es 0.32</p>
        <input
          type="number"
          name="value"
          id="value"
          placeholder="Escriba el valor del SetPoint"
          className="w-full border-2 border-primary rounded-md p-1 text-sm text-secondary"
        />
      </div>
      <div className="w-full flex gap-2">
        <button className="w-1/2 border-2 border-quartiary p-2 rounded-md text-sm text-quartiary">
          Cancelar
        </button>
        <button className="w-1/2 border-2 border-primary p-2 rounded-md text-sm text-secondary">
          Enviar
        </button>
      </div>
      {/* <label className="mb-6 text-center font-bold text-base">
        Escribe el valor del setpoint {valueModal}
      </label>
      <input
        className="w-full border-2 boorder-solid border-primary rounded-lg shadow-sm text-center "
        type="text"
        placeholder="0.00"
        onChange={onChange}
        value={newValue}
      ></input>
      <div className="mt-4 w-full flex justify-end space-x-2">
        <button
          className="w-1/2 p-2 rounded-lg shadow-sm border-2 border-red-500 hover:bg-red-400"
          type="button"
          onClick={onCancel}
        >
          Cancelar
        </button>
        <button
          className="w-1/2 p-2 rounded-lg shadow-sm border-2 border-primary hover:bg-green-500"
          type="submit"
        >
          Enviar
        </button>
      </div> */}
    </form>
  );
};

export default SetPointForm;
