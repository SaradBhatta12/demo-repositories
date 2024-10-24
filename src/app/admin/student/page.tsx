"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface Course {
  _id: string;
  name: string;
  title: string;
  description: string;
  syllabus: string;
  duration: string;
  instructor: string;
  rating: number;
  price: number;
  image: string;
  category: string;
  user: string;
}

const FormPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
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
  const getCourses = async () => {
    try {
      const { data } = await axios.get("/api/course");
      setCourses(data.courses);
    } catch (error) {
      toast.error("Failed to fetch courses");
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file change for image
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Toggle course selection
  const toggleCourseSelection = (course: Course) => {
    if (selectedCourses.includes(course)) {
      setSelectedCourses((prevSelected) =>
        prevSelected.filter((c) => c._id !== course._id)
      );
    } else {
      setSelectedCourses((prevSelected) => [...prevSelected, course]);
    }
  };

  // Submit form data
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("All fields are required");
      return;
    }

    const formdata = new FormData();
    formdata.append("name", formData.name);
    formdata.append("age", formData.age);
    formdata.append("faculty", formData.faculty);
    formdata.append("email", formData.email);
    formdata.append("password", formData.password);
    if (image) formdata.append("image", image);

    // Attach selected courses as JSON
    formdata.append("courses", selectedCourses);

    try {
      const { data } = await axios.post("/api/admin/student", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(data.message);
      setFormData({
        name: "",
        age: "",
        faculty: "",
        email: "",
        password: "",
      });
      setSelectedCourses([]);
      setImage(null);
      setImagePreview(null);
    } catch (error) {
      toast.error("Failed to submit form");
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

          {/* Input Fields */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-400 mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
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
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 rounded-md border border-gray-600 bg-transparent text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Course Selection */}
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Select Courses</label>
            <div className="flex flex-wrap gap-2">
              {courses.map((course) => (
                <button
                  key={course._id}
                  type="button"
                  className={`border p-2 rounded text-white ${
                    selectedCourses.includes(course)
                      ? "bg-green-600"
                      : "bg-black hover:bg-gray-900"
                  }`}
                  onClick={() => toggleCourseSelection(course)}
                >
                  {course.name}
                </button>
              ))}
            </div>
          </div>

          {/* Selected Courses */}
          {selectedCourses.length > 0 && (
            <div className="mb-4 text-white">
              <h3>Selected Courses:</h3>
              <ul>
                {selectedCourses.map((course) => (
                  <li key={course._id}>{course.name}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Image Upload */}
          <div className="mb-6">
            <label htmlFor="image" className="block text-gray-400 mb-2">
              Profile Image
            </label>
            <input
              type="file"
              name="image"
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white py-3 rounded-md shadow-lg transition duration-300 ease-in-out"
          >
            Submit
          </button>
        </form>
        <Toaster />
      </div>
    </div>
  );
};

export default FormPage;