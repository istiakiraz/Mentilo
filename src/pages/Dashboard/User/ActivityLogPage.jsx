import React, { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import FeedbackModal from "./FeedbackModal";
import Swal from "sweetalert2";
import svg1 from '../../../assets/svg/Waiting-amico.svg'
import svg2 from '../../../assets/svg/Trainingathome-cuate.svg'
import { Link } from "react-router";

const ActivityLogPage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedFeedback, setSelectedFeedback] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: trainerApplications = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["trainerApplications", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/trainers?email=${user?.email}`);
      return res.data;
    },
  });

  const openModal = (feedback) => {
    setSelectedFeedback(feedback);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFeedback("");
  };

  if (isLoading) {
    return <div className="text-center text-primary py-10 text-xl">Loading...</div>;
  }

  const handleDeleteClick = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to undo this action!",
      icon: "warning",
      showCancelButton: true,
      iconColor: "#432365",
      confirmButtonColor: "#e11d48", 
      cancelButtonColor: "#6b7280", 
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
        background: "#f9f6fc",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/trainers/${id}`);
          // console.log();
          if (res.data.message === "Deleted successfully") {
             
            refetch();
            Swal.fire(
              "Deleted!",
              "Your application has been deleted.",
              "success"
            );
          }
        } catch (err) {
          // console.error(err);
          Swal.fire("Error", "Something went wrong.", "error");
        }
      }
    });
  };

  return (
    <div className=" mx-auto relative  py-10">
      <h2 className="text-3xl lg:text-5xl font-title font-bold text-center mb-6 text-primary">
        Trainer Application Status
      </h2>

      {trainerApplications.length === 0 ? (
        <>
        <div className="text-center text-gray-600 text-lg mt-5">
          😕 You haven’t submitted any trainer application yet.
        </div>
        <div className="w-fit mx-auto" >
            <Link to='/be-a-trainer' >
            <a className="relative inline-block mt-5 cursor-pointer text-lg group">
              <span className="relative z-10 block md:px-5 px-3 py-2 md:py-2 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-primary rounded-lg group-hover:text-secondary">
                <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-primary group-hover:-rotate-180 ease"></span>
                <span className="relative font-title text-sm md:text-[16px] flex items-center gap-2 ">
                  {" "}
                  Become a Trainer
                </span>
              </span>
              <span className="absolute bottom-0 right-0 w-full h-10 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-primary rounded-lg group-hover:mb-0 group-hover:mr-0" />
            </a>
          </Link>
        </div>
        <img className="w-[600px] -mt-10 mx-auto" src={svg2} alt="" />
        </>
      ) : (
      <>
        <div className="overflow-x-auto relative z-20   rounded-xl">
          <table className="min-w-full bg-white border z-20  border-gray-200 rounded-md shadow-md">
            <thead>
              <tr className="bg-primary/40 text-left">
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Applied At</th>
                <th className="py-3 px-4 text-center">Admin Feedback</th>
                <th className="py-3 px-4 ">Delete Application</th>
              </tr>
            </thead>
            <tbody >
              {trainerApplications.map((app, index) => (
                <tr key={app._id} className="border-t">
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{app.name}</td>
                  <td className="py-3 px-4 capitalize font-medium">
                    {app.status === "pending" && (
                      <span className="text-yellow-600">Pending</span>
                    )}
                    {app.status === "approved" && (
                      <span className="text-green-600">Approved</span>
                    )}
                    {app.status === "rejected" && (
                      <span className="text-red-600">Rejected</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {app.createdAt
                      ? new Date(app.createdAt).toLocaleString("en-BD", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })
                      : "N/A"}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {app.status === "rejected" && (
                      <button
                        onClick={() =>
                          openModal(app.feedback || "No feedback provided.")
                        }
                        title="View Feedback"
                      >
                        <AiFillEye
                          size={25}
                          className="inline text-primary hover:text-minor duration-200 cursor-pointer text-xl"
                        />
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteClick(app._id)}
                      className="ml-3 text-minor font-title px-2 font-thin border border-red-400 text-[16px] rounded-xl bg-red-200  hover:bg-red-300 duration-200 cursor-pointer"
                      title="Delete Application"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

            

        </div>

         <div  className="flex  items-center  justify-center md:w-full md:mx-auto mt-6 px-2  ">
                 <img className="w-[600px] absolute z-10 top-60 opacity-55  " src={svg1} alt="" />
             </div>
      </>

        
      )}

      {/* Modal */}
      {isModalOpen && (
        <FeedbackModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          feedback={selectedFeedback}
        />

      )}
    </div>
  );
};

export default ActivityLogPage;
