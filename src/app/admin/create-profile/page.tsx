"use client";
import { useState } from "react";

interface Option {
  id: string;
  name: string;
}

interface STUDENT {
  _id: string;
  email: string;
}

interface COURSE {
  _id: string;
  name: string;
}

const page = () => {
  const [formData, setFormData] = useState({
    student: "",
    course: "",
    subject: "",
  });

  // Dummy data for students, courses, and subjects
  const students: Option[] = [
    { id: "1", name: "John Doe" },
    { id: "2", name: "Jane Smith" },
    { id: "3", name: "Emily Johnson" },
  ];

  const courses: Option[] = [
    { id: "1", name: "Computer Science" },
    { id: "2", name: "Mechanical Engineering" },
    { id: "3", name: "Civil Engineering" },
  ];

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    alert("Profile created successfully!");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 text-white shadow-md rounded-lg p-8 max-w-lg w-full space-y-6"
      >
        <h2 className="text-3xl font-semibold text-center mb-6">
          Create Profile
        </h2>

        {/* Student Select */}
        <div className="students">
          <label htmlFor="student" className="block text-xl font-medium">
            Student
          </label>
          <select
            name="student"
            id="student"
            value={formData.student}
            onChange={handleChange}
            className="mt-2 w-full p-4 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Student</option>
            {students.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        {/* Course Select */}
        <div className="course">
          <label htmlFor="course" className="block text-xl font-medium">
            Course
          </label>
          <select
            name="course"
            id="course"
            value={formData.course}
            onChange={handleChange}
            className="mt-2 w-full p-4 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Course</option>
            {courses.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <button className="p-3 bg-blue-800 text-center w-full rounded ">
          Create Profile
        </button>
      </form>
    </div>
  );
};

export default page;
