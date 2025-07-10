import React, { useState } from "react";
import logoGIF from "../../assets/animation/Sign up.gif";
import logo from "../../assets/logo/MentiloLogo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { GoArrowLeft } from "react-icons/go";
import GoogleLogIn from "./GoogleLogIn";
import { FiLock, FiMail, FiUser } from "react-icons/fi";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const SignUp = () => {
  const [showPass, setShowPass] = useState(false);
  const axiosSecure = useAxiosSecure()

  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [profilePic, setProfilePic] = useState("");

   const onSubmit = (data) => {
    console.log(data);

    createUser(data.email, data.password)
      .then(async(result) => {
        console.log(result.user);

        //update user profile in database

        const userInfo = {
          email: data.email,
          name: data.name,
          photo: profilePic,
          role: 'member', // default role
          created_at : new Date().toISOString(),
          last_log_at : new Date().toISOString()
        }


        const userRes = await axiosSecure.post('/users', userInfo)


        // console.log(userRes.data);
        if(userRes.data.insertedId){
          // update user profile in firebase
        const userProfile = {
          displayName: data.name,
          photoURL: profilePic,
        };
        updateUserProfile(userProfile)
          .then(() => {
            navigate('/')
            console.log("profile name pic updated");
          })
          .catch((error) => {
            console.log(error);
          });
        };
   
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleImgUpload = async (e) => {
    const image = e.target.files[0];
    // console.log(image);

    const formData = new FormData();
    formData.append("image", image);

    const imgURL = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_upload_Key
    }`;

    const res = await axios.post(imgURL, formData);

    setProfilePic(res.data.data.url);
    console.log(res.data.data.url);
  };

  return (
    <div className="grid grid-cols-1 bg-secondary lg:bg-white h-screen lg:grid-cols-2 py-16 max-h-screen justify-center items-center  lg:pt-0  lg:pb-0">
      <div className="w-11/12 mx-auto">
        <div className="mb-2">
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

        <div className="  lg:w-8/12 mx-auto ">
          <div className="flex justify-center mb-2   items-end">
            <img className="w-16" src={logo} alt="" />
            <h2 className="text-4xl font-logo -ml-3 text-primary ">Mentilo</h2>
          </div>

          <div className="bg-white rounded-xl  shadow-2xl p-7 sm:p-10">
            <h3 className="mb-4 font-title text-primary lg:text-4xl font-semibold text-center sm:mb-6 text-2xl">
              Sign up
            </h3>
            <p className="text-gray-500 text-center pb-7 font-semibold ">
              First time? Enter you details below!
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-1 flex items-center gap-3 sm:mb-2">
                {profilePic && (
                  <img
                    className="rounded-full size-14 mt-3 border-2 border-primary"
                    src={profilePic}
                    alt="User Pic"
                  />
                )}

                <div>
                  <label className="inline-block mb-2 text-gray-500 ml-2 font-medium">
                    Upload Your Profile Picture
                  </label>

                  <input
                    placeholder="Picture"
                    onChange={handleImgUpload}
                    type="file"
                    className="file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold  hover:file:bg-violet-100 file:text-primary  flex-grow w-full h-12 px-4 transition duration-200 bg-white  rounded  appearance-none focus:border-deep-purple-accent-400   "
                  />
                </div>
              </div>

              {/* Name Input */}
              <div className="mb-4 relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  placeholder="Your Name"
                  {...register("name", { required: true, maxLength: 20 })}
                  type="name"
                  className="pl-10 flex-grow w-full h-12 px-4 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                  name="name"
                />

                {errors.name?.type === "required" && (
                  <p className="text-red-700">Name is required</p>
                )}

                {errors.name?.type === "maxLength" && (
                  <p className="text-red-700">
                    First name must be under 20 characters
                  </p>
                )}
              </div>

              {/* Email Input */}
              <div className="mb-4 relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  placeholder="Email"
                  {...register("email", { required: true })}
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
                  type={showPass ? "text" : "password"}
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern: {
                      value: /^(?=.*[A-Z])(?=.*\d).{6,}$/,
                      message:
                        "Password must include 1 uppercase and 1 number",
                    },
                  })}
                  className="pl-10 flex-grow w-full h-12 px-4 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                  name="password"
                />

                {/* Required Error */}
                {errors.password?.type === "required" && (
                  <p className="text-red-700">Password is required</p>
                )}

                {/* MinLength Error */}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-700">
                    Password must be at least 6 characters
                  </p>
                )}

                {/* Pattern Error */}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-700">{errors.password.message}</p>
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

              <div className="mt-4  sm:mb-4">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-300 cursor-pointer rounded shadow-md bg-primary hover:bg-minor "
                >
                  Sign Up
                </button>
              </div>

            </form>
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
