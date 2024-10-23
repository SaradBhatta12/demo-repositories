"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/register", {
        username,
        email,
        password,
      });
      router.push("/login");
      toast.success(response.data.message);
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.error || "Internal Server Error");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen max-w-full">
      <form action="POST" onSubmit={submitHandler}>
        <div className="flex flex-col ">
          <label htmlFor="name" className="text-xl p-1">
            Username
          </label>
          <input
            className="p-2 text-yellow-100 rounded font-bold bg-transparent border border-pink-200"
            type="text"
            name="name"
            id="name"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex flex-col ">
          <label htmlFor="email" className="text-xl p-1">
            Email
          </label>
          <input
            className="p-2 text-yellow-100 rounded font-bold bg-transparent border border-pink-200"
            type="email"
            name="email"
            id="email"
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
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button
            type="submit"
            className="text-xl border p-2 rounded mt-4 hover:bg-gray-900"
          >
            Submit
          </button>
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default page;
