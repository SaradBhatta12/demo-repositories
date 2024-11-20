import Link from "next/link";
import {
  FaFacebook,
  FaGooglePlus,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import { FiBell, FiMessageSquare } from "react-icons/fi";

const Home: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-black">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-6">
        <div className="flex items-center space-x-4 mb-6">
          <img
            src="/profile.jpg"
            alt="User Profile"
            className="w-12 h-12 rounded-full border-2 border-gray-700"
          />
          <div>
            <p className="font-semibold text-lg">John David</p>
            <span className="text-green-500">Online</span>
          </div>
        </div>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link
                href="#"
                className="block py-2 px-4 rounded-lg hover:bg-gray-800 transition"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-4 rounded-lg hover:bg-gray-800 transition"
              >
                Widgets
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-800 p-6">
        {/* Header */}
        <header className="flex justify-between items-center p-4 bg-gray-900 shadow-md rounded-lg">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-xl text-white hover:text-gray-400 transition">
              <FiBell />
            </button>
            <button className="text-xl text-white hover:text-gray-400 transition">
              <FiMessageSquare />
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Metric Boxes */}
          <div className="bg-gray-900 shadow-lg p-6 rounded-lg flex items-center justify-between hover:bg-gray-700 transition">
            <div>
              <p className="text-gray-400">Welcome</p>
              <p className="text-2xl font-semibold text-white">2500</p>
            </div>
          </div>
          <div className="bg-gray-900 shadow-lg p-6 rounded-lg flex items-center justify-between hover:bg-gray-700 transition">
            <div>
              <p className="text-gray-400">Average Time</p>
              <p className="text-2xl font-semibold text-white">123.50</p>
            </div>
          </div>
          <div className="bg-gray-900 shadow-lg p-6 rounded-lg flex items-center justify-between hover:bg-gray-700 transition">
            <div>
              <p className="text-gray-400">Collections</p>
              <p className="text-2xl font-semibold text-white">1,805</p>
            </div>
          </div>
          <div className="bg-gray-900 shadow-lg p-6 rounded-lg flex items-center justify-between hover:bg-gray-700 transition">
            <div>
              <p className="text-gray-400">Comments</p>
              <p className="text-2xl font-semibold text-white">54</p>
            </div>
          </div>

          {/* Social Media Stats */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1 bg-gray-900 p-6 shadow-lg rounded-lg">
            <div className="flex items-center justify-between mb-4 hover:bg-gray-700 transition">
              <FaFacebook className="text-blue-600 text-3xl" />
              <div>
                <p className="text-gray-400">Facebook</p>
                <p className="font-semibold text-white">35k Friends</p>
              </div>
            </div>
            <div className="flex items-center justify-between mb-4 hover:bg-gray-700 transition">
              <FaTwitter className="text-blue-400 text-3xl" />
              <div>
                <p className="text-gray-400">Twitter</p>
                <p className="font-semibold text-white">584k Followers</p>
              </div>
            </div>
            <div className="flex items-center justify-between mb-4 hover:bg-gray-700 transition">
              <FaLinkedin className="text-blue-700 text-3xl" />
              <div>
                <p className="text-gray-400">LinkedIn</p>
                <p className="font-semibold text-white">758+ Contacts</p>
              </div>
            </div>
            <div className="flex items-center justify-between hover:bg-gray-700 transition">
              <FaGooglePlus className="text-red-500 text-3xl" />
              <div>
                <p className="text-gray-400">Google+</p>
                <p className="font-semibold text-white">450 Followers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
