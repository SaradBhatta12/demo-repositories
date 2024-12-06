import LogoutStudent from "@/app/components/client/LogoutStudent";
import CollapseForSubject from "@/app/components/CollapseForSubject";
import connectDB from "@/DB/connectDB";
import Student from "@/model/student.models";
import { getUserFromStudent } from "@/utils/getUserFromCookie";
import mongoose from "mongoose";
import Image from "next/image";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { BsPersonFill } from "react-icons/bs";

await connectDB();
const studentId = await getUserFromStudent();
const studentData = await Student.aggregate([
  {
    $match: {
      _id: new mongoose.Types.ObjectId(studentId!),
    },
  },
  {
    $lookup: {
      from: "courses", // Collection name for Course
      localField: "Course",
      foreignField: "_id",
      as: "courseDetails",
    },
  },
  {
    $unwind: {
      path: "$courseDetails", // Unwind the courseDetails array
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $lookup: {
      from: "subjects", // Collection name for Subjects
      localField: "courseDetails.subjects", // Array of subject ObjectIds
      foreignField: "_id", // Field in Subjects collection
      as: "courseDetails.subjects", // Alias for joined subjects
    },
  },
]);

console.log(studentData);

let subjects = studentData[0]?.courseDetails?.subjects;
const studentProfile = await getUserFromStudent();

const ProfilePage = () => {
  if (studentProfile === null) {
    <div className="no">No student here login first</div>;
  }
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-6">
      <div className="relative w-full h-full max-w-5xl shadow-lg rounded-lg overflow-hidden">
        <div className="absolute right-6 top-5">
          <LogoutStudent />
        </div>

        {!studentData ? (
          <div className="no">No data found</div>
        ) : (
          studentData && (
            <div className="flex flex-col items-center p-8">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-700 shadow-md">
                <Image
                  src={studentData[0]?.image}
                  alt="Profile Picture"
                  fill
                  style={{ objectFit: "cover" }}
                  priority={true}
                />
              </div>
              <h2 className="mt-6 text-4xl font-bold flex items-center space-x-2 text-yellow-400">
                <BsPersonFill />
                <span>{studentData[0]?.name}</span>
              </h2>
              <p className="text-gray-400 text-lg mt-2">
                {studentData[0]?.courseDetails?.name}
              </p>
              <div className="mt-4 space-y-2 text-gray-300">
                <p className="flex items-center space-x-2">
                  <AiOutlineMail className="text-yellow-400" />
                  <span>{studentData[0]?.email}</span>
                </p>
                {studentData[0]?.phone && (
                  <p className="flex items-center space-x-2">
                    <AiOutlinePhone className="text-yellow-400" />
                    <span>{studentData[0]?.phone}</span>
                  </p>
                )}
              </div>
            </div>
          )
        )}
        <CollapseForSubject subjects={subjects} />
      </div>
    </div>
  );
};

export default ProfilePage;
