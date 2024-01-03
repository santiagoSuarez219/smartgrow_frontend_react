import React from "react";

import Swal from "sweetalert2";

const ActuadoresButtons = () => {
  return (
    <div className="px-4 pt-8 fixed left-0 bottom-16 bg-white h-52 w-full rounded-t-md shadow flex flex-col items-center gap-4">
      <button
        className="w-full border-2 border-primary rounded-md p-2 text-secondary"
        onClick={() => {
          Swal.fire({
            title: "¿Estas seguro?",
            text: "Vas a activar la entrada de agua",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#6A994E",
            cancelButtonColor: "#BC4749",
            confirmButtonText: "Si, activar",
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "¡Activando!",
                text: "Estamos activando la entrada de agua",
                timer: 3000,
                timerProgressBar: true,
                didOpen: () => {
                  Swal.showLoading();
                },
              });
            }
          });
        }}
      >
        Entrada de agua
      </button>
      <button className="w-full border-2 border-primary rounded-md p-2 text-secondary">
        Salida de agua
      </button>
    </div>
  );
};

export default ActuadoresButtons;
