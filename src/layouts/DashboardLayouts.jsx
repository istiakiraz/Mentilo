import React, { useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { Link, NavLink, Outlet } from "react-router";
import logo from "../assets/logo/mentiloTitleLogo.png";
import {
  FiUser,
  FiBook,
  FiActivity,
  FiClock,
  FiPlusCircle,
  FiEdit3,
  FiMail,
  FiUserCheck,
  FiDollarSign,
} from "react-icons/fi";
import { FaCalendarPlus, FaUserClock } from "react-icons/fa";
import useUserInfo from "../hooks/useUserInfo";

const DashboardLayouts = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { userInfo, userInfoLoading } = useUserInfo();

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <div className="bg-secondary min-h-screen h-full">
      {/* ---   NAVBAR   --- */}

      <nav className="sticky top-0 z-100 w-full border-b border-gray-200 bg-minor">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              {/* ✅ Drawer Toggle Button with animation */}
              <button
                onClick={toggleDrawer}
                type="button"
                className="inline-flex  p-2 text-sm text-white rounded-lg lg:hidden hover:bg-primary focus:outline-none focus:ring-2 relative w-10 h-10 justify-center items-center"
              >
                {/* Hamburger Icon */}
                <svg
                  className={`absolute w-6 h-6 transition-all duration-300 ${
                    isDrawerOpen
                      ? "opacity-0 scale-75 rotate-45"
                      : "opacity-100 scale-100 rotate-0"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                    clipRule="evenodd"
                  />
                </svg>

                <svg
                  className={`absolute w-6 h-6 transition-all duration-300 ${
                    isDrawerOpen
                      ? "opacity-100 scale-100 rotate-0"
                      : "opacity-0 scale-75 rotate-45"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <Link
                to="/dashboard"
                className="self-center  ms-3 text-xl lg:text-2xl font-semibold whitespace-nowrap text-white"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ---   DRAWER   --- */}

      <div
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform duration-300 bg-primary border-r border-primary 
        ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0`}
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-primary flex flex-col justify-between">
          <ul className="space-y-2 font-medium">
            {/* user dash link */}

            <li>
              <NavLink
                to="/dashboard"
                onClick={closeDrawer}
                className="flex items-center gap-2 p-2 text-white rounded-lg hover:bg-gray-700 ms-3 group"
              >
                <FiUser className="text-xl" /> Profile Page
              </NavLink>
            </li>
            {!userInfoLoading && userInfo.role === "member" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/booked-trainer"
                    onClick={closeDrawer}
                    className="flex items-center gap-2 p-2 text-white rounded-lg hover:bg-gray-700 ms-3 group"
                  >
                    <FiBook className="text-xl" /> Booked Trainer
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/activity-log"
                    onClick={closeDrawer}
                    className="flex items-center gap-2 p-2 text-white rounded-lg hover:bg-gray-700 ms-3 group"
                  >
                    <FiActivity className="text-xl" /> Activity Log
                  </NavLink>
                </li>
              </>
            )}

            {/* trainer dash link */}

            {!userInfoLoading && userInfo.role === "trainer" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/manage-slots"
                    onClick={closeDrawer}
                    className="flex items-center gap-2 p-2 text-white rounded-lg hover:bg-gray-700 ms-3 group"
                  >
                    <FiClock className="text-xl" /> Manage Slots
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/add-new-slot"
                    onClick={closeDrawer}
                    className="flex items-center gap-2 p-2 text-white rounded-lg hover:bg-gray-700 ms-3 group"
                  >
                    <FiPlusCircle className="text-xl" /> Add New Slot
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/add-forum"
                    onClick={closeDrawer}
                    className="flex items-center gap-2 p-2 text-white rounded-lg hover:bg-gray-700 ms-3 group"
                  >
                    <FiEdit3 className="text-xl" /> Add New Forum
                  </NavLink>
                </li>
              </>
            )}

            {/* admin dash link */}

            {!userInfoLoading && userInfo.role === "admin" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/newsletter"
                    onClick={closeDrawer}
                    className="flex items-center gap-2 p-2 text-white rounded-lg hover:bg-gray-700 ms-3 group"
                  >
                    <FiMail className="text-xl" /> Newsletter
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/all-trainers"
                    onClick={closeDrawer}
                    className="flex items-center gap-2 p-2 text-white rounded-lg hover:bg-gray-700 ms-3 group"
                  >
                    <FiUserCheck className="text-xl" /> All Trainers
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/applied-trainer"
                    onClick={closeDrawer}
                    className="flex items-center gap-2 p-2 text-white rounded-lg hover:bg-gray-700 ms-3 group"
                  >
                    <FaUserClock className="text-xl" /> Applied Trainer
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/balance"
                    onClick={closeDrawer}
                    className="flex items-center gap-2 p-2 text-white rounded-lg hover:bg-gray-700 ms-3 group"
                  >
                    <FiDollarSign className="text-xl" /> Balance
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/add-class"
                    onClick={closeDrawer}
                    className="flex items-center gap-2 p-2 text-white rounded-lg hover:bg-gray-700 ms-3 group"
                  >
                    <FaCalendarPlus className="text-xl" /> Add New Class
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/add-forum"
                    onClick={closeDrawer}
                    className="flex items-center gap-2 p-2 text-white rounded-lg hover:bg-gray-700 ms-3 group"
                  >
                    <FiEdit3 className="text-xl" /> Add New Forum
                  </NavLink>
                </li>
              </>
            )}
          </ul>

          {/* ✅ Bottom Back Button */}
          <div className="mb-6 mx-auto">
            <img className="w-40 ms-3 mb-2" src={logo} alt="logo" />
            <Link onClick={closeDrawer} to="/">
              <a className="relative inline-block text-lg group">
                <span className="relative z-10 block md:px-5 px-3 py-2 md:py-2 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-secondary rounded-lg group-hover:text-primary">
                  <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                  <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-secondary group-hover:-rotate-180 ease"></span>
                  <span className="relative font-title  text-sm md:text-[16px] flex items-center gap-2 ">
                    {" "}
                    <GoArrowLeft size={20} /> Back To Home
                  </span>
                </span>
                <span className="absolute bottom-0 right-0 w-full h-10 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-secondary rounded-lg group-hover:mb-0 group-hover:mr-0" />
              </a>
            </Link>
          </div>
        </div>
      </div>

      <div className="p-4 lg:ml-64">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayouts;
