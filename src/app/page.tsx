"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaSignOutAlt, FaUserAlt } from "react-icons/fa"; // React icons for user and logout
import Loading from "./components/Loading";

interface UseR {
  username: string;
  email: string;
  // Add more fields as needed for user details
  firstName?: string;
  lastName?: string;
  profilePicture?: string;
}

const Page = () => {
  const router = useRouter();
  const [user, setUser] = useState<UseR>({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    profilePicture: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getUsersDetails = async () => {
    try {
      const res = await axios.get("/api/auth/user");

      if (!res.data.success) {
        setError("You're not authorized to access this page.");
        toast.error("You're not authorized for this route.");
        router.push("/login");
        return;
      }

      setUser(res.data.user); // Assuming response contains a 'user' object with details
    } catch (err: any) {
      setError("Failed to fetch user details");
      toast.error(
        err.response?.message || err.message || "Failed to fetch user details"
      );
      router.push("/login");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const logoutHandler = async () => {
    try {
      const res = await axios.get("/api/auth/logout");
      console.log(res);
      toast.success(res.data.message);
      router.push("/login");
    } catch (err) {
      toast.error("Failed to logout");
      setError("Failed to logout");
      console.error(err);
    }
  };

  useEffect(() => {
    getUsersDetails();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center py-6">
      <div className="absolute top-5 right-6">
        <button
          onClick={logoutHandler}
          className="flex items-center bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition-all duration-300"
        >
          <FaSignOutAlt className="mr-2" />
          Logout
        </button>
      </div>
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full sm:w-96 mt-10">
        <h1 className="text-3xl font-semibold text-center mb-4">Profile</h1>
        {error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-center">
              {user.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt="Profile Picture"
                  className="w-24 h-24 rounded-full object-cover mb-4"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-500 mb-4 flex items-center justify-center">
                  <FaUserAlt className="text-3xl text-white" />
                </div>
              )}
            </div>
            <h2 className="text-xl text-center font-medium">
              {user.firstName} {user.lastName}
            </h2>
            <h2 className="text-xl text-center">{user.username}</h2>
            <h3 className="text-lg text-center text-gray-400">{user.email}</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
