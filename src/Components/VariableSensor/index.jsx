const VariableSensor = ({ parametro, icon: Icon, iconColor, unidades, valor }) => {
  return (
    <div className="h-1/7 flex justify-between items-center p-1">
      <div className="flex items-center">
        <Icon className={`w-8 h-8 lg:w-10 lg:h-10 ${iconColor}`} />
        <p className="ml-2 lg:text-2xl cursor-pointer">{parametro}</p>
      </div>
      <div className="flex">
        <p className="lg:text-2xl">
          {valor} {unidades}
        </p>
      </div>
    </div>
  );
};

export default VariableSensor;

