"use client";
import { memo, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const Page = memo(() => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  const schedules = [
    {
      title: "Schedule Title",
      description: "Description...",
      date: "2024-10-26",
      time: "10:00 AM - 11:00 AM",
    },
    // Add more schedules as needed
  ];

  const openModal = (schedule: any) => {
    setSelectedSchedule(schedule);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSchedule(null);
  };

  const handleDelete = (schedule: any) => {
    // Add delete functionality here
    console.log("Deleting", schedule);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    // Update the schedule details here
    console.log("Updating", selectedSchedule);
    closeModal();
  };

  return (
    <div className="container grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {/* Left Side: Create Schedule Form */}
      <div className="left bg-transparent flex flex-col border border-white shadow-lg shadow-red-400 rounded-lg p-6">
        <h1 className="text-blue-300 text-2xl font-bold mb-4">
          Create A Schedule
        </h1>
        <form className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-blue-300 mb-1">Title</label>
            <input
              type="text"
              className="w-full p-2 rounded  ring-blue-400 text-black border border-gray-600 focus:ring focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-blue-300 mb-1">Description</label>
            <input
              type="text"
              className="w-full p-2 rounded  ring-blue-400 text-black border border-gray-600 focus:ring focus:ring-blue-500"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-blue-300 mb-1">Date</label>
            <input
              type="date"
              className="w-full p-2 rounded  ring-blue-400 text-black border border-gray-600 focus:ring focus:ring-blue-500"
            />
          </div>

          {/* Time */}
          <div>
            <label className="block text-blue-300 mb-1">Time</label>
            <input
              type="time"
              className="w-full p-2 rounded  ring-blue-400 text-black border border-gray-600 focus:ring focus:ring-blue-500"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-blue-300 mb-1">Location</label>
            <input
              type="text"
              className="w-full p-2 rounded  ring-blue-400 text-black border border-gray-600 focus:ring focus:ring-blue-500"
            />
          </div>

          {/* Start Date & End Date */}
          <div className="flex space-x-2">
            <div className="w-1/2">
              <label className="block text-blue-300 mb-1">Start Date</label>
              <input
                type="date"
                className="w-full p-2 rounded  ring-blue-400 text-black border border-gray-600 focus:ring focus:ring-blue-500"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-blue-300 mb-1">End Date</label>
              <input
                type="date"
                className="w-full p-2 rounded  ring-blue-400 text-black border border-gray-600 focus:ring focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Start Time & End Time */}
          <div className="flex space-x-2">
            <div className="w-1/2">
              <label className="block text-blue-300 mb-1">Start Time</label>
              <input
                type="time"
                className="w-full p-2 rounded  ring-blue-400 text-black border border-gray-600 focus:ring focus:ring-blue-500"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-blue-300 mb-1">End Time</label>
              <input
                type="time"
                className="w-full p-2 rounded  ring-blue-400 text-black border border-gray-600 focus:ring focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Teacher */}
          <div>
            <label className="block text-blue-300 mb-1">Teacher</label>
            <select
              name="teacher"
              id="teacher"
              className="w-full p-2 rounded  ring-blue-400 text-black border border-gray-600 focus:ring focus:ring-blue-500"
            >
              <option>Teacher Name 1</option>
              <option>Teacher Name 2</option>
            </select>
          </div>

          {/* Course */}
          <div>
            <label className="block text-blue-300 mb-1">Course</label>
            <select
              name="course"
              id="course"
              className="w-full p-2 rounded  ring-blue-400 text-black border border-gray-600 focus:ring focus:ring-blue-500"
            >
              <option>Course Name 1</option>
              <option>Course Name 2</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-2 mt-4 bg-blue-600 rounded text-blue-300 hover:bg-blue-700 transition"
          >
            Create
          </button>
        </form>
      </div>

      {/* Right Side: Schedule Display */}
      <div className="right bg-transparent flex flex-col border border-white shadow-lg rounded-lg p-6">
        <h2 className="text-blue-300 text-xl font-semibold mb-4">
          Your Schedules
        </h2>
        <div className="flex flex-col space-y-4">
          {schedules.map((schedule, index) => (
            <div
              key={index}
              className="p-4 bg-zinc-800 rounded-lg shadow-md relative"
            >
              <h3 className="text-blue-300 font-semibold">{schedule.title}</h3>
              <p className="text-gray-400">{schedule.description}</p>
              <p className="text-gray-500">
                Date: <span className="text-blue-300">{schedule.date}</span>
              </p>
              <p className="text-gray-500">
                Time: <span className="text-blue-300">{schedule.time}</span>
              </p>
              <div className="absolute top-2 right-2 flex space-x-2">
                <button
                  onClick={() => openModal(schedule)}
                  className="text-blue-300 hover:text-blue-500"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(schedule)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Editing */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 w-11/12 md:w-1/2 lg:w-1/3 shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-center text-blue-500">
                Update Schedule
              </h3>
              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={selectedSchedule?.title || ""}
                    onChange={(e) =>
                      setSelectedSchedule({
                        ...selectedSchedule,
                        title: e.target.value,
                      })
                    }
                    className="w-full p-2 rounded border border-gray-300 focus:ring focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    value={selectedSchedule?.description || ""}
                    onChange={(e) =>
                      setSelectedSchedule({
                        ...selectedSchedule,
                        description: e.target.value,
                      })
                    }
                    className="w-full p-2 rounded border border-gray-300 focus:ring focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={selectedSchedule?.date || ""}
                    onChange={(e) =>
                      setSelectedSchedule({
                        ...selectedSchedule,
                        date: e.target.value,
                      })
                    }
                    className="w-full p-2 rounded border border-gray-300 focus:ring focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Time</label>
                  <input
                    type="time"
                    value={selectedSchedule?.time || ""}
                    onChange={(e) =>
                      setSelectedSchedule({
                        ...selectedSchedule,
                        time: e.target.value,
                      })
                    }
                    className="w-full p-2 rounded border border-gray-300 focus:ring focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-300 rounded text-gray-700 hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default Page;
