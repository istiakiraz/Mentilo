import React from "react";
import postBox from "../../../assets/svg/message-received-1-3.svg";
import message from "../../../assets/svg/New message-cuate.svg";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Newsletter = () => {
  const axiosSecure = useAxiosSecure();

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;

    console.log(email);

    try {
      const res = await axiosSecure.post("/newsletter", { email });

      if (res.status === 200) {
        Toast.fire({
          icon: "success",
          title: "Thank you for subscribing!",
          iconColor: "#432365",
        });
      }
    } catch (err) {
      if (err.response?.status === 409) {
        Toast.fire({
          icon: "info",
          title: "⚠️ This email is already subscribed.",
          iconColor: "#432365",
        });
      } else {
        Toast.fire({
          icon: "error",
          title: "Something went wrong. Try again!",
        });
      }
    }

    // e.target.closest("form").reset();
  };

  return (
    <div className="w-11/12 mx-auto my-16 md:w-11/12 lg:w-9/12">
      <div className="grid md:grid-cols-3 items-center bg-primary rounded-2xl px-6 md:px-0 md:pl-8 lg:pl-16 w-full ">
        <div className="md:col-span-2 flex flex-col md:py-0 py-8 space-y-5 ">
          <p className="bg-minor w-fit text-secondary text-sm px-4 py-1 rounded ">
            Our Newsletter
          </p>
          <h1 className="lg:text-4xl text-2xl font-title  font-bold lg:w-8/12 text-secondary">
            Subscribe to our newsletter to receive more updates
          </h1>
          <form onSubmit={handleSubmit} className="relative">
            <input
              className="bg-white md:w-96 font-title  shadow-[-4px_31px_76px_-15px_rgba(229,219,243,0.5)] min-h-16 lg:h-14 pl-4 w-full rounded lg:w-[600px] "
              required
              name="email"
              placeholder="Write your email..."
              type="email"
            />

            <button
              type="submit"
              className="btn absolute  -top-1.5 md:left-65 left-57 lg:left-118 "
            >
              <span className="relative inline-block mt-4 cursor-pointer text-lg group">
                <span className="relative z-10 block md:px-5 px-3 py-2 md:py-2 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-primary rounded-lg group-hover:text-secondary">
                  <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                  <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-primary group-hover:-rotate-180 ease"></span>
                  <span className="relative font-title text-sm md:text-[16px] flex items-center gap-2 ">
                    {" "}
                    Subscribe
                  </span>
                </span>
              </span>
            </button>
          </form>
        </div>
        <div className="md:col-span-1 shadow-[-32px_0px_55px_-15px_rgba(229,219,243,0.5)] relative rounded-2xl md:mb-0 mb-4 md:rounded-r-2xl md:rounded-l-[180px]  bg-minor ">
          <img
            className="lg:w-96 w-64 mx-auto "
            src={postBox}
            alt="post box svg"
          />
          <img
            className="lg:w-60 md:w-36 w-44 -top-2 hidden lg:block lg:top-0  hover:scale-110 duration-300 md:top-25 md:right-39  lg:right-130 absolute"
            src={message}
            alt="message card"
          />
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
