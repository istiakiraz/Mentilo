import React, { useState } from "react";
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";
import { useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const CommunityCard = ({ forum }) => {

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

    const axiosSecure = useAxiosSecure();
     const queryClient = useQueryClient();
     const {user} = useAuth()

  const [isOpen, setIsOpen] = useState(false);
  const {
    title,
    content,
    photo,
    userName,
    userPhoto,
    like,
    Dislike,
    date,
    userRole
  } = forum;

    const handleLike = async () => {
        if(!user){
            return  Toast.fire({
          icon: "error",
          title: `Please log in to like this post.`,
          background: "#f9f6fc",
          iconColor: "#432365",
        });
        }

    await axiosSecure.patch(`/forum/like/${forum._id}`);
    queryClient.invalidateQueries(["forums"]);
  };

  const handleDislike = async () => {
     if(!user){
            return  Toast.fire({
          icon: "error",
          title: `Please log in to dislike this post.`,
          background: "#f9f6fc",
          iconColor: "#432365",
        });
        }
    await axiosSecure.patch(`/forum/dislike/${forum._id}`);
    queryClient.invalidateQueries(["forums"]);
  };

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden transition hover:shadow-2xl duration-300 flex flex-col">
        <img
          src={photo}
          alt="forum thumbnail"
          className="h-48 w-full object-cover"
        />

        <div className="p-5 flex flex-col justify-between flex-grow">
          {/* Title */}
          <h2 className="text-xl font-bold font-title text-primary mb-2">
            {title}
          </h2>

          {/* User info */}
          <div className="flex items-start gap-3 mb-4">
            <img
              src={userPhoto}
              alt="user"
              className="w-10 border-2 border-primary h-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-semibold">{userName}</p>
              <p className="text-xs text-gray-400">
                {new Date(date).toLocaleDateString()}
              </p>
            </div>
            <p className="first-letter:uppercase text-sm bg-primary/20 px-2 text-primary font-thin font-title rounded-2xl" >{userRole}</p>
          </div>

          {/* Content preview */}
          <p className="text-gray-700 line-clamp-3 mb-4">{content}</p>

          {/* Actions */}
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <span onClick={handleLike} className="flex cursor-pointer items-center gap-1">
                <FaRegThumbsUp /> {like}
              </span>
              <span onClick={handleDislike} className="flex cursor-pointer items-center gap-1">
                <FaRegThumbsDown /> {Dislike}
              </span>
            </div>

            <button
              onClick={() => setIsOpen(true)}
              className="text-sm px-4 py-1 rounded-full cursor-pointer bg-primary text-white hover:bg-primary/80 transition"
            >
              Read More
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-primary text-xl"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold font-title overflow-x-hidden text-primary mb-4">
              {title}
            </h2>
            <p className="text-gray-700 overflow-x-hidden whitespace-pre-line">{content}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default CommunityCard;