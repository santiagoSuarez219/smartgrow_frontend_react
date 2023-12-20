const CardDesktop = ({
  title,
  primer_parametro,
  segundo_parametro,
  icon: Icon,
}) => {
  return (
    <>
      <div className="w-full h-1/2 p-2 rounded-lg flex flex-col bg-quartiary">
        <p className="font-bold text-3xl">{title}</p>
        <div className="w-full h-full flex items-center">
          <div className="w-1/2 mt-4 mb-8 flex flex-col justify-center items-center space-y-2">
            <p className="text-lg">{primer_parametro}</p>
            <Icon className="w-10 h-10 cursor-pointer hover:text-blue-500" />
          </div>
          <div className="w-1/2 mt-4 mb-8 flex flex-col justify-center items-center space-y-2">
            <p className="text-lg">{segundo_parametro}</p>
            <Icon className="w-10 h-10 cursor-pointer hover:text-blue-500" />
          </div>
        </div>
      </div>
    </>
  );
};

export default CardDesktop;
