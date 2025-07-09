import React, { useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { Link, NavLink, Outlet } from "react-router";

const DashboardLayouts = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <div className="bg-secondary h-screen">
      
      {/* ---   NAVBAR   --- */}
      
      <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-minor">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              {/* ✅ Drawer Toggle Button (for mobile) */}
              <button
                onClick={toggleDrawer}
                type="button"
                className="inline-flex items-center p-2 text-sm text-white rounded-lg lg:hidden hover:bg-primary focus:outline-none focus:ring-2"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              <Link
                to="/dashboard"
                className="self-center ms-3 text-xl lg:text-2xl font-semibold whitespace-nowrap text-white"
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
        <div className="h-full px-3 pb-4 overflow-y-auto bg-primary">
          {/* ✅ Close button for mobile */}
          <button
            onClick={closeDrawer}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 inline-flex items-center justify-center lg:hidden"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Sidebar Links */}
          <ul className="space-y-2 font-medium mt-5">
            <li>
              <Link
                to="/"
                onClick={closeDrawer}
                className="flex items-center p-2 text-gray-900 rounded-lg bg-secondary hover:bg-secondary/70 duration-300 group"
              >
                <span className="ms-3 flex items-center gap-2">
                  <GoArrowLeft size={20} /> Back To Home
                </span>
              </Link>
            </li>

            <li>
              <NavLink
                to="/dashboard"
                onClick={closeDrawer}
                className="flex items-center p-2 text-white rounded-lg hover:bg-gray-700 ms-3 group"
              >
                Profile Page
              </NavLink>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-white rounded-lg hover:bg-gray-700 group"
              >
                <span className="ms-3">Inbox</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-white rounded-lg hover:bg-gray-700 group"
              >
                <span className="ms-3">Sign Out</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

 
      {/* --- MAIN CONTENT AREA --- */}
     
      <div className="p-4 lg:ml-64">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayouts;
