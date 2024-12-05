"use client";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import {
  FaCalendarAlt,
  FaEnvelope,
  FaGraduationCap,
  FaLock,
  FaUser,
} from "react-icons/fa";
import { MdSubject } from "react-icons/md";

const Page = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    qualification: "",
    module: "",
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/teacher", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(response.data.message);
      setFormData({
        name: "",
        age: "",
        qualification: "",
        module: "",
        email: "",
        password: "",
      });
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast.error(error.response?.data?.message || "Submission error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black to-gray-900 text-white px-4">
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="w-full max-w-2xl bg-gray-800 p-8 rounded-lg shadow-xl"
        method="post"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-500">
          Teacher Registration
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="name"
              className="flex items-center text-sm font-medium mb-2"
            >
              <FaUser className="mr-2 text-blue-400" /> Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="age"
              className="flex items-center text-sm font-medium mb-2"
            >
              <FaCalendarAlt className="mr-2 text-blue-400" /> Age
            </label>
            <input
              type="number"
              name="age"
              id="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="qualification"
              className="flex items-center text-sm font-medium mb-2"
            >
              <FaGraduationCap className="mr-2 text-blue-400" /> Qualification
            </label>
            <input
              type="text"
              name="qualification"
              id="qualification"
              placeholder="Qualification"
              value={formData.qualification}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="module"
              className="flex items-center text-sm font-medium mb-2"
            >
              <MdSubject className="mr-2 text-blue-400" /> Module
            </label>
            <input
              type="text"
              name="module"
              id="module"
              placeholder="Module"
              value={formData.module}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="flex items-center text-sm font-medium mb-2"
            >
              <FaEnvelope className="mr-2 text-blue-400" /> Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="flex items-center text-sm font-medium mb-2"
            >
              <FaLock className="mr-2 text-blue-400" /> Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-white transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Page;
