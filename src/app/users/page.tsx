import connectDB from "@/DB/connectDB";
import User from "@/model/user.models";
import Image from "next/image";

await connectDB();
const allusers = await User.find();
const page = () => {
  return (
    <div className="overflow-x-auto px-4 py-6">
      <div className="overflow-x-auto">
        <table className="min-w-full  border border-gray-200 shadow-lg">
          <thead>
            <tr className="border-b-2 text-white">
              <th className="px-4 py-3 text-left">Username</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Profile Pic</th>
              <th className="px-4 py-3 text-left">Role</th>
            </tr>
          </thead>

          <tbody>
            {allusers.map((user, index) => {
              return (
                <tr key={index} className="border-b border-gray-200">
                  <td className="px-4 py-3">{user.username}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">
                    <div className="image object-cover object-center rounded-full ">
                      <Image
                        src={user.image}
                        alt="user Image"
                        height={30}
                        width={30}
                        className="rounded-full"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {user.isAdmin ? <h1>Admin</h1> : <h1>User</h1>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;
