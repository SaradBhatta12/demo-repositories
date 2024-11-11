import { FaSpinner } from "react-icons/fa";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div className="text-center">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
      </div>
    </div>
  );
};

export default Loading;
