"use client";

import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdatePopup from "../components/UpdateUserPopup";

interface UserI {
  _id: string;
  username: string;
  email: string;
  image: string;
  isAdmin: boolean;
}

const Page = () => {
  const [users, setUsers] = useState<UserI[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get("/api/auth/allusers");
        setUsers(response.data.alluser);
      } catch (error) {
        toast.error("Failed to fetch users");
      }
    };
    getUsers();
  }, []);

  const deleteHandler = async (id: string) => {
    try {
      const res = await axios.delete("/api/auth/user", {
        data: { id },
      });
      toast.success(res.data.message || "User deleted");
      setUsers(users.filter((user) => user._id !== id)); // Update state after deletion
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to delete user");
    }
  };

  const handleEdit = (id: string) => {
    setSelectedUserId(id);
    setShowPopup(true);
  };

  return (
    <div className="overflow-x-auto px-4 py-6">
      <ToastContainer />
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 shadow-lg">
          <thead>
            <tr className="border-b-2 bg-gray-800 text-white">
              <th className="px-4 py-3 text-left">Username</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Profile Pic</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Edit</th>
              <th className="px-4 py-3 text-left">Delete</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user._id} className="border-b border-gray-200">
                <td className="px-4 py-3">{user.username}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">
                  <div className="rounded-full">
                    <Image
                      src={user.image}
                      alt="User Image"
                      height={30}
                      width={30}
                      className="rounded-full"
                    />
                  </div>
                </td>
                <td className="px-4 py-3">{user.isAdmin ? "Admin" : "User"}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleEdit(user._id)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Edit
                  </button>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => deleteHandler(user._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPopup && selectedUserId && (
        <UpdatePopup id={selectedUserId} onClose={() => setShowPopup(false)} />
      )}
    </div>
  );
};

export default Page;
