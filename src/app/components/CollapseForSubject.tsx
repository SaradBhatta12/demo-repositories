"use client";
import Link from "next/link";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface SUBJECTI {
  _id: string;
  name: string;
  subjectCode: string;
  description: string;
  unit: number;
  semester: number;
  studyMaterial: string;
  referenceBook: string;
  syllabus: string;
}
const CollapseForSubject = ({ subjects }: { subjects: SUBJECTI[] }) => {
  const [openSubjectId, setOpenSubjectId] = useState<string | null>(null);

  const toggleCollapse = (id: string) => {
    setOpenSubjectId(openSubjectId === id ? null : id);
  };
  return (
    <div className="w-full p-8">
      <h3 className="text-2xl font-semibold mb-6 text-center text-yellow-300">
        Subjects
      </h3>
      <div className="flex flex-col gap-6">
        {!subjects ? (
          <div className="notfound">No subjects found</div>
        ) : (
          subjects.map((subject: SUBJECTI) => (
            <div
              key={subject._id}
              className="bg-gray-800 p-4 rounded-lg shadow-md"
            >
              <div className="flex justify-between items-center">
                <h4 className="text-xl font-semibold mb-2 text-yellow-400">
                  {subject.name}
                </h4>
                <button
                  onClick={() => toggleCollapse(subject._id)}
                  className="text-yellow-400 focus:outline-none"
                >
                  {openSubjectId === subject._id ? (
                    <FaChevronUp size={20} />
                  ) : (
                    <FaChevronDown size={20} />
                  )}
                </button>
              </div>
              <p className="text-gray-300">{subject.subjectCode}</p>

              {openSubjectId === subject._id && (
                <div className="mt-4 text-gray-200">
                  <p>{subject.description}</p> {/* Add description here */}
                  <p className="mt-2">Unit: {subject.unit}</p>
                  <p>Semester: {subject.semester}</p>
                  <p>
                    Study meteterial{" "}
                    <Link
                      className=" decoration-blue-600 text-blue-600"
                      href={subject.studyMaterial! || ""}
                    >
                      Book
                    </Link>
                  </p>
                  <p>
                    Reference Book{" "}
                    <Link
                      className=" decoration-blue-600 text-blue-600"
                      href={subject.referenceBook! || ""}
                    >
                      Book
                    </Link>
                  </p>
                  <p>
                    Syllabus{" "}
                    <Link
                      className=" decoration-blue-600 text-blue-600"
                      href={subject.syllabus! || ""}
                    >
                      Book
                    </Link>
                  </p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CollapseForSubject;
