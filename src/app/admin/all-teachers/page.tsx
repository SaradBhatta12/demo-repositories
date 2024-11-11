"use client";
import axios from "axios";
import { useEffect, useState } from "react";
interface TEACHER {
  _id: string;
  name: string;
  age: number;
  qualification: string;
  module: string;
  email: string;
  password: string;
}
const page = () => {
  const [teachers, setTeachers] = useState<TEACHER[]>([]);

  const getTeacher = async () => {
    const response = await axios.get("/api/teacher");
    console.log(response.data.teachers);
    setTeachers(response.data.teachers);
  };

  useEffect(() => {
    getTeacher();
  }, []);

  return (
    <div className="overflow-x-auto px-4 py-6">
      <div className="overflow-x-auto">
        <table className="min-w-full  border border-gray-200 shadow-lg">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="px-4 py-3 text-left">Id</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Age</th>
              <th className="px-4 py-3 text-left">Qualification</th>
              <th className="px-4 py-3 text-left">Module</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Password</th>
            </tr>
          </thead>
          {teachers.map((teacher: TEACHER) => (
            <tbody key={teacher._id}>
              <tr className="border-b border-gray-200">
                <td className="px-4 py-3">{teacher._id}</td>
                <td className="px-4 py-3">{teacher.name}</td>
                <td className="px-4 py-3">{teacher.age}</td>
                <td className="px-4 py-3">{teacher.qualification}</td>
                <td className="px-4 py-3">{teacher.module}</td>
                <td className="px-4 py-3">{teacher.email}</td>
                <td className="px-4 py-3">{teacher.password}</td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
        Export as PDF
      </button>
    </div>
  );
};

export default page;
