"use client";
import axios from "axios";
import { useEffect, useState } from "react";

const ScheduleForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    teacher: [],
    course: [],
  });

  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);

  // Fetch courses and teachers from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseResponse = await axios.get("/api/courses");
        const teacherResponse = await axios.get("/api/teachers");

        if (courseResponse.data.success && teacherResponse.data.success) {
          setCourses(courseResponse.data.courses);
          setTeachers(teacherResponse.data.teachers);
        } else {
          alert("Failed to load courses or teachers");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMultiSelectChange = (e, field) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setFormData({ ...formData, [field]: selectedOptions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Schedule saved successfully!");
      } else {
        alert("Failed to save the schedule.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred.");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg space-y-6"
      >
        <h2 className="text-2xl font-bold text-white text-center">
          Schedule Form
        </h2>

        {[
          { name: "title", type: "text", placeholder: "Title" },
          { name: "description", type: "text", placeholder: "Description" },
          { name: "date", type: "date", placeholder: "Date" },
          { name: "location", type: "text", placeholder: "Location" },
          { name: "startDate", type: "date", placeholder: "Start Date" },
          { name: "endDate", type: "date", placeholder: "End Date" },
          { name: "startTime", type: "time", placeholder: "Start Time" },
          { name: "endTime", type: "time", placeholder: "End Time" },
        ].map((field, index) => (
          <div key={index} className="text-gray-300">
            <label className="block mb-1 capitalize" htmlFor={field.name}>
              {field.placeholder}
            </label>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 bg-gray-900 text-white rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        ))}

        {/* Teacher Multi-Select */}
        <div className="text-gray-300">
          <label className="block mb-1" htmlFor="teacher">
            Teachers
          </label>
          <select
            name="teacher"
            multiple
            value={formData.teacher}
            onChange={(e) => handleMultiSelectChange(e, "teacher")}
            required
            className="w-full px-4 py-2 bg-gray-900 text-white rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            {teachers.map((teacher) => (
              <option key={teacher._id} value={teacher._id}>
                {teacher.name}
              </option>
            ))}
          </select>
        </div>

        {/* Course Multi-Select */}
        <div className="text-gray-300">
          <label className="block mb-1" htmlFor="course">
            Courses
          </label>
          <select
            name="course"
            multiple
            value={formData.course}
            onChange={(e) => handleMultiSelectChange(e, "course")}
            required
            className="w-full px-4 py-2 bg-gray-900 text-white rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg font-semibold transition duration-200"
        >
          Save Schedule
        </button>
      </form>
    </div>
  );
};

export default ScheduleForm;
