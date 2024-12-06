"use client";
import Loading from "@/app/components/Loading";
import axios from "axios";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaClock, FaFileUpload, FaImage, FaUser } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

interface SUBJECT {
  _id: string;
  name: string;
}

const Page: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    duration: "",
    noOfSubjects: 0,
    noOfSemesters: 0,
    price: "",
  });

  const [syllabus, setSyllabus] = useState<File | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [subjects, setSubjects] = useState<SUBJECT[]>([]);
  const [sub, setSub] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [submiting, setSubmiting] = useState(false);

  const handleSubjectClick = (subjectId: string) => {
    setSub((prevSub) => {
      if (prevSub.includes(subjectId)) {
        return prevSub.filter((id) => id !== subjectId);
      } else {
        return [...prevSub, subjectId];
      }
    });
  };

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/subject/create");
        if (response.data.success) {
          setSubjects(response.data.subjects);
        } else {
          console.error("Error fetching subjects:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching subjects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (e.target.name === "syllabus") {
        setSyllabus(e.target.files[0]);
      } else if (e.target.name === "image") {
        setImage(e.target.files[0]);
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("name", formData.name);
    formdata.append("description", description);
    formdata.append("duration", formData.duration);
    formdata.append("price", formData.price);
    formdata.append("noOfSemesters", formData.noOfSemesters.toString());
    formdata.append("noOfSubjects", formData.noOfSubjects.toString());
    formdata.append("subjects", JSON.stringify(sub));

    if (syllabus) {
      formdata.append("syllabus", syllabus);
    }

    if (image) {
      formdata.append("image", image);
    }

    try {
      const response = await axios.post("/api/course", formdata);
      if (response) {
        setSubmiting(true);
        toast.success(response.data.message || "Course added successfully");
      } else {
        toast.error("Error adding course");
      }
    } catch (error) {
      console.error("Error submitting form", error);
      toast.error("Error adding course");
    } finally {
      setSubmiting(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#000000] px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1F2937] p-8 rounded-lg shadow-lg w-full max-w-4xl space-y-6"
      >
        <h2 className="text-3xl font-semibold text-white mb-6 text-center">
          Add a New Course
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Course Name */}
          <div className="space-y-3">
            <label htmlFor="name" className="block text-gray-300 text-sm">
              Course Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-4 rounded-lg border border-gray-600 bg-[#374151] text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter course name"
            />
          </div>

          {/* Duration */}
          <div className="space-y-3">
            <label
              htmlFor="duration"
              className="text-gray-300 flex items-center text-sm"
            >
              <FaClock className="mr-2 text-lg" /> Duration
            </label>
            <input
              type="text"
              name="duration"
              id="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full p-4 rounded-lg border border-gray-600 bg-[#374151] text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter course duration"
            />
          </div>

          <div className="space-y-3">
            <label
              htmlFor="price"
              className="text-gray-300 flex items-center text-sm"
            >
              <FaClock className="mr-2 text-lg" /> Price
            </label>
            <input
              type="text"
              name="price"
              id="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-4 rounded-lg border border-gray-600 bg-[#374151] text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter course duration"
            />
          </div>

          {/* Number of Semesters */}
          <div className="space-y-3">
            <label
              htmlFor="noOfSemesters"
              className="text-gray-300 flex items-center text-sm"
            >
              <FaUser className="mr-2 text-lg" /> Number of Semesters
            </label>
            <input
              type="number"
              name="noOfSemesters"
              id="noOfSemesters"
              value={formData.noOfSemesters}
              onChange={handleChange}
              className="w-full p-4 rounded-lg border border-gray-600 bg-[#374151] text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter Course Price"
            />
          </div>

          {/* Number of Subjects */}
          <div className="space-y-3">
            <label
              htmlFor="noOfSubjects"
              className="text-gray-300 flex items-center text-sm"
            >
              <FaUser className="mr-2 text-lg" /> Number of Subjects
            </label>
            <input
              type="number"
              name="noOfSubjects"
              id="noOfSubjects"
              value={formData.noOfSubjects}
              onChange={handleChange}
              className="w-full p-4 rounded-lg border border-gray-600 bg-[#374151] text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter number of subjects"
            />
          </div>

          {/* Select Subjects */}
          <div className="space-y-3 col-span-1 md:col-span-2">
            <label htmlFor="subjects" className="block text-gray-300 text-sm">
              Select Subjects
            </label>
            <div className="w-full p-3 rounded-lg border border-gray-600 bg-[#374151] text-white flex flex-wrap gap-2 cursor-pointer">
              {subjects?.map((subj) => (
                <div
                  key={subj._id}
                  className={`p-3 rounded-lg text-sm ${
                    sub.includes(subj._id) ? "bg-green-600" : "bg-pink-600"
                  } text-white hover:bg-opacity-80 transition`}
                  onClick={() => handleSubjectClick(subj._id)}
                >
                  {subj.name}
                </div>
              ))}
            </div>
          </div>

          {/* Upload Syllabus */}
          <div className="space-y-3">
            <label
              htmlFor="syllabus"
              className="text-gray-300 flex items-center text-sm"
            >
              <FaFileUpload className="mr-2 text-lg" /> Upload Syllabus
            </label>
            <input
              type="file"
              name="syllabus"
              id="syllabus"
              onChange={handleFileChange}
              className="w-full file:border border-gray-600 bg-[#374151] file:border-none file:rounded-lg file:cursor-pointer focus:outline-none p-4"
            />
          </div>

          {/* Upload Featured Image */}
          <div className="space-y-3">
            <label
              htmlFor="image"
              className="text-gray-300 flex items-center text-sm"
            >
              <FaImage className="mr-2 text-lg" /> Featured Image
            </label>
            <input
              type="file"
              name="image"
              id="image"
              onChange={handleFileChange}
              className="w-full file:border border-gray-600 bg-[#374151] file:border-none file:rounded-lg file:cursor-pointer focus:outline-none p-4"
            />
          </div>

          {/* Course Description */}
          <div className="space-y-3 col-span-1 md:col-span-2">
            <label
              htmlFor="description"
              className="block text-gray-300 text-sm"
            >
              Course Description
            </label>
            <textarea
              name="description"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-4 rounded-lg border border-gray-600 bg-[#374151] text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter course description"
            />
          </div>
        </div>

        <div className="flex justify-center items-center space-x-4 mt-6">
          <button
            type="submit"
            disabled={submiting}
            className="py-3 px-6 bg-indigo-500 hover:bg-indigo-600 rounded-lg text-white font-semibold w-full md:w-auto"
          >
            {submiting ? "Adding " : "Add course"}
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Page;
