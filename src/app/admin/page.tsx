import Link from "next/link";

const Page = () => {
  return (
    <div className="flex flex-col justify-start m-4 p-4 gap-3">
      <div className="student flex flex-col gap-2">
        <Link href="/admin/all-student">
          <div className="allStudent p-2 rounded bg-gray-700 hover:bg-gray-600 text-white w-[200px] cursor-pointer">
            All Students
          </div>
        </Link>
        <Link href="/admin/student">
          <div className="addStudent p-2 rounded bg-gray-700 hover:bg-gray-600 text-white w-[200px] cursor-pointer">
            Add New Student
          </div>
        </Link>
      </div>

      <div className="course flex flex-col gap-2">
        <Link href="/admin/course">
          <div className="addCourse p-2 rounded bg-gray-700 hover:bg-gray-600 text-white w-[200px] cursor-pointer">
            Add New Course
          </div>
        </Link>
        <Link href="/admin/all-courses">
          <div className="allCourse p-2 rounded bg-gray-700 hover:bg-gray-600 text-white w-[200px] cursor-pointer">
            All Courses
          </div>
        </Link>
      </div>

      <div className="course flex flex-col gap-2">
        <Link href="/admin/teacher">
          <div className="addCourse p-2 rounded bg-gray-700 hover:bg-gray-600 text-white w-[200px] cursor-pointer">
            Add New Teacher
          </div>
        </Link>
        <Link href="/admin/all-teachers">
          <div className="allCourse p-2 rounded bg-gray-700 hover:bg-gray-600 text-white w-[200px] cursor-pointer">
            All Teachers
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Page;
