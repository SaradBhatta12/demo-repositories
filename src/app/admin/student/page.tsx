"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  FaEnvelope,
  FaFileAlt,
  FaLock,
  FaUpload,
  FaUser,
} from "react-icons/fa";

interface Course {
  _id: string;
  name: string;
}

const FormPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    faculty: "",
    email: "",
    password: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Fetch courses from API
  useEffect(() => {
    const getCourses = async () => {
      try {
        const { data } = await axios.get("/api/course");
        setCourses(data.courses);
      } catch (error) {
        toast.error("Failed to fetch courses");
      }
    };
    getCourses();
  }, []);

  // Form Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const toggleCourseSelection = async (id: string) => {
    setSelectedCourse(id);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("name", formData.name);
    formdata.append("age", formData.age);
    formdata.append("faculty", formData.faculty);
    formdata.append("email", formData.email);
    formdata.append("password", formData.password);
    if (image) formdata.append("image", image);
    formdata.append("course", selectedCourse);
    try {
      const { data } = await axios.post("/api/admin/student", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(data.message);
      setFormData({ name: "", age: "", faculty: "", email: "", password: "" });
      setSelectedCourse("");
      setSelectedNames([]);
      setImage(null);
      setImagePreview(null);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to submit form");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
      <div className="bg-[#222] rounded-lg shadow-lg p-8 max-w-2xl w-full space-y-8">
        <h2 className="text-white text-2xl font-bold text-center">
          Registration Form
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-md">
              <FaUser className="text-gray-500" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none"
                required
              />
            </div>
            <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-md">
              <FaFileAlt className="text-gray-500" />
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Age"
                className="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-md">
              <FaEnvelope className="text-gray-500" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none"
                required
              />
            </div>
          </div>
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-md">
            <FaLock className="text-gray-500" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Select Courses</label>
            <div className="flex flex-wrap gap-2">
              {courses.map((course) => (
                <button
                  key={course._id}
                  type="button"
                  className={`p-2 rounded-md text-white transition ${
                    selectedCourse === course._id
                      ? "bg-green-600"
                      : "bg-gray-700 hover:bg-gray-800"
                  }`}
                  onClick={() => toggleCourseSelection(course._id)}
                >
                  {course.name}
                </button>
              ))}
            </div>
          </div>
          {selectedNames.length > 0 && (
            <div className="mb-4 text-white">
              <h3 className="font-semibold">Selected Courses:</h3>
              <ul className="list-disc list-inside">
                {selectedNames.map((name, index) => (
                  <li key={index}>{name}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-md">
            <FaUpload className="text-gray-500" />
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="w-full text-gray-300 focus:outline-none"
            />
          </div>
          {imagePreview && (
            <div className="mt-4">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full rounded-md shadow-md"
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full py-3 mt-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Submit
          </button>
        </form>
        <Toaster position="top-right" />
      </div>
    </div>
  );
};

export default FormPage;
