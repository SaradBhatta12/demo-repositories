"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
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

  console.log(formData, syllabus, image);

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
      const response = await fetch("/api/course", {
        method: "POST",
        body: formdata,
      });

      if (response.ok) {
        toast.success("Course added successfully");
        console.log("Form submitted successfully");
      } else {
        console.error("Error submitting form");
        toast.error("Error adding course");
      }
    } catch (error) {
      console.error("Error submitting form", error);
      toast.error("Error adding course");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#000000] px-4 py-6">
      <form
        onSubmit={handleSubmit}
        className="bg-[#000000] p-8 rounded-lg shadow-md w-full max-w-md space-y-6"
      >
        <div className="space-y-2">
          <label htmlFor="name" className="block text-gray-300">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 rounded border border-white bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter course name"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="title" className="block text-gray-300">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 rounded border border-white bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter course title"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="block text-gray-300">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 rounded border border-white bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter course description"
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="syllabus" className="block text-gray-300">
            Syllabus
          </label>
          <input
            type="file"
            name="syllabus"
            id="syllabus"
            onChange={handleFileChange}
            className="w-full text-black file:border border-white bg-transparent file:border-none file:rounded-lg file:text-gray-300 file:cursor-pointer focus:outline-none border border-dotted p-4 rounded"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="duration" className="block text-gray-300">
            Duration
          </label>
          <input
            type="text"
            name="duration"
            id="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full p-3 rounded border border-white bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter course duration"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="instructor" className="block text-gray-300">
            Instructor
          </label>
          <input
            type="text"
            name="instructor"
            id="instructor"
            value={formData.instructor}
            onChange={handleChange}
            className="w-full p-3 rounded border border-white bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter instructor name"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="image" className="block text-gray-300">
            Featured Image
          </label>
          <input
            type="file"
            name="image"
            id="image"
            onChange={handleFileChange}
            className="w-full text-black file:border border-white bg-transparent file:border-none file:rounded-lg file:text-gray-300 file:cursor-pointer focus:outline-none border border-dotted p-4 rounded"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="price" className="block text-gray-300">
            Price
          </label>
          <input
            type="text"
            name="price"
            id="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-3 rounded border border-white bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter price"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition-colors"
        >
          Submit
        </button>
      </form>
      <Toaster />
    </div>
  );
};

export default Page;
