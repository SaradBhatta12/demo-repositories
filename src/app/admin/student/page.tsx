"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface COuRSE {
  _id: string;
  name: string;
  title: string;
  description: string;
  syllabus: string;
  duration: string;
  instructor: string;
  image: string;
  price: string;
  category: string;
}

const FormPage = () => {
  const [course, setCourse] = useState<COuRSE[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    faculty: "",
    email: "",
    password: "",
    courses: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const getCourses = async () => {
    const response = await axios.get("/api/course");
    setCourse(response.data.courses);
  };

  useEffect(() => {
    getCourses();
  }, [course]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("name", formData.name);
    formdata.append("age", formData.age);
    formdata.append("faculty", formData.faculty);
    formdata.append("email", formData.email);
    formdata.append("password", formData.password);

    if (image) {
      formdata.append("image", image);
    }

    try {
      const response = await axios.post("/api/submitform", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data) {
        toast.success("Form submitted successfully");
      } else {
        toast.error("Form submission failed");
      }
    } catch (error) {
      toast.error("Internal server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8">
        <form
          onSubmit={handleSubmit}
          className="bg-[#111111] p-8 rounded-lg shadow-lg border border-gray-700"
          encType="multipart/form-data"
        >
          <h2 className="text-white text-2xl font-bold text-center mb-6">
            Registration Form
          </h2>

          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-400 mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded-md border border-gray-600 bg-transparent text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="age" className="block text-gray-400 mb-2">
              Age
            </label>
            <input
              type="number"
              name="age"
              id="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full p-3 rounded-md border border-gray-600 bg-transparent text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your age"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="faculty" className="block text-gray-400 mb-2">
              Faculty
            </label>
            <input
              type="text"
              name="faculty"
              id="faculty"
              value={formData.faculty}
              onChange={handleChange}
              className="w-full p-3 rounded-md border border-gray-600 bg-transparent text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your faculty"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-400 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-md border border-gray-600 bg-transparent text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-400 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 rounded-md border border-gray-600 bg-transparent text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="courses" className="block text-gray-400 mb-2">
              Courses (comma separated course IDs)
            </label>
            <select
              name="course"
              id="course"
              className="p-3 rounded-md border border-gray-600 bg-transparent text-white focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
            >
              {course.map((c) => {
                return <option value={c._id}>{c.name}</option>;
              })}
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="image" className="block text-gray-400 mb-2">
              Profile Image
            </label>
            <input
              type="file"
              name="image"
              id="image"
              onChange={handleFileChange}
              className="w-full text-gray-300 file:bg-blue-600 file:text-white file:rounded-md hover:file:bg-blue-700 file:cursor-pointer focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {imagePreview && (
            <div className="mb-4">
              <img
                src={imagePreview}
                alt="Image Preview"
                className="w-32 h-32 object-cover rounded mx-auto"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white py-3 rounded-md shadow-lg transition duration-300 ease-in-out"
          >
            Submit
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default FormPage;
