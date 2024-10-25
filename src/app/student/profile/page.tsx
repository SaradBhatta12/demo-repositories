"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface User {
  _id: string;
  name: string;
  courses: [];
  createdAt: string;
  email: string;
  faculty: string;
  image: string;
  password: string;
}

const Page = () => {
  const router = useRouter();
  const [student, setStudent] = useState<User>();

  console.log(student);
  const getStudent = async () => {
    try {
      const response = await axios.get("/api/student");
      setStudent(response.data.user);
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  const LogoutHandler = async () => {
    try {
      const response = await axios.get("/api/student/logout");
      router.push("/student/login");
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Unable to logged out");
      console.error("Error fetching student data:", error);
    }
  };

  useEffect(() => {
    getStudent();
  }, []);

  if (!student) {
    return <div className="loading">Loading.............</div>;
  }

  return (
    <div>
      <div className="logout absolute right-6 top-5">
        <button onClick={LogoutHandler}>LogOut</button>
      </div>
      <h1>Your name is :- {student?.name}</h1>
      <h1>Your email is:- {student?.email}</h1>
      <h1>Your faculty is:- {student?.faculty}</h1>
      <h1> Your courses :- {student?.courses}</h1>
      <h1> Your login Time is:- {student?.createdAt}</h1>
      <div className="image">
        <img src={student?.image} alt="student" />
      </div>
      <h1>Your pass:- {student?.password}</h1>
      <h1>Your ID :- {student?._id}</h1>
    </div>
  );
};

export default Page;
