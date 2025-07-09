import React from "react";
import { FcGoogle } from "react-icons/fc";

const GoogleLogIn = () => {
  return (
    <div className="text-center w-full" >
      <p className="my-2" >Or</p>

      <button className=" bg-secondary cursor-pointer hover:bg-primary/10 duration-300 rounded py-3 w-full " >
        <div className="flex items-center  gap-2 w-6/12 mx-auto">
             <FcGoogle size={20} /> <span className="font-semibold">Login With Google</span>
        </div>
      </button>

    
    </div>
  );
};

export default GoogleLogIn;
