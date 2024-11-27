// "use client";
// import Link from "next/link";
// import { FaBars } from "react-icons/fa";
// import ClientComponent from "./Logout";
// export const MenuBar: React.FC<{}> = () => {
//   return (
//     <h1 className="text-2xl font-semibold">
//       <FaBars
//         onClick={() => {
//           console.log("hiii");
//         }}
//       />
//     </h1>
//   );
// };

// const AdminSidebar = () => {
//   return (
//     <div>
//       <aside className="w-full lg:w-64 bg-gray-800 p-6">
//         <div className="flex items-center space-x-4 mb-6">
//           <img
//             src={"/default-avatar.png"}
//             alt="User Profile"
//             className="w-12 h-12 rounded-full border-2 border-gray-700"
//           />
//           <div>
//             <p className="font-semibold text-lg">Sarad Bhatt</p>
//             <span className="text-green-500">Online</span>
//           </div>
//         </div>
//         <nav>
//           <ul className="space-y-4">
//             <li>
//               <Link
//                 href="/admin/subject"
//                 className="block py-2 px-4 rounded-lg hover:bg-gray-700 transition"
//               >
//                 Manage Subjects
//               </Link>
//             </li>

//             <li>
//               <Link
//                 href="/admin/course"
//                 className="block py-2 px-4 rounded-lg hover:bg-gray-700 transition"
//               >
//                 Manage Courses
//               </Link>
//             </li>

//             <li>
//               <Link
//                 href="/admin/student"
//                 className="block py-2 px-4 rounded-lg hover:bg-gray-700 transition"
//               >
//                 Manage Students
//               </Link>
//             </li>
//             <li>
//               <Link
//                 href="/admin/teacher"
//                 className="block py-2 px-4 rounded-lg hover:bg-gray-700 transition"
//               >
//                 Manage Teachers
//               </Link>
//             </li>

//             <li>
//               <Link
//                 href="/admin/schedule"
//                 className="block py-2 px-4 rounded-lg hover:bg-gray-700 transition"
//               >
//                 Manage Schedule
//               </Link>
//             </li>
//           </ul>
//         </nav>
//         {/* we need to import component */}
//         <ClientComponent />
//       </aside>
//     </div>
//   );
// };

// export default AdminSidebar;
