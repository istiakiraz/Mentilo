import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useUserInfo from "../../../hooks/useUserInfo";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddForum = () => {
  const { register, handleSubmit, reset } = useForm();
//   const [imagePreview, setImagePreview] = useState(null);
const [profilePic, setProfilePic] = useState("");
const {userInfo} = useUserInfo()
const axiosSecure = useAxiosSecure()

  const onSubmit = async (data) => {

    const forumData = {
        ...data,
         photo: profilePic,
         userName : userInfo.name,
         like: 0,
         Dislike : 0,
         userEmail : userInfo.email,
         userRole : userInfo.role,
         date: new Date(),
         userPhoto : userInfo.photo
    } 

    // Optional: Console log
    // console.log("Submitted Data:", forumData);

    try {
    //   Example post (replace with your API)
      const res = await axiosSecure.post("/forum", forumData);
      if (res.data.insertedId) {
      Swal.fire("Success!", "Forum post added successfully.", "success");
    //   reset();    
      }
    } catch (err) {
      Swal.fire("Error", "Something went wrong!", "error");
    }
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
    // console.log(res.data.data.url);
  };

  return (
    <div className=" lg:w-11/12 mx-auto py-10 ">
      <h2 className="text-3xl lg:text-5xl font-title font-bold text-center text-primary mb-8">
       Add Forum Post
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg p-6 rounded-xl space-y-5 border"
      >
        {/* Title */}
        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input
            type="text"
            {...register("title", { required: true })}
            placeholder="Enter forum title"
            className="w-full border px-4 py-2 rounded focus:outline-primary"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block font-semibold mb-1">Content</label>
          <textarea
            {...register("content", { required: true })}
            rows={5}
            placeholder="Write your forum content..."
            className="w-full border px-4 py-2 rounded focus:outline-primary"
          ></textarea>
        </div>

        {/* Photo Upload */}
        {/* <div>
          <label className="block font-semibold mb-1">Photo</label>
          <input
            type="file"
            accept="image/*"
            {...register("photo", { required: true })}
            onChange={(e) =>
              setImagePreview(URL.createObjectURL(e.target.files[0]))
            }
            className="w-full border px-4 py-2 rounded file:mr-4 file:rounded-full file:border-0 file:bg-primary/10 file:px-4 file:py-2 file:text-sm file:font-semibold hover:file:bg-primary/20"
          />
          
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-4 rounded shadow w-40"
            />
          )}
        </div> */}

           <div className="mb-1 flex items-center gap-3 sm:mb-2">
                {profilePic && (
                  <img
                    className="mt-4 rounded shadow w-40"
                    src={profilePic}
                   alt="Preview"
                  />
                )}

                <div>
                <label className="block font-semibold mb-1">Photo</label>

                  <input
                    placeholder="Picture"
                    onChange={handleImgUpload}
                    type="file"
                    className="file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold  hover:file:bg-violet-100 file:text-primary  flex-grow w-full h-12 px-4 transition duration-200 bg-white  rounded  appearance-none focus:border-deep-purple-accent-400   "
                  />
                </div>
              </div>

        {/* Submit Button */}
        <div className="text-center">
          <button type="submit">
            <a className="relative inline-block mt-4 cursor-pointer text-lg group">
              <span className="relative z-10 block md:px-5 px-3 py-2 md:py-2 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-primary rounded-lg group-hover:text-secondary">
                <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-primary group-hover:-rotate-180 ease"></span>
                <span className="relative font-title text-sm md:text-[16px] flex items-center gap-2 ">
                  {" "}
                  Add Forum
                </span>
              </span>
              <span className="absolute bottom-0 right-0 w-full h-10 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-primary rounded-lg group-hover:mb-0 group-hover:mr-0" />
            </a>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddForum;
