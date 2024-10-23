"use client";

import axios from "axios";
import { useEffect, useState } from "react";

interface UseR {
  username: string;
  email: string;
}

const Page = () => {
  const [user, setUser] = useState<UseR>({ username: "", email: "" });
  const [error, setError] = useState<string | null>(null);

  const getUsersDetails = async () => {
    try {
      const res = await axios.get("/api/auth/user");
      setUser(res.data);
    } catch (err) {
      setError("Failed to fetch user details");
      console.error(err);
    }
  };

  useEffect(() => {
    getUsersDetails();
  }, []);

  return (
    <div>
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
