import CardActuador from "../../Components/CardActuador";
import LayaoutCards from "../../Components/LayaoutCards";

const Sistema = () => {
  return (
    <LayaoutCards>
      <div className="w-full flex flex-col justify-center items-center gap-4 lg:flex lg:flex-row lg:gap-6">
        <CardActuador text="Entrada de agua" />
        <CardActuador text="Salida de agua" />
        <CardActuador text="Control" />
      </div>
    </LayaoutCards>
  );
};

export default Sistema;
