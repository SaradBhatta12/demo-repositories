"use client";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import {
  FaBook,
  FaEnvelope,
  FaImage,
  FaLock,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import Loading from "./Loading";

interface UpdatePopupProps {
  onClose: () => void;
  id: string;
}

interface CourseI {
  _id: string;
  name: string;
}

interface StudentI {
  _id: string;
  name: string;
  age: number;
  email: string;
  password: string;
  image: string;
  Course: string;
}

const UpdatePopup: React.FC<UpdatePopupProps> = ({ onClose, id }) => {
  const [student, setStudent] = useState<StudentI | null>(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState<number | undefined>(undefined);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState<File | undefined>();
  const [course, setCourse] = useState("");
  const [courses, setCourses] = useState<CourseI[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getCourses = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/course");
      setCourses(response.data.courses);
    } catch (error) {
      console.error("Failed to fetch courses", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStudentDetails = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/api/admin/student/${id}`);
      const fetchedStudent = response.data.StudentDetails;
      setStudent(fetchedStudent);

      // Populate form with fetched student data
      setName(fetchedStudent?.name || "");
      setAge(fetchedStudent?.age);
      setEmail(fetchedStudent?.email || "");
      setPassword(fetchedStudent?.password || "");
      setCourse(fetchedStudent?.Course || "");
    } catch (error) {
      console.error("Failed to fetch student details", error);
    } finally {
      setIsLoading(false);
    }
  };

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      if (age !== undefined) formData.append("age", age.toString());
      formData.append("email", email);
      formData.append("password", password);
      if (image) formData.append("image", image);
      formData.append("Course", course);

      await axios.put(`/api/admin/student/${id}`, formData);
      alert("Student updated successfully!");
      onClose();
    } catch (error) {
      console.error("Failed to update student", error);
    }
  };

  useEffect(() => {
    getCourses();
    getStudentDetails();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="popup fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-500 hover:text-red-700"
        >
          <FaTimes size={20} />
        </button>
        <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">
          Update Student Details
        </h2>
        <form className="space-y-4" onSubmit={submitHandler}>
          <div className="flex items-center border border-gray-300 p-2 rounded">
            <FaUser className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Name"
              className="w-full outline-none text-gray-700"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex items-center border border-gray-300 p-2 rounded">
            <input
              type="number"
              placeholder="Age"
              className="w-full outline-none text-gray-700"
              value={age ?? ""}
              onChange={(e) => setAge(e.target.valueAsNumber)}
            />
          </div>
          <div className="flex items-center border border-gray-300 p-2 rounded">
            <FaEnvelope className="text-gray-500 mr-2" />
            <input
              type="email"
              placeholder="Email"
              className="w-full outline-none text-gray-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex items-center border border-gray-300 p-2 rounded">
            <FaLock className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Password"
              className="w-full outline-none text-gray-700"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center border border-gray-300 p-2 rounded">
            <FaImage className="text-gray-500 mr-2" />
            <input
              type="file"
              onChange={(e) => setImage(e.target.files?.[0])}
              className="w-full outline-none text-gray-700"
            />
          </div>
          <div className="flex items-center border border-gray-300 p-2 rounded">
            <FaBook className="text-gray-500 mr-2" />
            <select
              className="w-full outline-none text-gray-700"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            >
              <option value="" disabled>
                Select a course
              </option>
              {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePopup;
