"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill out both fields.");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("/api/auth/login", { email, password });
      toast.success(response.data.message);
      setLoading(false);
      router.push("/deshboard");
    } catch (error: any) {
      setLoading(false);
      toast.error(error?.response?.data?.message || "Internal Server Error");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <ToastContainer />
      <div className="w-full max-w-md p-6 rounded-lg bg-gray-800 shadow-md">
        <div className="mb-4 flex justify-end">
          <Link
            href="/student/login"
            className="text-sm text-pink-400 hover:underline"
          >
            Student Login
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
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
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
    </div>
  );
};

export default LoginPage;
