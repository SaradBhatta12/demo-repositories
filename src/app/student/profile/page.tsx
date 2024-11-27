import LogoutStudent from "@/app/components/client/LogoutStudent";
import connectDB from "@/DB/connectDB";
import Student from "@/model/student.models";
import { getUserFromStudent } from "@/utils/getUserFromCookie";
import Image from "next/image";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { BsPersonFill } from "react-icons/bs";

await connectDB();
const studentId = await getUserFromStudent();
const studentData = await Student.findById(studentId).populate([
  { path: "Course" },
  { path: "subjects", model: "Subject", strictPopulate: false },
]);

console.log(studentData);

const ProfilePage = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-6">
      <div className="relative w-full h-full max-w-5xl bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        <div className="absolute right-6 top-5">
          <LogoutStudent />
        </div>

        {studentData && (
          <div className="flex flex-col items-center p-8">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-700 shadow-md">
              <Image
                src={studentData.image}
                alt="Profile Picture"
                fill
                style={{ objectFit: "cover" }}
                priority={true}
              />
            </div>
            <h2 className="mt-6 text-4xl font-bold flex items-center space-x-2 text-yellow-400">
              <BsPersonFill />
              <span>{studentData.name}</span>
            </h2>
            <p className="text-gray-400 text-lg mt-2">
              {studentData?.Course?.name}
            </p>
            <div className="mt-4 space-y-2 text-gray-300">
              <p className="flex items-center space-x-2">
                <AiOutlineMail className="text-yellow-400" />
                <span>{studentData.email}</span>
              </p>
              {studentData.phone && (
                <p className="flex items-center space-x-2">
                  <AiOutlinePhone className="text-yellow-400" />
                  <span>{studentData.phone}</span>
                </p>
              )}
            </div>
          </div>
        )}

        <div className="w-full p-8 bg-gray-700">
          <h3 className="text-2xl font-semibold mb-6 text-center text-yellow-300">
            Subjects
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {studentData?.Course?.subjects?.map((subject: any) => (
              <div
                key={subject}
                className="bg-gray-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-200"
              >
                <h4 className="text-lg font-semibold text-yellow-300">
                  {subject}
                </h4>
                <p className="text-gray-400 mt-2">Code: {subject.code}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
