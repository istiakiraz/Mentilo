

import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useUserInfo from "../../../hooks/useUserInfo";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import axios from "axios";

const ProfilePage = () => {
  const { user } = useAuth();
  const { userInfo, userInfoLoading, refetch } = useUserInfo();
  const axiosSecure = useAxiosSecure();
    const [profilePic, setProfilePic] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState("");

  if (userInfoLoading) {
    return <p className="h-screen">Loading user info...</p>;
  }

  const openEditModal = () => {
    setNewName(userInfo?.name || "");
    setProfilePic(userInfo?.photo || "");
    setIsModalOpen(true);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosSecure.patch(`/users/${user?.email}`, {
        name: newName,
        photo: profilePic,
      });

      if (res.data.modifiedCount > 0) {
         Swal.fire({
          icon: "success",
          title: "Updated!",
           text: "Profile updated successfully.",
          iconColor: "#432365",
          confirmButtonColor: "#432365",
          background: "#f9f6fc",
        });
        refetch();
      } else {
        Swal.fire("No Change", "Nothing was updated.", "info");
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Something went wrong.", "error");
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
    <div>
      <h1 className="text-center font-title text-3xl lg:text-5xl font-bold text-primary mt-10">
        Your Profile
      </h1>
      <p className="lg:w-8/12 mx-auto text-center mt-4 text-gray-500">
        Welcome to your Mentilo profile — manage your personal information,
        update your availability, and track your training journey.
      </p>

      {user && (
        <div className="lg:w-11/12 mx-auto flex flex-col justify-center items-center mt-10">
          <img
            className="size-40 object-cover rounded-full shadow-[0px_30px_40px_0px_rgba(0,0,0,0.1),0px_0px_20px_0px_rgba(0,0,0,0.1),0px_-10px_10px_0px_rgba(255,255,255,0.2)] border-2 border-primary"
            src={userInfo?.photo}
            alt={userInfo?.name}
          />

          <div className="mt-8 bg-primary/30 p-6 lg:px-25 shadow-[5px_5px_0px_0px_#432365] rounded-2xl text-center">
            <p className="text-3xl font-title font-semibold mb-2 text-minor">
              Your Name :
              <span className="uppercase ml-2 hover:underline">{userInfo?.name}</span>
            </p>
            <p className="uppercase bg-secondary font-title mb-2 text-2xl">
              Role : {userInfo?.role}
            </p>
            <p className="text-xl font-semibold text-minor">
              Your Email : {userInfo?.email}
            </p>
            <p className="text-xl mt-2 font-semibold text-minor">
              Last Login Status :
              {userInfo?.last_log_at
                ? new Date(userInfo?.last_log_at).toLocaleString("en-BD", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })
                : "N/A"}
            </p>

            {/* Edit Button */}
            <button
              onClick={openEditModal}
              
            >
                <a className="relative inline-block mt-4 cursor-pointer text-lg group">
              <span className="relative z-10 block md:px-5 px-3 py-2 md:py-2 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-primary rounded-lg group-hover:text-secondary">
                <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-primary group-hover:-rotate-180 ease"></span>
                <span className="relative font-title text-sm md:text-[16px] flex items-center gap-2 ">
                  {" "}
                 ✏️ Edit Profile
                </span>
              </span>
              <span className="absolute bottom-0 right-0 w-full h-10 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-primary rounded-lg group-hover:mb-0 group-hover:mr-0" />
            </a>
              
            </button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <form
            onSubmit={handleUpdateProfile}
            className="bg-white w-[90%] max-w-lg p-6 rounded-lg shadow-xl"
          >
            <h2 className="text-2xl font-semibold mb-4 text-primary">Edit Your Profile</h2>

            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full px-4 py-2 border rounded mb-4 focus:outline-primary"
              required
            />

            <label className="block text-sm font-medium mb-1"> Upload Photo </label>

                  <input
                    placeholder="Picture"
                    onChange={handleImgUpload}
                    type="file"
                    className="file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold  hover:file:bg-violet-100 file:text-primary  flex-grow w-full h-12 px-4 transition duration-200 bg-white  rounded  appearance-none focus:border-deep-purple-accent-400   "
                  />
       
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
