import { DotLoader } from "react-spinners";

const LoadingModal = () => {
  return (
    <div className="w-1/3 h-1/3 flex justify-center items-center rounded-xl bg-white">
      <DotLoader color="#36d7b7" className="" />
    </div>
  );
};

export default LoadingModal;
