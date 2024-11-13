"use client";
import Loading from "@/app/components/Loading";
import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import toaset, { toast, Toaster } from "react-hot-toast";

interface STUDENT {
  _id: string;
  email: string;
}

interface COURSE {
  _id: string;
  name: string;
}

const page = () => {
  const [student, setStudent] = useState<string>("");
  const [course, setCourse] = useState<string>("");
  const [courses, setCourses] = useState<COURSE[]>([]);
  const [students, setStudents] = useState<STUDENT[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  console.log(course);

  // Fetch courses and students data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [courseResponse, studentResponse] = await Promise.all([
          axios.get("/api/course"),
          axios.get("/api/student/allstudents"),
        ]);
        setCourses(courseResponse.data.courses);
        setStudents(studentResponse.data.students);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handle form submission
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitting(true);
      try {
        const response = await axios.post("/api/profile/create", {
          student,
          course,
        });

        if (response.data.success) {
          toaset.success(response.data.message || "Successfully enrolled");
        } else {
          toaset.error(response.data.message);
        }
      } catch (error: any) {
        toast.error(error.response.data.message || "something went to wrong ");
      } finally {
        setSubmitting(false);
      }
    },
    [student, course]
  );

  // Memoize student and course options
  const studentOptions = useMemo(
    () =>
      students?.map((student) => (
        <option key={student._id} value={student._id}>
          {student.email}
        </option>
      )),
    [students]
  );

  const courseOptions = useMemo(
    () =>
      courses?.map((course) => (
        <option key={course._id} value={course._id}>
          {course.name}
        </option>
      )),
    [courses]
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 to-black p-6">
      <Toaster />
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 text-white shadow-lg rounded-lg p-8 max-w-lg w-full space-y-6"
      >
        <h2 className="text-3xl font-semibold text-center mb-6">
          Create Profile
        </h2>

        {loading ? (
          <div className="flex justify-center items-center">
            <Loading />
          </div>
        ) : (
          <>
            {/* Student Select */}
            <div className="students">
              <label
                htmlFor="student"
                className="block text-xl font-medium mb-2"
              >
                Student
              </label>
              <select
                name="student"
                id="student"
                value={student}
                onChange={(e) => setStudent(e.target.value)}
                className="w-full p-4 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Student</option>
                {studentOptions}
              </select>
            </div>

            {/* Course Select */}
            <div className="course">
              <label
                htmlFor="course"
                className="block text-xl font-medium mb-2"
              >
                Course
              </label>
              <select
                name="course"
                id="course"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="w-full p-4 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Course</option>
                {courseOptions}
              </select>
            </div>

            <button
              type="submit"
              className="p-3 bg-blue-600 hover:bg-blue-700 text-center w-full rounded-lg font-semibold transition-colors duration-300"
              disabled={submitting}
            >
              {submitting ? "Creating Profile..." : "Create Profile"}
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default page;
