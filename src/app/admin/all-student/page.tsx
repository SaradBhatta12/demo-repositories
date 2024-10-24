"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CiEdit } from "react-icons/ci";
import { MdDeleteSweep } from "react-icons/md";

interface IStudent {
  _id: string;
  name: string;
  age: number;
  email: string;
  password: string;
  image: string;
  faculty: string;
  courses: string[];
}

const Page: React.FC = () => {
  const [students, setStudents] = useState<IStudent[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch all students
  const getAllStudents = async () => {
    try {
      const { data } = await axios.get("/api/admin/student");
      // Check if data.students is defined and is an array
      if (data && Array.isArray(data.students)) {
        setStudents(data.students);
        toast.success("Students fetched successfully");
      } else {
        toast.error("No students found");
      }
    } catch (error) {
      toast.error("Failed to fetch students");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllStudents();
  }, []);

  // Delete student
  const deleteHandler = async (id: string) => {
    try {
      await axios.delete(`/api/admin/student?id=${id}`);
      setStudents((prevStudents) =>
        prevStudents.filter((student) => student._id !== id)
      );
      toast.success("Student deleted successfully");
    } catch (error) {
      toast.error("Failed to delete student");
    }
  };

  if (isLoading) {
    return <div className="text-white text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm text-gray-400">
          <thead className="bg-gray-800">
            <tr>
              <th className="p-4">Student Name</th>
              <th className="p-4">Age</th>
              <th className="p-4">Email</th>
              <th className="p-4">Password</th>
              <th className="p-4">Image</th>
              <th className="p-4">Courses</th>
              <th className="p-4">Faculty</th>
              <th className="p-4">Edit</th>
              <th className="p-4">Delete</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student) => (
                <tr
                  key={student._id}
                  className="bg-gray-900 border-b border-gray-700"
                >
                  <td className="p-4">{student.name}</td>
                  <td className="p-4">{student.age}</td>
                  <td className="p-4">{student.email}</td>
                  <td className="p-4">{student.password}</td>
                  <td className="p-4">
                    <img
                      src={student.image}
                      alt={student.name}
                      className="w-12 h-12 object-cover rounded-full"
                    />
                  </td>
                  <td className="p-4">
                    {student.courses.map((course, index) => (
                      <span key={index} className="block text-white">
                        {course}
                      </span>
                    ))}
                  </td>
                  <td className="p-4">{student.faculty}</td>
                  <td className="p-4 cursor-pointer">
                    <Link href={`/admin/student/edit/${student._id}`}>
                      <CiEdit className="text-blue-500 hover:text-blue-700" />
                    </Link>
                  </td>
                  <td
                    className="p-4 cursor-pointer"
                    onClick={() => deleteHandler(student._id)}
                  >
                    <MdDeleteSweep className="text-red-500 hover:text-red-700" />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="text-center text-gray-400 p-4">
                  No students available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
