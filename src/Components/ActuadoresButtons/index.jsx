import { useContext } from "react";
import { CiPower } from "react-icons/ci";
import { HiXMark } from "react-icons/hi2";
import { SmartgrowContext } from "../../SmartgrowContext";

import Swal from "sweetalert2";

const ModalButtons = (callback) => {
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
        title: "¡Listo!",
        text: "Activada",
        icon: "success",
        confirmButtonColor: "#6A994E",
      }).then(() => {
        Swal.fire({
          title: "¡Listo!",
          text: "El valor del PH fue modificado",
          icon: "success",
          confirmButtonColor: "#6A994E",
        }).then(() => {
          callback(false);
        });
      });
    }
  });
};

const ActuadoresButtons = () => {
  const {
    setOpenModalActuadores,
    mqttPublish,
    statusWaterInlet,
    statusWaterOutlet,
  } = useContext(SmartgrowContext);

  const context = (payload) => {
    return {
      topic: "smartgrow/hidroponico/actuadores",
      qos: 0,
      payload,
    };
  };
  const styleActivate = "bg-primary hover:bg-primary/90";
  const deactivateActivate = "bg-quartiary hover:bg-quartiary/90";
  return (
    <div className="w-full h-1/3 pb-8 lg:pb-0 bg-white fixed left-0 bottom-16 rounded-t-md lg:rounded-xl shadow-xl lg:relative lg:w-1/3 lg:h-1/3 flex justify-center items-center gap-6">
      <div className="flex flex-col w-2/5 h-4/5 gap-4">
        <h2 className="text-lg lg:text-2xl text-center">Entrada de agua</h2>
        <button
          className={`h-full flex justify-center items-center rounded-lg ${
            statusWaterInlet ? styleActivate : deactivateActivate
          }`}
          onClick={() => {
            ModalButtons(setOpenModalActuadores);
            mqttPublish(context("entrada_de_agua_hidroponico"));
          }}
        >
          <CiPower className="w-12 h-12" />
        </button>
      </div>
      <div className="w-2/5 h-4/5 flex flex-col gap-4">
        <h2 className="text-lg lg:text-2xl text-center">Salida de agua</h2>
        <button
          className={`h-full flex justify-center items-center rounded-lg ${
            statusWaterOutlet ? styleActivate : deactivateActivate
          }`}
          onClick={() => {
            ModalButtons(setOpenModalActuadores);
            mqttPublish(context("desague_hidroponico"));
          }}
        >
          <CiPower className="w-12 h-12" />
        </button>
      </div>
      <span
        className="hidden lg:block absolute -right-5 -top-5 bg-quartiary rounded-full p-1 cursor-pointer hover:bg-quartiary/90"
        onClick={() => {
          setOpenModalActuadores(false);
        }}
      >
        <HiXMark className="w-12 h-12" />
      </span>
    </div>
  );
};

export default ActuadoresButtons;
