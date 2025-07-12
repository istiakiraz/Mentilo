import React, { useState } from "react";
import logoGIF from "../../assets/animation/Login (1).gif";
import logo from "../../assets/logo/MentiloLogo.png";
import logo2 from "../../assets/logo/mentiloTitleLogo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import { GoArrowLeft } from "react-icons/go";
import GoogleLogIn from "./GoogleLogIn";
import { FiLock, FiMail } from "react-icons/fi";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const SignIn = () => {

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


  const [showPass, setShowPass] = useState(false);
  const axiosSecure = useAxiosSecure()
  const { register, handleSubmit,  formState: { errors }, } = useForm();
  

  const {signInUser,} = useAuth()

  const location = useLocation();
  const navigate = useNavigate();

   const onSubmit = (data) => {
    // console.log(data);

    signInUser(data.email, data.password)
    .then(async(result)=>{
        console.log(result.user)

         const userInfo = {
          email: data.email,
          last_log_at : new Date().toISOString()
        }

        const userRes = await axiosSecure.post('/users', userInfo)

        // console.log(userRes.data);

        if(userRes.data.inserted === false ){
          
         navigate(`${location.state ? location.state : "/"}`);

         Swal.fire({
          title: `🏃‍♂️ Time to Move with Mentilo!`,
          text: "Let’s crush today’s goals!.",
          icon: "success",
          confirmButtonText: "Get Started",
          iconColor: "#432365",
          confirmButtonColor: "#432365",
          background: "#f9f6fc",
        });
        }

    })
    .catch(error =>{
        console.log(error);
         Toast.fire({
          icon: "error",
           background: "#f9f6fc",
          iconColor: "#432365",
          title: "Incorrect email or password",
          });
    })

  };

  return (
    <div className="grid grid-cols-1 bg-primary lg:bg-white h-screen lg:grid-cols-2 py-16 max-h-screen justify-center items-center  lg:pt-0  lg:pb-0">
      <div className=" bg-primary  hidden lg:block h-screen relative">
        <img
          className="w-[600px] relative  z-20 py-40 mx-40"
          src={logoGIF}
          alt="logo gif"
        />
      </div>

      <div className="w-11/12 mx-auto">
        <div className="mb-12">
          <Link to="/">
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

        <div className="  lg:w-7/12 mx-auto ">
          <div className="lg:flex justify-center mb-8 hidden  items-end">
            <img className="w-16" src={logo} alt="" />
            <h2 className="text-4xl font-logo -ml-3 text-primary ">Mentilo</h2>
          </div>
          <img className="lg:hidden mb-8 w-50 mx-auto " src={logo2} alt="logo" />

          <div className="bg-white rounded-xl  shadow-2xl p-7 sm:p-10">
            <h3 className="mb-4 lg:text-4xl font-title text-primary font-semibold text-center sm:mb-6 text-2xl">
              Log In
            </h3>
            <p className="text-gray-500 text-center pb-7 font-semibold ">
              Welcome back! Please enter your details.
            </p>
            <form onSubmit={handleSubmit(onSubmit)} >
              <div className="mb-1 sm:mb-2">

                {/* Email Input */}
                <div className="mb-4 relative">
                  <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    placeholder="Email"
                   {...register("email" , { required: true })}
                    type="email"
                    className="pl-10 flex-grow w-full h-12 px-4 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                    name="email"
                  />

                    {errors.email?.type === "required" && (
            <p className="text-red-700">Email is required</p>
          )}

                </div>

                {/* Password Input */}
                <div className="mb-4 relative">
                  <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    placeholder="Password"
                      {...register("password" , { required: true })}
                    type={showPass ? "text" : "password"}
                    className="pl-10 flex-grow w-full h-12 px-4 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                    name="password"
                  />

                     {errors.password?.type === "required" && (
            <p className="text-red-700">password is required</p>
          )}

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
              </div>

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

           
            </form>
               <GoogleLogIn></GoogleLogIn>

              <p className="text-center text-sm  mx-auto mb-2 flex gap-1 mt-2">
                Don’t have an account yet?{" "}
                <Link
                  to="/sign-up"
                  className="text-primary hover:no-underline underline"
                >
                  Sign-Up
                </Link>{" "}
              </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
