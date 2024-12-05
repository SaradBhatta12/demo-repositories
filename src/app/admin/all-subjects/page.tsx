"use client";

import Loading from "@/app/components/Loading";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdDeleteSweep, MdEdit } from "react-icons/md";

interface SUBJECT {
  _id: string;
  name: string;
  subjectCode: string;
  units: number;
  semester: number;
  studyMaterial: string;
  referenceBook: string;
  description: string;
  syllabus: string;
}

const Page = () => {
  const [subjects, setSubjects] = useState<SUBJECT[]>([]);
  const [loading, setLoading] = useState(false);

  const deleteHandler = async (_id: any) => {
    alert("Delete function not implemented yet");
  };

  const editHandler = async (_id: any) => {
    alert("Edit function not implemented yet");
  };

  useEffect(() => {
    const fetchSubjects = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/subject/create");
        setSubjects(response.data.subjects);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSubjects();
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loading />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm text-gray-400">
            <thead className="bg-gray-800">
              <tr>
                <th className="p-4">Subject</th>
                <th className="p-4">subjectCode</th>
                <th className="p-4">units</th>
                <th className="p-4">semester</th>
                <th className="p-4">studyMaterial</th>
                <th className="p-4">referenceBook</th>
                <th className="p-4">syllabus</th>
                <th className="p-4">description</th>
                <th className="p-4">Edit</th>
                <th className="p-4">Delete</th>
              </tr>
            </thead>
            <tbody>
              {subjects.length > 0 ? (
                subjects.map((subject) => (
                  <tr
                    key={subject._id}
                    className="bg-gray-900 border-b border-gray-700"
                  >
                    <td className="p-4">{subject.name}</td>
                    <td className="p-4">{subject.subjectCode}</td>
                    <td className="p-4">{subject.units}</td>
                    <td className="p-4">{subject.semester}</td>
                    <td className="p-4">
                      <Link href={`${subject.studyMaterial}`}>
                        Study Material Pdf
                      </Link>
                    </td>
                    <td className="p-4">
                      <Link href={`${subject.referenceBook}`}>
                        Reference Book Pdf
                      </Link>
                    </td>
                    <td className="p-4">
                      <Link href={`${subject.syllabus}`}>Syllabus Pdf</Link>
                    </td>
                    <td className="p-4">{subject.description}</td>
                    <td
                      className="p-4 cursor-pointer"
                      onClick={() => editHandler(subject._id)}
                    >
                      <MdEdit className="text-blue-500 hover:text-blue-700" />
                    </td>
                    <td
                      className="p-4 cursor-pointer"
                      onClick={() => deleteHandler(subject._id)}
                    >
                      <MdDeleteSweep className="text-red-500 hover:text-red-700" />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="text-center text-gray-400 p-4">
                    No subjects available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Page;
