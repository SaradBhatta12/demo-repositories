// src/app/components/UpdatePopup.tsx
"use client"; // Indicating this component runs on the client side

import dynamic from "next/dynamic";
import { FaEnvelope, FaImage, FaLock, FaTimes, FaUser } from "react-icons/fa";

// Dynamically import the Courses component (server-side component)
const Courses = dynamic(() => import("../components/server/Courses"), {
  ssr: true,
});

interface UpdatePopupProps {
  onClose: () => void;
  id: string;
}

const UpdatePopup: React.FC<UpdatePopupProps> = ({ onClose, id }) => {
  return (
    <div className="popup fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-500 hover:text-red-700"
        >
          <FaTimes size={20} />
        </button>

        {/* Form Title */}
        <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">
          Register for Courses
        </h2>

        {/* Form */}
        <form className="space-y-4">
          {/* Name Field */}
          <div className="flex items-center border border-gray-300 p-2 rounded">
            <FaUser className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Name"
              className="w-full outline-none text-gray-700"
            />
          </div>

          {/* Age Field */}
          <div className="flex items-center border border-gray-300 p-2 rounded">
            <input
              type="number"
              placeholder="Age"
              className="w-full outline-none text-gray-700"
            />
          </div>

          {/* Email Field */}
          <div className="flex items-center border border-gray-300 p-2 rounded">
            <FaEnvelope className="text-gray-500 mr-2" />
            <input
              type="email"
              placeholder="Email"
              className="w-full outline-none text-gray-700"
            />
          </div>

          {/* Password Field */}
          <div className="flex items-center border border-gray-300 p-2 rounded">
            <FaLock className="text-gray-500 mr-2" />
            <input
              type="password"
              placeholder="Password"
              className="w-full outline-none text-gray-700"
            />
          </div>

          {/* Image Upload Field */}
          <div className="flex items-center border border-gray-300 p-2 rounded">
            <FaImage className="text-gray-500 mr-2" />
            <input type="file" className="w-full outline-none text-gray-700" />
          </div>

          {/* Include the dynamically imported Courses component */}
          <Courses />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePopup;
