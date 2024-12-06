"use client";
import Loading from "@/app/components/Loading";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineBook, AiOutlineRead } from "react-icons/ai";
import { FaChalkboardTeacher } from "react-icons/fa";

interface Subject {
  _id: string;
  name: string;
  subjectCode: string;
}

interface Course {
  _id: string;
  name: string;
  description: string;
  mysubjects: Subject[];
}

const CoursePage = () => {
  const params = useParams();
  const id = params.id;

  const [course, setCourse] = useState<Course | null>(null);
  console.log(course);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const getCourse = async () => {
      try {
        const response = await axios.get(`/api/course/${id}`);
        setCourse(response.data.courseDetails);
        setLoading(false);
      } catch (err: any) {
        setError(
          err.response?.data?.message || "Failed to fetch course details"
        );
        setLoading(false);
      }
    };
    getCourse();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-white">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen  text-white p-6">
      <div className="max-w-4xl mx-auto rounded-lg shadow-lg overflow-hidden">
        {/* Course Details */}
        <div className="p-6">
          <h1 className="text-3xl font-bold text-yellow-400 flex items-center">
            <FaChalkboardTeacher className="mr-2" />
            {course?.name}
          </h1>
          <p className="text-gray-300 mt-4">{course?.description}</p>
        </div>

        {/* Subjects */}
        <div className="p-6 ">
          <h2 className="text-2xl font-semibold text-yellow-300 flex items-center mb-4">
            <AiOutlineBook className="mr-2" />
            Subjects
          </h2>
          {course ? (
            course.mysubjects.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {course.mysubjects.map((subject, index: number) => (
                  <div
                    key={index}
                    className="bg-gray-900 p-4 rounded-lg shadow-md"
                  >
                    <h3 className="text-xl font-semibold text-yellow-400 flex items-center">
                      <AiOutlineRead className="mr-2" />
                      {subject.name}
                    </h3>
                    <p className="text-gray-600 mt-2">{subject.subjectCode}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">
                No subjects available for this course.
              </p>
            )
          ) : (
            <div>No course fount</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
