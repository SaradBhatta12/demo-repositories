import connectDB from "@/DB/connectDB";
import Course from "@/model/course.models";
import Student from "@/model/student.models";
import Teacher from "@/model/teacher.models";
import User from "@/model/user.models";
import getUser from "@/utils/getUserFromCookie";
import Link from "next/link";

import Subject from "@/model/subject.models";
import {
  FaBook,
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaUsers,
} from "react-icons/fa";
import { FiBell } from "react-icons/fi";
import ClientComponent from "../components/Logout";

await connectDB();
const allusers = await User.find().countDocuments();
const allStudents = await Student.find().countDocuments();
const allCourses = await Course.find().countDocuments();
const teachers = await Teacher.find().countDocuments();
const user = await getUser();
const subjects = await Subject.find().countDocuments();
const isAdmin = await User.findById(user);

const Home: React.FC = () => {
  if (!isAdmin?.isAdmin) {
    return <div className="not">Not Authorized</div>;
  }

  return (
    <>
      {/* SEO Meta Tags */}
      <div>
        <title>Admin Dashboard</title>
        <meta
          name="description"
          content="Admin dashboard for managing users, courses, teachers, and schedules."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </div>

      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-900 text-white">
        {/* Sidebar */}
        {/* sidebar */}

        <aside className="w-full lg:w-64 bg-gray-800 p-6">
          <div className="flex items-center space-x-4 mb-6">
            <img
              src={isAdmin.image || "/default-avatar.png"}
              alt="User Profile"
              className="w-12 h-12 rounded-full border-2 border-gray-700"
            />
            <div>
              <p className="font-semibold text-lg">Sarad Bhatt</p>
              <span className="text-green-500">Online</span>
            </div>
          </div>
          <nav>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/admin/subject"
                  className="block py-2 px-4 rounded-lg hover:bg-gray-700 transition"
                >
                  Manage Subjects
                </Link>
              </li>

              <li>
                <Link
                  href="/admin/course"
                  className="block py-2 px-4 rounded-lg hover:bg-gray-700 transition"
                >
                  Manage Courses
                </Link>
              </li>

              <li>
                <Link
                  href="/admin/student"
                  className="block py-2 px-4 rounded-lg hover:bg-gray-700 transition"
                >
                  Manage Students
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/teacher"
                  className="block py-2 px-4 rounded-lg hover:bg-gray-700 transition"
                >
                  Manage Teachers
                </Link>
              </li>

              <li>
                <Link
                  href="/admin/schedule"
                  className="block py-2 px-4 rounded-lg hover:bg-gray-700 transition"
                >
                  Manage Schedule
                </Link>
              </li>
            </ul>
          </nav>
          {/* we need to import component */}
          <ClientComponent />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Header */}
          <header className="flex justify-between items-center p-4 bg-gray-700 shadow-md rounded-lg mb-6">
            {/* bar */}
            {/* <MenuBar /> */}
            <button className="text-xl hover:text-gray-400 transition">
              <FiBell />
            </button>
          </header>

          {/* Dashboard Metrics */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* All Users */}
            <Link href="/users">
              <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-6 rounded-lg shadow-lg hover:scale-105 transform transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase">All Users</p>
                    <p className="text-3xl font-bold">{allusers}</p>
                  </div>
                  <FaUsers className="text-white text-4xl" />
                </div>
              </div>
            </Link>

            {/* All Students */}
            <Link href="/admin/all-student">
              <div className="bg-gradient-to-r from-green-500 to-green-700 p-6 rounded-lg shadow-lg hover:scale-105 transform transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase">All Students</p>
                    <p className="text-3xl font-bold">{allStudents}</p>
                  </div>
                  <FaUserGraduate className="text-white text-4xl" />
                </div>
              </div>
            </Link>

            {/* All Courses */}
            <Link href="/admin/all-courses">
              <div className="bg-gradient-to-r from-yellow-500 to-yellow-700 p-6 rounded-lg shadow-lg hover:scale-105 transform transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase">All Courses</p>
                    <p className="text-3xl font-bold">{allCourses}</p>
                  </div>
                  <FaBook className="text-white text-4xl" />
                </div>
              </div>
            </Link>

            {/* All Teachers */}
            <Link href="/admin/all-teachers">
              <div className="bg-gradient-to-r from-red-500 to-red-700 p-6 rounded-lg shadow-lg hover:scale-105 transform transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase">All Teachers</p>
                    <p className="text-3xl font-bold">{teachers}</p>
                  </div>
                  <FaChalkboardTeacher className="text-white text-4xl" />
                </div>
              </div>
            </Link>

            <Link href="/admin/all-subjects">
              <div className="bg-gradient-to-r from-red-500 to-red-700 p-6 rounded-lg shadow-lg hover:scale-105 transform transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase">All Subjects</p>
                    <p className="text-3xl font-bold">{subjects}</p>
                  </div>
                  <FaChalkboardTeacher className="text-white text-4xl" />
                </div>
              </div>
            </Link>

            {/* Schedule Management */}
            <Link href="/admin/schedule">
              <div className="bg-gradient-to-r from-purple-500 to-purple-700 p-6 rounded-lg shadow-lg hover:scale-105 transform transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase">Manage Schedule</p>
                    <p className="text-3xl font-bold">Create/View</p>
                  </div>
                  <FaCalendarAlt className="text-white text-4xl" />
                </div>
              </div>
            </Link>
          </section>
        </main>
      </div>
    </>
  );
};

export default Home;
