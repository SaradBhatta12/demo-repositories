"use client";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { BsPersonFill } from "react-icons/bs";

interface Subject {
  name: string;
  code: string;
  subjectCode: string;
  units: number;
  semester: number;
  description: string;
  referenceBook: string[];
  studyMaterial: string[];
  syllabus: string;
  _id: string;
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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    const getStudent = async () => {
      try {
        const response = await axios.get("/api/student");
        setStudent(response.data.user);
        setLoading(false);
      } catch (error) {
        setError("Error fetching student data");
        setLoading(false);
        console.error(error);
      }
    };
    getStudent();
  }, []);

  // Logout handler wrapped in useCallback to avoid re-creation on each render
  const LogoutHandler = useCallback(async () => {
    try {
      const response = await axios.get("/api/student/logout");
      router.push("/student/login");
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Unable to log out");
      console.error("Error logging out:", error);
    }
  }, [router]);

  const studentData = useMemo(() => {
    if (!student) return null;
    const { name, email, faculty, image, phone, subjects } = student;
    return { name, email, faculty, image, phone, subjects };
  }, [student]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-6">
      <div className="relative w-full h-full max-w-5xl bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        <div className="absolute right-6 top-5">
          <button
            onClick={LogoutHandler}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Log out
          </button>
        </div>

        {studentData && (
          <div className="flex flex-col items-center p-8">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-700 shadow-md">
              <Image
                src={studentData.image}
                alt="Profile Picture"
                fill
                style={{ objectFit: "cover" }}
                priority={true}
              />
            </div>
            <h2 className="mt-6 text-4xl font-bold flex items-center space-x-2 text-yellow-400">
              <BsPersonFill />
              <span>{studentData.name}</span>
            </h2>
            <p className="text-gray-400 text-lg mt-2">
              Faculty: {studentData.faculty}
            </p>
            <div className="mt-4 space-y-2 text-gray-300">
              <p className="flex items-center space-x-2">
                <AiOutlineMail className="text-yellow-400" />
                <span>{studentData.email}</span>
              </p>
              {studentData.phone && (
                <p className="flex items-center space-x-2">
                  <AiOutlinePhone className="text-yellow-400" />
                  <span>{studentData.phone}</span>
                </p>
              )}
            </div>
          </div>
        )}

        <div className="w-full p-8 bg-gray-700">
          <h3 className="text-2xl font-semibold mb-6 text-center text-yellow-300">
            Subjects
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {studentData?.subjects?.map((subject) => (
              <div
                key={subject.code}
                className="bg-gray-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-200"
              >
                <h4 className="text-lg font-semibold text-yellow-300">
                  {subject.name}
                </h4>
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
