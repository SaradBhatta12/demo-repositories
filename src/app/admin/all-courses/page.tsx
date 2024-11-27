"use client";
import Loading from "@/app/components/Loading";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CiEdit } from "react-icons/ci";
import { MdDeleteSweep } from "react-icons/md";
interface CourSe {
  _id: string;
  name: string;
  description: string;
  duration: string;
  instructor: string;
  image: string;
  pdf: string;
  price: string;
}

const page = () => {
  const [courses, setCourses] = useState<CourSe[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const getAllCourses = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/course");
      toast.success(res.data.message);
      setCourses(res.data.courses);
    } catch (error) {
      console.log(error);
      toast.error("Internal server error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  const deleteHandler = async (id: string) => {
    try {
      setLoading(true);
      const res = await axios.delete(`/api/course?id=${id}`);
      toast.success(res.data.message);
      getAllCourses();
    } catch (error) {
      console.log(error);
      toast.error("Internal server error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm text-gray-400">
          <thead className="bg-gray-800">
            <tr>
              <th className="p-4">Course Name</th>
              <th className="p-4">Description</th>
              <th className="p-4">Duration</th>
              <th className="p-4">Instructor</th>
              <th className="p-4">Image</th>
              <th className="p-4">PDF Link</th>
              <th className="p-4">Price</th>
              <th className="p-4">Edit</th>
              <th className="p-4">Delete</th>
            </tr>
          </thead>
          {courses.map((course) => {
            return (
              <tbody key={course._id} className="bg-gray-900">
                <tr className="border-b border-gray-700">
                  <td className="p-4">{course.name}</td>
                  <td className="p-4">{course.description}</td>
                  <td className="p-4">{course.duration}</td>
                  <td className="p-4">{course.instructor}</td>
                  <td className="p-4">
                    <img
                      src={course.image}
                      alt="Course"
                      className="w-12 h-12 object-cover"
                    />
                  </td>
                  <td className="p-4">
                    <Link
                      href={`${course.pdf}`}
                      className="text-blue-500 hover:underline h-5 w-5 "
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download PDF
                    </Link>
                  </td>
                  <td className="p-4">$99</td>
                  <td
                    className="p-4 cursor-pointer"
                    onChange={(e: React.MouseEvent<HTMLTableCellElement>) => {
                      e.preventDefault();
                    }}
                  >
                    <Link href={`/admin/course/${course._id}`}>
                      <CiEdit />
                    </Link>
                  </td>
                  <td
                    className="p-4 cursor-pointer"
                    onClick={(e: React.MouseEvent<HTMLTableCellElement>) => {
                      e.preventDefault();
                      deleteHandler(course._id);
                    }}
                  >
                    <MdDeleteSweep />
                  </td>
                </tr>
                {/* Add more rows as needed */}
              </tbody>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default page;
