import React from "react";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxios from "../../hooks/useAxios";

const GoogleLogIn = () => {
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

  const { googleSignIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosInstance = useAxios();

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(async (result) => {
        const user = result.user;
        // console.log(user);

        //update user profile in database

        const userInfo = {
          name: user.displayName,
          photo: user.photoURL,
          email: user.email,
          role: "member", // default role
          created_at: new Date().toISOString(),
          last_log_at: new Date().toISOString(),
        };

        const userRes = await axiosInstance.post("/users", userInfo);

        if (userRes.data.insertedId || userRes.data.inserted === false) {
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
      .catch((error) => {
        // console.log(error);
        Toast.fire({
          icon: "error",
          background: "#f9f6fc",
          iconColor: "#432365",
          title: error,
        });
      });
  };

  return (
    <div className="text-center w-full">
      <p className="my-2">Or</p>

      <button
        onClick={handleGoogleSignIn}
        className=" bg-secondary cursor-pointer hover:bg-primary/10 text-center flex justify-center items-center duration-300 rounded py-3 w-full "
      >
        <div className="flex items-center place-content-center gap-2 w-6/12 ">
          <FcGoogle size={20} />{" "}
          <span className="font-semibold ">Login With Google</span>
        </div>
      </button>
    </div>
  );
};

export default GoogleLogIn;
