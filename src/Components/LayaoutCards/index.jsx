import "./styles.css";

const LayaoutCards = ({ children }) => {
  return (
    <section className="cultivo-section overflow-y-scroll px-4 pb-14 lg:p-6 lg:overflow-y-hidden">
      <div className="w-full lg:h-full flex flex-col justify-center gap-4 lg:gap-6">
        {children}
      </div>
    </section>
  );
};

export default LayaoutCards;
