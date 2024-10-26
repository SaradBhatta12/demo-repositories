"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const page = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/student", {
        email,
        password,
      });
      toast.success(response.data.message);
      router.push("/student/profile");
    } catch (error) {
      toast.error("Invalid Credientials");
      console.log(error);
      router.push("/student/login");
    }
  };
  return (
    <div className="flex justify-center items-center h-screen max-w-full">
      <div className="student-login absolute top-6 right-6">
        <Link href={"/login"}>User Login</Link>
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
            Student Login
          </button>
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default page;
