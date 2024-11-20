"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";

const StudentLoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post("/api/student", { email, password });
      toast.success(response.data.message);
      setLoading(false);
      router.push("/student/profile");
    } catch (error) {
      setLoading(false);
      toast.error("Invalid Credentials");
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-blue-500" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="w-full max-w-md p-6 rounded-lg bg-gray-800 shadow-md">
        <div className="mb-4 flex justify-end">
          <Link href="/login" className="text-sm text-pink-400 hover:underline">
            User Login
          </Link>
        </div>
        <form onSubmit={submitHandler}>
          <div className="flex flex-col mb-4">
            <label htmlFor="email" className="text-gray-300 mb-2">
              Email
            </label>
            <input
              className="p-3 bg-gray-700 text-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
              type="email"
              name="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-6">
            <label htmlFor="password" className="text-gray-300 mb-2">
              Password
            </label>
            <input
              className="p-3 bg-gray-700 text-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
              type="password"
              name="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 rounded-lg text-lg hover:bg-pink-600 transition"
          >
            Student Login
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Don’t have an account?{" "}
            <Link href="/register" className="text-pink-400 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default StudentLoginPage;
