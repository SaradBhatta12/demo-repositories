"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Page: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    description: "",
    duration: "",
    instructor: "",
    price: "",
  });

  const [syllabus, setSyllabus] = useState<File | null>(null);
  const [image, setImage] = useState<File | null>(null);

  const params = useParams();
  const id = params?.id;

  // Fetch course details by ID
  const courseDetails = async () => {
    try {
      const { data } = await axios.get(`/api/getsinglecourse/${id}`);
      setFormData({
        name: data.data.name,
        title: data.data.title,
        description: data.data.description,
        duration: data.data.duration,
        instructor: data.data.instructor,
        price: data.data.price,
      });
    } catch (error) {
      console.error("Error fetching course details", error);
      toast.error("Failed to fetch course details.");
    }
  };

  useEffect(() => {
    if (id) {
      courseDetails();
    }
  }, [id]);

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
    formdata.append("title", formData.title);
    formdata.append("description", formData.description);
    formdata.append("duration", formData.duration);
    formdata.append("instructor", formData.instructor);
    formdata.append("price", formData.price);

    if (syllabus) {
      formdata.append("syllabus", syllabus);
    }

    if (image) {
      formdata.append("image", image);
    }

    try {
      const response = await axios.put(
        `/api/course/${id}`,
        {
          name: formData.name,
          title: formData.title,
          description: formData.description,
          syllabus: syllabus,
          duration: formData.duration,
          instructor: formData.instructor,
          image: image,
          price: formData.price,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.error("Error submitting form", error);
      toast.error("Internal server error");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#000000] px-4 py-6">
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="flex gap-4 bg-[#000000] p-8 rounded-lg shadow-lg w-full max-w-md space-y-6 border border-b-rose-800"
      >
        <div className="flex flex-col gap-4 w-full">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-gray-300 font-semibold">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded-md border border-gray-600 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-500 transition duration-300 ease-in-out"
              placeholder="Enter course name"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="title"
              className="block text-gray-300 font-semibold"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 rounded-md border border-gray-600 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-500 transition duration-300 ease-in-out"
              placeholder="Enter course title"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="description"
              className="block text-gray-300 font-semibold"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 rounded-md border border-gray-600 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-500 transition duration-300 ease-in-out"
              placeholder="Enter course description"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="syllabus"
              className="block text-gray-300 font-semibold"
            >
              Syllabus
            </label>
            <input
              type="file"
              name="syllabus"
              id="syllabus"
              onChange={handleFileChange}
              className="w-full text-gray-300 file:border-none file:bg-indigo-600 file:text-white file:rounded-md hover:file:bg-indigo-700 cursor-pointer transition duration-300 ease-in-out"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full">
          <div className="space-y-2">
            <label
              htmlFor="duration"
              className="block text-gray-300 font-semibold"
            >
              Duration
            </label>
            <input
              type="text"
              name="duration"
              id="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full p-3 rounded-md border border-gray-600 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-500 transition duration-300 ease-in-out"
              placeholder="Enter course duration"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="instructor"
              className="block text-gray-300 font-semibold"
            >
              Instructor
            </label>
            <input
              type="text"
              name="instructor"
              id="instructor"
              value={formData.instructor}
              onChange={handleChange}
              className="w-full p-3 rounded-md border border-gray-600 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-500 transition duration-300 ease-in-out"
              placeholder="Enter instructor name"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="image"
              className="block text-gray-300 font-semibold"
            >
              Featured Image
            </label>
            <input
              type="file"
              name="image"
              id="image"
              onChange={handleFileChange}
              className="w-full text-gray-300 file:border-none file:bg-indigo-600 file:text-white file:rounded-md hover:file:bg-indigo-700 cursor-pointer transition duration-300 ease-in-out"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="price"
              className="block text-gray-300 font-semibold"
            >
              Price
            </label>
            <input
              type="text"
              name="price"
              id="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-3 rounded-md border border-gray-600 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-500 transition duration-300 ease-in-out"
              placeholder="Enter price"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white py-3 rounded-lg transition-colors duration-300 ease-in-out"
          >
            Submit
          </button>
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default Page;