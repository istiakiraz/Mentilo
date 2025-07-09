import React, { useState } from 'react';
import logoGIF from "../../assets/animation/Sign up.gif";
import logo from "../../assets/logo/MentiloLogo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";
import { GoArrowLeft } from "react-icons/go";
import GoogleLogIn from "./GoogleLogIn";
import { FiLock, FiMail, FiUser } from 'react-icons/fi';

const SignUp = () => {

 const [showPass, setShowPass] = useState(false);

    return (
         <div className="grid grid-cols-1 bg-secondary lg:bg-white h-screen lg:grid-cols-2 py-16 max-h-screen justify-center items-center  lg:pt-0  lg:pb-0">
     

      <div className="w-11/12 mx-auto">
        <div className="mb-2">
          <Link to="/">
            <a className="relative inline-block text-lg group">
              <span className="relative z-10 block md:px-5 px-3 py-2 md:py-2 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-primary rounded-lg group-hover:text-secondary">
                <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-primary group-hover:-rotate-180 ease"></span>
                <span className="relative text-sm md:text-[16px] flex items-center gap-2 ">
                  {" "}
                  <GoArrowLeft size={20} /> Back To Home
                </span>
              </span>
              <span className="absolute bottom-0 right-0 w-full h-10 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-primary rounded-lg group-hover:mb-0 group-hover:mr-0" />
            </a>
          </Link>
        </div>

        <div className="  lg:w-8/12 mx-auto ">
          <div className="flex justify-center mb-2   items-end">
            <img className="w-16" src={logo} alt="" />
            <h2 className="text-4xl font-logo -ml-3 text-primary ">Mentilo</h2>
          </div>

          <div className="bg-white rounded-xl  shadow-2xl p-7 sm:p-10">
            <h3 className="mb-4 lg:text-4xl font-semibold text-center sm:mb-6 text-2xl">
              Log In
            </h3>
            <p className="text-gray-500 text-center pb-7 font-semibold ">
              Welcome back! Please enter your details.
            </p>
            <form>
              <div className="mb-1 sm:mb-2">
                 <label
                
                  className="inline-block mb-2 text-gray-500 ml-2 font-medium"
                >
                  Upload Your Picture
                </label>
              
                <input
                  placeholder="Picture"
                  required
                  type="file"
                  className="file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold  hover:file:bg-violet-100 file:text-primary  flex-grow w-full h-12 px-4 transition duration-200 bg-white  rounded  appearance-none focus:border-deep-purple-accent-400   "
              
                  
                  name="email"
                />
              </div>

                 {/* Name Input */}
      <div className="mb-4 relative">
        <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          placeholder="Your Name"
          required
          type="text"
          className="pl-10 flex-grow w-full h-12 px-4 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
          name="name"
        />
      </div>

          {/* Email Input */}
      <div className="mb-4 relative">
        <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          placeholder="Email"
          required
          type="email"
          className="pl-10 flex-grow w-full h-12 px-4 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
          name="email"
        />
      </div>

      {/* Password Input */}
      <div className="mb-4 relative">
        <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          placeholder="Password"
          required
          type={showPass ? "text" : "password"}
          className="pl-10 flex-grow w-full h-12 px-4 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
          name="password"
        />
           <button
                  type="button"
                  onClick={() => {
                    setShowPass(!showPass);
                  }}
                  className="btn btn-xs absolute top-3  right-6"
                >
                  {showPass ? (
                    <FaEyeSlash color="purple" size={22} />
                  ) : (
                    <FaEye color="purple" size={22} />
                  )}
                </button>
      </div>

              {/* <div className="mb-1 sm:mb-2">
    
                <input
                  placeholder="Email"
                  required
                  type="email"
                  className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                  
                  name="email"
                />
              </div>
              <div className="mb-1 relative sm:mb-2">
                <input
                  placeholder="Password"
                  required
                  type={showPass ? "text" : "password"}
                  className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                  name="password"
                />

                <button
                  type="button"
                  onClick={() => {
                    setShowPass(!showPass);
                  }}
                  className="btn btn-xs absolute top-3  right-6"
                >
                  {showPass ? (
                    <FaEyeSlash color="purple" size={22} />
                  ) : (
                    <FaEye color="purple" size={22} />
                  )}
                </button>
              </div> */}
              <div
                // onClick={handleForgotPass}
                className="link mt-3 underline cursor-pointer text-primary hover:no-underline "
              >
                Forgot password?
              </div>

              <div className="mt-4  sm:mb-4">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-300 cursor-pointer rounded shadow-md bg-primary hover:bg-minor "
                >
                  Sign In
                </button>
              </div>

              <GoogleLogIn></GoogleLogIn>

              <p className="text-center text-sm  mx-auto mb-2 flex gap-1 mt-2">
                Don’t have an account yet?{" "}
                <Link
                  to="/sign-in"
                  className="text-primary hover:no-underline underline"
                >
                  Sign-Up
                </Link>{" "}
              </p>
            </form>
          </div>
        </div>
      </div>

       <div className=" bg-secondary hidden lg:block h-screen relative">
        <img
          className="w-[600px] relative  z-20 py-40 mx-40"
          src={logoGIF}
          alt=""
        />
      </div>
    </div>
    );
};

export default SignUp;