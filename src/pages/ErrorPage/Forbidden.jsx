import React from 'react';
import error from "../../assets/svg/403 Error Forbidden-cuate.svg";
import { Link } from "react-router";
import { GoArrowLeft } from "react-icons/go";

const Forbidden = () => {
    return (
        <>
            <div
        className="min-h-screen bg-[radial-gradient(#0000001a_1px,#f8fafc_1px)] pt-28 flex flex-col  justify-center items-center
         mx-auto"
      >
        <img
        className="w-96 md:w-[450px] lg:w-[600px] -mt-40 " 
        src={error} alt="error page " />
        <div className="bg-secondary p-8 lg:w-6/12 w-11/12 rounded-3xl border border-primary">
          <h1 className="md:text-3xl  text-primary text-2xl w-11/12  mx-auto text-center font-medium">
            Sorry! You don’t have permission to access this page.
          </h1>

          <div className="w-6/12  mt-4 md:w-3/12 mx-auto ">
            <Link to="/">
              <a className="relative inline-block text-lg group">
                <span className="relative z-10 block md:px-5 px-3 py-2 md:py-2 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-primary rounded-lg group-hover:text-secondary">
                  <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                  <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-primary group-hover:-rotate-180 ease"></span>
                  <span className="relative text-sm font-title  md:text-[16px] flex items-center gap-2 ">
                    {" "}
                    <GoArrowLeft size={20} /> Back To Home
                  </span>
                </span>
                <span className="absolute bottom-0 right-0 w-full h-10 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-primary rounded-lg group-hover:mb-0 group-hover:mr-0" />
              </a>
            </Link>
          </div>
        </div>
      </div>
        </>
    );
};

export default Forbidden;