"use client";
import axios from "axios";
import Link from "next/link";
import { FormEvent, memo, useCallback, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

interface Teacher {
  name: string;
  age: number;
  qualification: string;
  module: string;
  email: string;
  password: string;
  _id: string;
}
interface Course {
  title: string;
  description: string;
  duration: string;
  _id: string;
}
interface Schedule {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  teacher: string;
  course: string;
  date: string;
  time: string;
  _id: string;
}

const Page = memo(() => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(
    null
  );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [teacher, setTeacher] = useState("");
  const [course, setCourse] = useState("");

  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  console.log(schedules);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTeachers = useCallback(async () => {
    try {
      const response = await axios.get("/api/teacher");
      setTeachers(response.data.teachers || []);
    } catch (error) {
      console.error("Unable to fetch teachers.", error);
    }
  }, []);

  const fetchCourses = useCallback(async () => {
    try {
      const response = await axios.get("/api/course");
      setCourses(response.data.courses || []);
    } catch (error) {
      console.error("Unable to fetch courses.", error);
    }
  }, []);

  const fetchSchedules = useCallback(async () => {
    try {
      const response = await axios.get("/api/admin/schedule");
      setSchedules(response.data.schedules || []);
    } catch (error) {
      toast.error("Failed to fetch schedules.");
      console.error("Unable to fetch schedules.", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTeachers();
    fetchCourses();
    fetchSchedules();
  }, [fetchTeachers, fetchCourses, fetchSchedules]);

  const openModal = (schedule: Schedule) => {
    setSelectedSchedule(schedule);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSchedule(null);
  };

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        const isConformed = window.confirm("Are you sure want to delete?");
        if (!isConformed) return;
        await axios.delete(`/api/admin/schedule/${id}`);
        setSchedules((s) => s.filter((sched) => sched._id !== id));
        toast.success("Schedule deleted successfully.");
      } catch (error) {
        toast.error("Failed to delete schedule.");
      }
    },
    [schedules]
  );

  const handleUpdate = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (!selectedSchedule) return;

      try {
        await axios.put(
          `/api/schedule/${selectedSchedule._id}`,
          selectedSchedule
        );
        toast.success("Schedule updated successfully.");
        fetchSchedules();
        closeModal();
      } catch (error) {
        toast.error("Failed to update schedule.");
      }
    },
    [selectedSchedule]
  );

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/admin/schedule", {
        title,
        description,
        date,
        location,
        startTime,
        endTime,
        teacher,
        course,
      });
      setSchedules((prev) => [...prev, response.data.schedule]);
      toast.success("Schedule created successfully.");
      setTitle("");
      setDescription("");
      setDate("");
      setLocation("");
      setStartTime("");
      setEndTime("");
      setTeacher("");
      setCourse("");
    } catch (error) {
      toast.error("Failed to create schedule.");
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4 grid gap-4 md:grid-cols-2">
      <Toaster />
      {/* Left Side: Create Schedule Form */}
      <div className="left bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-blue-300 mb-4">
          Create A Schedule
        </h1>
        <form onSubmit={submitHandler} className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
            className="input-field bg-transparent text-white p-2 rounded border border-white m-2"
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
            className="input-field bg-transparent text-white p-2 rounded border border-white m-2"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="input-field bg-transparent text-white p-2 rounded border border-white m-2"
          />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            required
            className="input-field bg-transparent text-white p-2 rounded border border-white m-2"
          />
          <div className="flex gap-2">
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
              className="input-field bg-transparent text-white p-2 rounded border border-white m-2"
            />
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
              className="input-field bg-transparent text-white p-2 rounded border border-white m-2"
            />
          </div>
          <select
            value={teacher}
            onChange={(e) => setTeacher(e.target.value)}
            className="input-field bg-transparent text-white p-2 rounded border border-white m-2"
            required
          >
            <option value="">Select Teacher</option>
            {teachers.map((t) => (
              <option key={t._id} value={t._id}>
                {t.name}
              </option>
            ))}
          </select>
          <select
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="input-field bg-transparent text-white p-2 rounded border border-white m-2"
            required
          >
            <option value="">Select Course</option>
            {courses.map((c) => (
              <option key={c._id} value={c._id}>
                {c.title}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="p-2 ml-2 hover:bg-blue-500 transition-all duration-200 rounded bg-blue-800 "
          >
            Create
          </button>
        </form>
      </div>

      {/* Right Side: Schedule Display */}
      <div className="right bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-blue-300 mb-4">
          Your Schedules
        </h2>
        <div className="space-y-4">
          {schedules?.map((schedule) => {
            // Find the teacher and course objects by ID
            const teacher = teachers.find((t) => t._id === schedule.teacher);
            const course = courses.find((c) => c._id === schedule.course);

            return (
              <div
                key={schedule._id}
                className="schedule-card bg-gray-700 rounded p-4 relative"
              >
                <div className="btns flex gap-3 absolute right-4 top-4 opacity-40">
                  <Link href={""}>
                    <FaEdit />
                  </Link>
                  <button onClick={() => handleDelete(schedule._id)}>
                    <MdDelete />
                  </button>
                </div>
                <h3 className="text-lg font-semibold">{schedule.title}</h3>
                <p className="text-gray-400">{schedule.description}</p>
                <p className="text-gray-400">
                  {course ? course.title : "Unknown Course"}
                </p>
                <p className="text-gray-400">
                  {teacher ? teacher.name : "Unknown Teacher"}
                </p>
                <p className="text-gray-500">
                  Date: <span className="text-blue-300">{schedule.date}</span>
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});

export default Page;
