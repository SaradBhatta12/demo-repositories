"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface UseR {
  username: string;
  email: string;
}

const Page = () => {
  const router = useRouter();
  const [user, setUser] = useState<UseR>({ username: "", email: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getUsersDetails = async () => {
    try {
      const res = await axios.get("/api/auth/user");
      setUser(res.data);
    } catch (err) {
      setError("Failed to fetch user details");
      console.error(err);
    }
  };
  const logoutHandler = async () => {
    try {
      const res = await axios.get("/api/auth/logout");
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
    return <div>Loading............</div>;
  }

  return (
    <div>
      <div className="logout absolute top-5 right-6">
        <button onClick={logoutHandler}>Logout</button>
      </div>
      <h1>Profile</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        <>
          <h2>{user.username}</h2>
          <h2>{user.email}</h2>
        </>
      )}
    </div>
  );
};

export default Page;
