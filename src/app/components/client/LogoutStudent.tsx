"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import toast from "react-hot-toast";
const LogoutStudent = () => {
  const router = useRouter();
  const LogoutHandler = useCallback(async () => {
    try {
      const response = await axios.get("/api/student/logout");
      router.push("/student/login");
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Unable to log out");
      console.error("Error logging out:", error);
    }
  }, [router]);

  return (
    <button
      onClick={LogoutHandler}
      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
    >
      Log out
    </button>
  );
};

export default LogoutStudent;
