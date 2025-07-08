

import React, { useState } from "react";
import logo from "../assets/logo/mentiloTitleLogo.png";
import { Link } from "react-router"; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); 

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="bg-minor w-full z-20 mb-5 top-0 start-0">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between py-7 mx-auto p-4">
          {/* Logo */}
          <a className="flex items-center space-x-3 rtl:space-x-reverse">
            <img className="w-40" src={logo} alt="Logo" />
          </a>

          {/* Sign In Button */}
          <div className="flex lg:order-2 space-x-3 items-center lg:space-x-0 rtl:space-x-reverse">
            <Link to="/login">
              <a className="relative inline-block text-lg group">
                <span className="relative z-10 block md:px-5 px-3 py-2 md:py-2 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-secondary rounded-lg group-hover:text-primary">
                  <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                  <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-secondary group-hover:-rotate-180 ease"></span>
                  <span className="relative">Sign In</span>
                </span>
                <span className="absolute bottom-0 right-0 w-full h-10 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-secondary rounded-lg group-hover:mb-0 group-hover:mr-0" />
              </a>
            </Link>

            {/* Hamburger Menu Button */}
            <button
              onClick={toggleDrawer}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-secondary rounded-lg lg:hidden focus:outline-none focus:ring-2 "
              aria-controls="navbar-sticky"
              aria-expanded={isOpen}
            >
              <div className="flex flex-col items-center justify-center w-10 h-10 space-y-1.5">
                <span
                  className={`w-8 h-[3px] bg-secondary transition-all duration-300 ease-in-out ${
                    isOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                ></span>
                <span
                  className={`w-8 h-[3px] bg-secondary rounded transition-all duration-300 ease-in-out ${
                    isOpen ? "opacity-0" : ""
                  }`}
                ></span>
                <span
                  className={`w-8 h-[3px] bg-secondary transition-all duration-300 ease-in-out ${
                    isOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                ></span>
              </div>
            </button>
          </div>

          {/* Collapsible Menu */}
          <div
            id="navbar-sticky"
             className={`w-full overflow-hidden transition-all duration-300 ease-in-out 
    ${isOpen ? "max-h-[500px]" : "max-h-0"} 
    lg:max-h-full lg:flex lg:w-auto lg:order-1`}
          >
            <ul className="flex flex-col p-4 *:md:py-2 lg:p-0 mt-4 font-medium border border-gray-100 rounded-lg lg:space-x-8 rtl:space-x-reverse lg:flex-row lg:mt-0 lg:border-0 *:text-white">
              <li>Home</li>
              <li>Trainer</li>
              <li>Classes</li>
              <li>Forums</li>
              <li>Dashboard</li>
              
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

