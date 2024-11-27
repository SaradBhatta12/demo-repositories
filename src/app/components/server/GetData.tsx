import connectDB from "@/DB/connectDB";
import Course from "@/model/course.models";
import Student from "@/model/student.models";
import Teacher from "@/model/teacher.models";
import User from "@/model/user.models";
import getUser from "@/utils/getUserFromCookie";

// ... imports remain the same ...

export async function getDashboardData() {
  await connectDB();

  const user = await getUser();
  const adminUser = await User.findById(user);

  return {
    totalUsers: await User.find().countDocuments(),
    totalStudents: await Student.find().countDocuments(),
    totalCourses: await Course.find().countDocuments(),
    totalTeachers: await Teacher.find().countDocuments(),
    isAdmin: adminUser,
    currentUser: user,
  };
}
