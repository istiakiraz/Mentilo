import React, { useState } from "react";
import logo from "../assets/logo/mentiloTitleLogo.png";
import { Link, NavLink } from "react-router";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import useUserInfo from "../hooks/useUserInfo";
import { FaUserCircle } from "react-icons/fa";
import Loading from "./Loading";

const Navbar = () => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const [isOpen, setIsOpen] = useState(false);
  const { userInfo, userInfoLoading } = useUserInfo();
  const { user, signOutUser } = useAuth();
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  if (userInfoLoading) {
    return <Loading></Loading>
  }


  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        Toast.fire({
          icon: "success",
          title: `Sign Out successfully!`,
          background: "#f9f6fc",
          iconColor: "#432365",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const links = (
    <>
      <NavLink
        className={({ isActive }) =>
          isActive ? " bg-primary px-3  shadow-[5px_5px_0px_0px_#e5dbf3]    " : " group relative px-3"
        }
        to="/"
      >
        <li className="flex gap-1 items-center relative overflow-hidden">
          {" "}
          <span className="relative z-10">Home</span>
          <span className="absolute left-0 bottom-0 w-full h-0.5 bg-secondary scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
        </li>
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? " bg-primary px-3 shadow-[5px_5px_0px_0px_#e5dbf3]   " : " group relative px-3"
        }
        to="/all-trainer"
      >
        <li className="flex gap-1 items-center relative overflow-hidden">
          {" "}
          <span className="relative z-10">Trainer</span>
          <span className="absolute left-0 bottom-0 w-full h-0.5 bg-secondary  scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
        </li>
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? " bg-primary shadow-[5px_5px_0px_0px_#e5dbf3] px-3   " : " group relative px-3"
        }
        to="/all-classes"
      >
        <li className="flex gap-1 items-center relative overflow-hidden">
          {" "}
          <span className="relative z-10">Classes</span>
          <span className="absolute left-0 bottom-0 w-full h-0.5 bg-secondary  scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
        </li>
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? " bg-primary px-3 shadow-[5px_5px_0px_0px_#e5dbf3]   " : " group relative px-3"
        }
        to="/forums"
      >
        <li className="flex gap-1 items-center relative overflow-hidden">
          {" "}
          <span className="relative z-10">Forums</span>
          <span className="absolute left-0 bottom-0 w-full h-0.5 bg-secondary  scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
        </li>
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? " bg-primary px-3 shadow-[5px_5px_0px_0px_#e5dbf3]   " : " group relative px-3"
        }
        to="/be-a-trainer"
      >
        <li className="flex gap-1 items-center relative overflow-hidden">
          {" "}
          <span className="relative z-10">Be a Trainer</span>
          <span className="absolute left-0 bottom-0 w-full h-0.5 bg-secondary  scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
        </li>
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? " bg-primary px-3 shadow-[5px_5px_0px_0px_#e5dbf3]   " : " group relative px-3"
        }
        to="/dashboard"
      >
        <li className="flex gap-1 items-center relative overflow-hidden">
          {" "}
          <span className="relative z-10">Dashboard</span>
          <span className="absolute left-0 bottom-0 w-full h-0.5 bg-secondary  scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
        </li>
      </NavLink>
    </>
  );

  return (
    <>
      <nav className="bg-minor  w-full z-100 sticky top-0 start-0">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between lg:py-7 mx-auto p-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img className="lg:w-40 w-32" src={logo} alt="Logo" />
          </Link>

          {/* Sign In Button */}
          <div className="flex lg:order-2 space-x-3  items-center lg:space-x-0 rtl:space-x-reverse">
            {user && (
              <Link to='/dashboard'>
                {userInfo?.photo ? (
                  <img className="rounded-full size-12 border-2 cursor-pointer object-cover border-secondary mr-2 " src={userInfo.photo} alt={userInfo?.name} />
                ) : (
                  <span className="" >
                    <FaUserCircle size={42} color="white" className=" rounded-full border-2   cursor-pointer border-secondary mr-2 " /> 
                  </span>
                )}
              </Link>
            )}

            {user ? (
              <Link
                onClick={handleSignOut}
                className="relative hidden md:inline-block text-lg group"
              >
                <span className="relative z-10 block md:px-5 px-3 py-2 md:py-2 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-secondary rounded-lg group-hover:text-primary">
                  <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                  <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-secondary group-hover:-rotate-180 ease"></span>
                  <span className="relative font-title  text-sm md:text-[16px] ">
                    Sign Out
                  </span>
                </span>
                <span className="absolute bottom-0 right-0 w-full h-10 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-secondary rounded-lg group-hover:mb-0 group-hover:mr-0" />
              </Link>
            ) : (
              <Link
                to="/sign-in"
                className="relative inline-block text-lg group"
              >
                <span className="relative z-10 block md:px-5 px-3 py-2 md:py-2 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-secondary rounded-lg group-hover:text-primary">
                  <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                  <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-secondary group-hover:-rotate-180 ease"></span>
                  <span className="relative font-title  text-sm md:text-[16px] ">
                    Sign In
                  </span>
                </span>
                <span className="absolute bottom-0 right-0 w-full h-10 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-secondary rounded-lg group-hover:mb-0 group-hover:mr-0" />
              </Link>
            )}

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
            <ul className="flex flex-col p-4 *:py-2 lg:p-0 mt-4 font-medium border border-gray-100 rounded-lg lg:space-x-8 rtl:space-x-reverse lg:flex-row lg:mt-0 lg:border-0 *:text-white">
              {links}
              {user && (
                <Link
                  onClick={handleSignOut}
                  className="relative md:hidden  w-fit inline-block text-lg group"
                >
                  <span className="relative z-10 block md:px-5 px-3 py-2 md:py-2 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-secondary rounded-lg group-hover:text-primary">
                    <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                    <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-secondary group-hover:-rotate-180 ease"></span>
                    <span className="relative text-sm md:text-[16px] ">
                      Sign Out
                    </span>
                  </span>
                  <span className="absolute bottom-0 right-0 w-fit h-10 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-secondary rounded-lg group-hover:mb-0 group-hover:mr-0" />
                </Link>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
