"use client";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { BsPersonFill } from "react-icons/bs";

// TypeScript interfaces for better type safety
interface Subject {
  code: string;
  name: string;
}

interface Student {
  _id: string;
  name: string;
  courses: string[];
  createdAt: string;
  email: string;
  faculty: string;
  image: string;
  phone: string;
  password: string;
  subjects: Subject[];
}

const ProfilePage: FC = () => {
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const router = useRouter();

  // Fetching student data
  useEffect(() => {
    const getStudent = async () => {
      try {
        const response = await axios.get("/api/student");
        setStudent(response.data.user); // Update student data
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        setError("Error fetching student data"); // Handle error
        setLoading(false); // Set loading to false
        console.error(error);
      }
    };
    getStudent();
  }, []);

  // Logout handler
  const LogoutHandler = async () => {
    try {
      const response = await axios.get("/api/student/logout");
      router.push("/student/login");
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Unable to log out");
      console.error("Error logging out:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Display loading state
  }

  if (error) {
    return <div>{error}</div>; // Display error message
  }

  // Destructure the fetched student data
  const { name, email, faculty, image, phone, subjects } = student!;

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-6">
      {/* Full-screen container */}
      <div className="relative w-full h-full max-w-5xl bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        {/* Logout Button */}
        <div className="absolute right-6 top-5">
          <button
            onClick={LogoutHandler}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Log out
          </button>
        </div>

        {/* Profile Section */}
        <div className="flex flex-col items-center p-8">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-700 shadow-md">
            <Image
              src={image}
              alt="Profile Picture"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <h2 className="mt-6 text-4xl font-bold flex items-center space-x-2 text-yellow-400">
            <BsPersonFill />
            <span>{name}</span>
          </h2>
          <p className="text-gray-400 text-lg mt-2">Faculty: {faculty}</p>
          <div className="mt-4 space-y-2 text-gray-300">
            <p className="flex items-center space-x-2">
              <AiOutlineMail className="text-yellow-400" />
              <span>{email}</span>
            </p>
            {phone && (
              <p className="flex items-center space-x-2">
                <AiOutlinePhone className="text-yellow-400" />
                <span>{phone}</span>
              </p>
            )}
          </div>
        </div>

        {/* Courses and Subjects Section */}
        <div className="w-full p-8 bg-gray-700">
          <h3 className="text-2xl font-semibold mb-6 text-center text-yellow-300">Subjects</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {subjects?.map((subject) => (
              <div
                key={subject.code}
                className="bg-gray-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-200"
              >
                <h4 className="text-lg font-semibold text-yellow-300">{subject.name}</h4>
                <p className="text-gray-400 mt-2">Code: {subject.code}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
