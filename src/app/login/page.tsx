"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // Basic email validation function
  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Input validation
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
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });
      toast.success(response.data.message);
      setLoading(false);
      router.push("/");
    } catch (error: any) {
      setLoading(false);
      console.log(error);
      toast.error(error?.response?.data?.message || "Internal Server Error");
    }
  };

  if (loading) return <div className="loading">Loading........</div>;

  return (
    <div className="flex justify-center flex-col items-center h-screen max-w-full">
      <div className="student-login absolute top-6 right-6">
        <Link href={"/student/login"}>Student Login</Link>
      </div>
      <form action="POST" onSubmit={submitHandler}>
        <div className="flex flex-col ">
          <label htmlFor="email" className="text-xl p-1">
            Email
          </label>
          <input
            className="p-2 text-yellow-100 rounded font-bold bg-transparent border border-pink-200"
            type="email"
            name="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col ">
          <label htmlFor="password" className="text-xl p-1">
            Password
          </label>
          <input
            className="p-2 text-yellow-100 rounded font-bold bg-transparent border border-pink-200"
            type="password"
            name="password"
            required
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button
            type="submit"
            className="text-xl border p-2 rounded mt-4 hover:bg-gray-900"
          >
            Login
          </button>
        </div>
      </form>
      <div className="redirect-register flex mt-5  gap-1">
        Don't have account
        <Link href={"/register"} className=" underline">
          register here.
        </Link>
      </div>
    </div>
  );
};

export default page;
