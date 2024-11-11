"use client";

import Image from "next/image";
import { FC } from "react";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { BsPersonFill } from "react-icons/bs";

interface Subject {
  code: string;
  name: string;
}

interface ProfileProps {
  name: string;
  semester: string;
  email: string;
  phone: string;
  profileImage: string;
  subjects: Subject[];
}

const ProfilePage: FC<ProfileProps> = ({
  name,
  semester,
  email,
  phone,
  profileImage,
  subjects,
}) => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-6">
      <div className="w-full max-w-lg bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        {/* Profile Section */}
        <div className="flex flex-col items-center p-6">
          <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-gray-700 shadow-md">
            <Image
              src={profileImage}
              alt="Profile Picture"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <h2 className="mt-4 text-3xl font-bold flex items-center space-x-2">
            <BsPersonFill className="text-yellow-500" />
            <span>{name}</span>
          </h2>
          <p className="text-gray-400 text-lg mt-1">Semester: {semester}</p>
          <div className="mt-4 space-y-1 text-gray-300">
            <p className="flex items-center space-x-2">
              <AiOutlineMail className="text-yellow-400" />
              <span>{email}</span>
            </p>
            <p className="flex items-center space-x-2">
              <AiOutlinePhone className="text-yellow-400" />
              <span>{phone}</span>
            </p>
          </div>
        </div>

        {/* Subjects Section */}
        <div className="w-full p-6 bg-gray-700">
          <h3 className="text-xl font-semibold mb-4 text-center">Subjects</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {subjects.map((subject) => (
              <div
                key={subject.code}
                className="bg-gray-800 p-4 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-200"
              >
                <h4 className="text-lg font-semibold text-yellow-300">
                  {subject.name}
                </h4>
                <p className="text-gray-400 mt-1">Code: {subject.code}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

// Sample data for testing
ProfilePage.defaultProps = {
  name: "Sarad Bhatt",
  semester: "6th Semester",
  email: "sarad.dev.np@gmail.com",
  phone: "9840046844",
  profileImage: "https://via.placeholder.com/150", // Replace with actual image URL
  subjects: [
    { code: "CS101", name: "Computer Science Fundamentals" },
    { code: "CS102", name: "Data Structures" },
    { code: "CS103", name: "Algorithms" },
    { code: "CS104", name: "Database Management" },
  ],
};
