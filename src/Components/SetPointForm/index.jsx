import { useContext, useState } from "react";
import { SmartgrowContext } from "../../SmartgrowContext";

const SetPointForm = () => {
  const { setOpenModal, valueModal } =
    useContext(SmartgrowContext);

  const [newValue, setNewValue] = useState("");

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
      className="w-11/12 p-8 bg-quartiary rounded-lg shadow-lg flex flex-col justify-center items-center"
      onSubmit={onSubmit}
    >
      <label className="mb-6 text-center font-bold text-base">Escribe el valor del setpoint {valueModal}</label>
      <input className="w-full border-2 boorder-solid border-primary rounded-lg shadow-sm text-center " type="text" placeholder="0.00" onChange={onChange} value={newValue}></input>
      <div className="mt-4 w-full flex justify-end space-x-2">
        <button className="w-1/2 p-2 rounded-lg shadow-sm border-2 border-red-500 hover:bg-red-400" type="button" onClick={onCancel}>
          Cancelar
        </button>
        <button className="w-1/2 p-2 rounded-lg shadow-sm border-2 border-primary hover:bg-green-500" type="submit">
          Enviar
        </button>
      </div>
    </form>
  );
};

export default SetPointForm;
