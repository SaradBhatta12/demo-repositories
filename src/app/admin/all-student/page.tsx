"use client";
import Loading from "@/app/components/Loading";
import UpdatePupup from "@/app/components/UpdatePupup";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

import { CiEdit } from "react-icons/ci";
import { MdDeleteSweep } from "react-icons/md";

interface courseI {
  _id: string;
  name: string;
}
interface IStudent {
  _id: string;
  name: string;
  age: number;
  email: string;
  password: string;
  image: string;
  faculty: string;
  Course: courseI;
}

const Page: React.FC = () => {
  const [students, setStudents] = useState<IStudent[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUpdatePopupOpen, setIsUpdatePopupOpen] = useState<boolean>(false);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(
    null
  );

  // Fetch all students
  const getAllStudents = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get("/api/admin/student");
      console.log(data);
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
      setIsLoading(true);
      await axios.delete(`/api/admin/student?id=${id}`);
      setStudents((prevStudents) =>
        prevStudents.filter((student) => student._id !== id)
      );
      toast.success("Student deleted successfully");
    } catch (error) {
      toast.error("Failed to delete student");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto p-4 relative">
      <ToastContainer />
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
              <th className="p-4">Edit</th>
              <th className="p-4">Delete</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student) => (
                <tr
                  key={student._id} // Adding `key` here resolves the key error
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
                  <td className="p-4">{student.Course.name}</td>
                  <td className="p-4 cursor-pointer">
                    <CiEdit
                      className="text-blue-500 hover:text-blue-700 text-4xl hover:bg-slate-400 border border-y-white rounded-full p-2"
                      onClick={() => {
                        setIsUpdatePopupOpen(true);
                        setSelectedStudentId(student._id);
                      }}
                    />
                  </td>
                  <td
                    className="p-4 cursor-pointer"
                    onClick={() => deleteHandler(student._id)}
                  >
                    <MdDeleteSweep className="text-blue-500 hover:text-blue-700 text-4xl hover:bg-slate-400 border border-y-white rounded-full p-2" />
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
      {/* Conditionally render the UpdatePupup component outside the map */}
      {isUpdatePopupOpen && selectedStudentId && (
        <UpdatePupup
          onClose={() => setIsUpdatePopupOpen(false)}
          id={selectedStudentId}
        />
      )}
    </div>
  );
};

export default Page;
