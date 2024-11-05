import Link from "next/link";
import { AiOutlineUser } from "react-icons/ai";
import { FaBook, FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";

const Page = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="p-4 w-full md:w-1/4 lg:w-1/5 bg-gray-800">
        {/* Admin Profile */}
        <div className="mb-6 p-4 bg-gray-700 rounded-lg flex flex-col items-center text-center">
          <AiOutlineUser size={50} className="text-gray-300" />
          <h2 className="text-xl font-semibold mt-2">Admin Name</h2>
          <p className="text-gray-400 text-sm">admin@example.com</p>
        </div>

        {/* Navigation Links */}
        <div className="space-y-4">
          {/* Students Section */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-300 flex items-center gap-2">
              <FaUserGraduate /> Students
            </h3>
            <Link href="/admin/all-student">
              <div className="p-2 rounded bg-gray-700 hover:bg-gray-600 cursor-pointer text-sm flex items-center gap-2">
                <FaUserGraduate /> All Students
              </div>
            </Link>
            <Link href="/admin/student">
              <div className="p-2 rounded bg-gray-700 hover:bg-gray-600 cursor-pointer text-sm flex items-center gap-2">
                <FaUserGraduate /> Add New Student
              </div>
            </Link>
          </div>

          {/* Courses Section */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-300 flex items-center gap-2">
              <FaBook /> Courses
            </h3>
            <Link href="/admin/course">
              <div className="p-2 rounded bg-gray-700 hover:bg-gray-600 cursor-pointer text-sm flex items-center gap-2">
                <FaBook /> Add New Course
              </div>
            </Link>
            <Link href="/admin/all-courses">
              <div className="p-2 rounded bg-gray-700 hover:bg-gray-600 cursor-pointer text-sm flex items-center gap-2">
                <FaBook /> All Courses
              </div>
            </Link>
          </div>

          {/* Teachers Section */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-300 flex items-center gap-2">
              <FaChalkboardTeacher /> Teachers
            </h3>
            <Link href="/admin/teacher">
              <div className="p-2 rounded bg-gray-700 hover:bg-gray-600 cursor-pointer text-sm flex items-center gap-2">
                <FaChalkboardTeacher /> Add New Teacher
              </div>
            </Link>
            <Link href="/admin/all-teachers">
              <div className="p-2 rounded bg-gray-700 hover:bg-gray-600 cursor-pointer text-sm flex items-center gap-2">
                <FaChalkboardTeacher /> All Teachers
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <p className="text-gray-400">
          Welcome to the admin panel. Use the navigation menu on the left to
          manage students, courses, and teachers.
        </p>
      </div>
    </div>
  );
};

export default Page;
