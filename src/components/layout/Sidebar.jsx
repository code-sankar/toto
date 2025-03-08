import {
  FaTasks,
  FaStar,
  FaCalendarCheck,
  FaUser,
  FaPlus,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className={`md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-all ${
          isOpen ? "opacity-0" : "opacity-100"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <XMarkIcon className="w-6 h-6" />
        ) : (
          <Bars3Icon className="w-6 h-6" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`w-72 rounded-lg h-screen bg-slate-800 p-6 flex flex-col border-r border-slate-700 transition-all duration-300 fixed md:relative z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Profile Section */}
        <div className="flex items-center gap-4 pb-6 mb-6 border-b border-slate-700">
          <div className="relative">
            <img
              src="src/assets/1737545139944.jpeg"
              alt="Profile"
              className="w-11 h-11 rounded-full ring-2 ring-slate-600"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-slate-800"></div>
          </div>
          <div>
            {user && (
              <h2 className="text-lg font-semibold text-slate-100 truncate">
                Hey, {user.email.split("@")[0]}
              </h2>
            )}
            <p className="text-sm text-slate-400">Software developer</p>
          </div>
        </div>

        {/* Menu List */}
        <ul className="space-y-2 flex-1 overflow-y-auto">
          {[
            { icon: <FaTasks className="w-5 h-5" />, text: "All Tasks" },
            { icon: <FaCalendarCheck className="w-5 h-5" />, text: "Today" },
            { icon: <FaStar className="w-5 h-5" />, text: "Important" },
            { icon: <FaUser className="w-5 h-5" />, text: "Assigned to me" },
          ].map((item, index) => (
            <li
              key={index}
              className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer text-slate-300 hover:bg-slate-700/50 transition-colors duration-200 group"
            >
              {item.icon}
              <span className="group-hover:text-slate-100 truncate">
                {item.text}
              </span>
            </li>
          ))}

          {/* Add List Button */}
          <li className="mt-6">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer text-slate-400 hover:bg-slate-700/50 transition-colors duration-200 border-2 border-dashed border-slate-600 hover:border-slate-400">
              <FaPlus className="w-5 h-5" />
              <span className="truncate">Add New List</span>
            </button>
          </li>
        </ul>

        {/* Task Stats */}
        <div className="pt-6 border-t border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wider truncate">
                Today's Progress
              </h3>
              <p className="text-2xl font-bold text-slate-100 mt-1">
                <span className="text-emerald-400">11</span>
                <span className="text-slate-500 mx-1.5">/</span>
                <span className="text-slate-300">14</span>
              </p>
            </div>

            {/* Progress Circle */}
            <div className="relative w-16 h-16 group shrink-0 -mt-2">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-medium text-emerald-400 flex items-center">
                  76%
                  <span className="ml-1 w-1.5 h-1.5 bg-emerald-400/80 rounded-full animate-pulse"></span>
                </span>
              </div>
              <svg className="transform -rotate-90 w-16 h-16">
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="transparent"
                  className="text-slate-700"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="transparent"
                  className="text-emerald-500"
                  strokeDasharray="175.929"
                  strokeDashoffset="175.929 * (1 - 0.76)"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* Progress Labels */}
          <div className="flex justify-between text-xs font-medium text-slate-400">
            <span className="truncate">Completed</span>
            <span className="truncate">Remaining: 3</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
