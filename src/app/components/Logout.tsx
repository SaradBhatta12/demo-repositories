"use client";

import { FaSignOutAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

export default function ClientComponent() {
  const logoutHandler = async () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (!confirmed) return;

    try {
      const res = await fetch("/api/auth/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        toast.success("Successfully logged out");
        console.log(res);
        window.location.href = "/login";
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    }
  };

  return (
    <div>
      <ToastContainer position="top-right" />
      <button
        onClick={logoutHandler}
        className="w-full bg-red-600 text-white p-2 text-[10px] px-4 rounded-lg hover:bg-red-700 transition flex justify-center items-center ga-4"
      >
        <FaSignOutAlt />
        &nbsp; Logout
      </button>
    </div>
  );
}
