"use client";

// src/app/components/server/Courses.tsx
import axios from "axios";
import { useEffect, useState } from "react";
import { FaBook } from "react-icons/fa";

interface CourseI {
  _id: string;
  name: string;
  faculty: string;
  subjects: string[];
}
// Server component to fetch and render courses
const Courses = async () => {
  const [courses, setCourses] = useState<CourseI[]>([]);
  console.log(courses);
  const getCourses = async () => {
    const response = await axios.get("/api/course");
    setCourses(response.data.courses);
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div className="flex items-center border border-gray-300 p-2 rounded">
      <FaBook className="text-gray-500 mr-2" />
      <select className="w-full outline-none text-gray-700">
        <option value="" disabled selected>
          Select a course
        </option>
        {/* Dynamically rendering courses in the dropdown */}
        {courses.map((course: CourseI) => (
          <option key={course._id} value={course.name}>
            {course.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Courses;
