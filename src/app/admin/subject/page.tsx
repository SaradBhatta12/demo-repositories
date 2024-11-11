"use client";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaCalendarAlt, FaGraduationCap } from "react-icons/fa";
import { MdSubject } from "react-icons/md";

interface FormData {
  name: string;
  subjectCode: string;
  units: number;
  semester: number;
  studyMaterial: File | null;
  referenceBook: File | null;
  description: string;
  syllabus: File | null;
  assignment: string[];
}

const Page = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    subjectCode: "",
    units: 0,
    semester: 0,
    studyMaterial: null, // To hold the uploaded file
    referenceBook: null, // To hold the uploaded file
    description: "",
    syllabus: null, // To hold the uploaded file
    assignment: [""],
  });
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    const { name, value, files } = target;
    if (files && files.length > 0) {
      setFormData({
        ...formData,
        [name]: files[0], // Set the first file selected
      });
    } else if (name === "assignment") {
      setFormData({
        ...formData,
        [name]: value.split(",").map((item: string) => item.trim()), // For array fields, split by comma
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    // Append form data (including files)
    for (const key in formData) {
      const value = formData[key as keyof FormData];

      // Check if the value is not null or undefined
      if (value !== null && value !== undefined) {
        // Handle file uploads
        if (
          key === "studyMaterial" ||
          key === "referenceBook" ||
          key === "syllabus"
        ) {
          formDataToSend.append(key, value as File);
        }
        // Handle array fields
        else if (Array.isArray(value)) {
          value.forEach((item: string) => formDataToSend.append(key, item));
        }
        // Handle other fields
        else {
          formDataToSend.append(key, value as File);
        }
      }
    }

    try {
      const response = await axios.post("/api/subject/create", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(response.data.message);
      // Reset form data after successful submission
      setFormData({
        name: "",
        subjectCode: "",
        units: 0,
        semester: 0,
        studyMaterial: null,
        referenceBook: null,
        description: "",
        syllabus: null,
        assignment: [""],
      });
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast.error(error.response?.data?.message || "Submission error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black to-gray-900 text-white px-4">
      <Toaster />
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-gray-800 p-8 rounded-lg shadow-xl"
        method="post"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-500">
          Subject Registration
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label
              htmlFor="name"
              className="flex items-center text-sm font-medium mb-2"
            >
              <MdSubject className="mr-2 text-blue-400" /> Subject Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Subject Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="subjectCode"
              className="flex items-center text-sm font-medium mb-2"
            >
              <MdSubject className="mr-2 text-blue-400" /> Subject Code
            </label>
            <input
              type="text"
              name="subjectCode"
              id="subjectCode"
              placeholder="Subject Code"
              value={formData.subjectCode}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="units"
              className="flex items-center text-sm font-medium mb-2"
            >
              <FaCalendarAlt className="mr-2 text-blue-400" /> Units
            </label>
            <input
              type="number"
              name="units"
              id="units"
              placeholder="Units"
              value={formData.units}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="syllabus"
              className="flex items-center text-sm font-medium mb-2"
            >
              <FaGraduationCap className="mr-2 text-blue-400" /> Syllabus
            </label>
            <input
              type="file"
              name="syllabus"
              id="syllabus"
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="studyMaterial"
              className="flex items-center text-sm font-medium mb-2"
            >
              <FaGraduationCap className="mr-2 text-blue-400" /> Study Material
            </label>
            <input
              type="file"
              name="studyMaterial"
              id="studyMaterial"
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="referenceBook"
              className="flex items-center text-sm font-medium mb-2"
            >
              <FaGraduationCap className="mr-2 text-blue-400" /> Reference Books
            </label>
            <input
              type="file"
              name="referenceBook"
              id="referenceBook"
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="flex items-center text-sm font-medium mb-2"
            >
              <FaGraduationCap className="mr-2 text-blue-400" /> Description
            </label>
            <textarea
              name="description"
              id="description"
              placeholder="Subject Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="semester"
              className="flex items-center text-sm font-medium mb-2"
            >
              <FaCalendarAlt className="mr-2 text-blue-400" /> Semester
            </label>
            <input
              type="number"
              name="semester"
              id="semester"
              placeholder="Semester"
              value={formData.semester}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-6 py-2 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Page;
