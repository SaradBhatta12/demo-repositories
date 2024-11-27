import connectDB from "@/DB/connectDB";
import Course from "@/model/course.models";
import Image from "next/image";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";

await connectDB();
const courses = await Course.find().limit(10);

const Page = () => {
  console.log(courses);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-black p-6 flex flex-col items-center">
      {/* Search Bar */}
      <div className="sticky top-6 z-10 w-full max-w-3xl">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Find your course here..."
            className="w-full rounded-lg border border-gray-700 bg-gray-800 py-3 px-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-400 outline-none transition"
          />
          <FaSearch className="absolute right-4 text-gray-400 opacity-70" />
        </div>
      </div>

      {/* Card Section */}
      <div className="mt-8 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses?.map((course) => (
          <div
            key={course._id?.toString() || Date.now().toString()}
            className="group relative w-full h-[24rem] bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer hover:border border-pink-400 transform transition duration-300"
          >
            {/* Image Section */}
            <div className="relative h-3/5">
              <Image
                src={course.image || ""}
                alt={course.name || ""}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg group-hover:opacity-90 transition duration-300"
              />
            </div>
            {/* Content Section */}
            <div className="p-4 bg-gray-900 h-2/5 flex flex-col justify-between">
              <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition">
                {course.name}
              </h3>
              <p className="text-sm text-gray-400 mt-2">
                {
                  // i just need only 20 characters only
                  course.description?.slice(0, 50) + "..."
                }
              </p>
              <Link href={course.syllabus || ""}>
                <button className="mt-4 py-2 px-4 bg-purple-500 text-white text-sm font-semibold rounded hover:bg-purple-600 transition">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
