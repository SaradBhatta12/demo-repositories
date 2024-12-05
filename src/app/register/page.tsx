"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !email || !password) {
      toast.error("All fields are required!");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("/api/auth/register", {
        username,
        email,
        password,
      });
      setLoading(false);
      toast.success(response.data.message);
      router.push("/login");
    } catch (error: any) {
      setLoading(false);
      console.error(error);
      toast.error(error?.response?.data?.error || "Internal Server Error");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <ToastContainer />
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center text-gray-200 mb-6">
          Register
        </h1>
        <form onSubmit={submitHandler}>
          <div className="flex flex-col mb-4">
            <label htmlFor="username" className="text-gray-300 mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              className="p-3 bg-gray-700 text-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="email" className="text-gray-300 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="p-3 bg-gray-700 text-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col mb-6">
            <label htmlFor="password" className="text-gray-300 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="p-3 bg-gray-700 text-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 rounded-lg text-lg hover:bg-pink-600 transition"
            disabled={loading}
          >
            {loading ? "Submiting...." : "Submit"}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Already have an account?{" "}
            <span
              className="text-pink-400 hover:underline cursor-pointer"
              onClick={() => router.push("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
