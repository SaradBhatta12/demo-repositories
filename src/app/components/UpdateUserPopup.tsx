"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { FaBook, FaEnvelope, FaImage, FaTimes, FaUser } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./Loading";

interface UpdatePopupProps {
  onClose: () => void;
  id: string;
}

const UpdatePopup: React.FC<UpdatePopupProps> = ({ onClose, id }) => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<{
    username: string;
    email: string;
    isAdmin: boolean;
  } | null>(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [role, setRole] = useState("User");
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("role", role);
      formData.append("id", id);
      if (image) formData.append("image", image);

      await axios.put(`/api/auth/user`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("User updated successfully!");
      router.refresh();
      onClose();
    } catch (error) {
      toast.error("Failed to update user. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/api/auth/user/${id}`);
        const user = response.data.user;
        setUserInfo(user);
        setUsername(user.username || "");
        setEmail(user.email || "");
        setRole(user.isAdmin ? "Admin" : "User");
      } catch {
        toast.error("Failed to fetch user data.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserInfo();
  }, [id]);

  if (isLoading) return <Loading />;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <ToastContainer />
      <div className="bg-white max-w-md w-full p-6 rounded-lg shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-500 hover:text-red-700"
        >
          <FaTimes size={20} />
        </button>
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Update User Details
        </h2>
        <form onSubmit={submitHandler} className="space-y-4">
          <InputField
            Icon={FaUser}
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputField
            Icon={FaEnvelope}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            Icon={FaImage}
            type="file"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />
          <div className="flex items-center border p-2 rounded border-gray-300">
            <FaBook className="text-gray-500 mr-2" />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full outline-none text-gray-700"
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

interface InputFieldProps {
  Icon: React.ComponentType;
  type: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ Icon, ...props }) => (
  <div className="flex items-center border p-2 rounded border-gray-300">
    <Icon />
    <input className="w-full outline-none text-gray-700" {...props} />
  </div>
);

export default UpdatePopup;
