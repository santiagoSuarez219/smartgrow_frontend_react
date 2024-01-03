import React, { useContext, useState } from "react";
import { SmartgrowContext } from "../../SmartgrowContext";

import Swal from "sweetalert2";

const SetPointForm = () => {
  const { setOpenModalControl, setSetPointPh, setPointEc } =
    useContext(SmartgrowContext);

  const [setPointLabel, setSetPointLabel] = useState("");
  const [newValue, setNewValue] = React.useState("");

  const onSubmit = (event) => {
    event.preventDefault();
  };

  const onChange = (event) => {
    setNewValue(event.target.value);
  };

  const onCancel = () => {
    setOpenModalControl(false);
  };

  return (
    <form
      className="px-4 pt-4 fixed left-0 bottom-16 bg-white h-64 w-full rounded-t-md shadow flex flex-col gap-4"
      onSubmit={onSubmit}
    >
      <div>
        <p className="text-sm">Eliga el valor que desea modificar</p>
        <select
          className="w-1/2 border-2 p-1 rounded-md text-sm text-black text-center"
          name="control_label"
          id="control_label"
          onChange={(e) => setSetPointLabel(e.target.value)}
        >
          <option value="ph">PH</option>
          <option value="ec">Electroconductividad</option>
        </select>
      </div>
      <div className="w-full flex flex-col">
        <p className="text-xs text-primary">El valor actual es 0.32</p>
        <input
          type="number"
          name="value"
          id="value"
          placeholder="Escriba el valor del SetPoint"
          onChange={onChange}
          value={newValue}
          className="w-full border-2 border-primary rounded-md p-1 text-sm text-black"
        />
      </div>
      <div className="w-full flex justify-end">
        <button
          className="w-1/2 border-2 border-primary p-2 rounded-md text-sm text-secondary"
          onClick={() => {
            Swal.fire({
              title: "¿Estas seguro?",
              text: "Vas a modificar el valor del setpoint de PH",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#6A994E",
              cancelButtonColor: "#BC4749",
              confirmButtonText: "Si, modificar",
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire({
                  title: "¡Cambiando el valor del PH!",
                  text: "Estamos cambiando el valor del PH",
                  timer: 3000,
                  timerProgressBar: true,
                  didOpen: () => {
                    Swal.showLoading();
                  },
                }).then(() => {
                  Swal.fire({
                    title: "¡Listo!",
                    text: "El valor del PH fue modificado",
                    icon: "success",
                    confirmButtonColor: "#6A994E",
                  });
                });
              }
            });
          }}
        >
          Enviar
        </button>
      </div>
    </form>
  );
};

export default SetPointForm;
