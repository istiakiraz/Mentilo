import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AppliedTrainer = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const { data: trainers = [], refetch } = useQuery({
    queryKey: ["pendingTrainers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/trainers?status=pending");
      return res.data;
    },
  });

  // Approve trainer
  const handleApprove = async (id , email) => {

    const  status = "approved";

    try {
      const res = await axiosSecure.patch(`/trainers/approve/${id}` , {
         status,
         email
        });
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          icon: "success",
          title: "Trainer has been approved.",
          iconColor: "#432365",
          confirmButtonColor: "#432365",
          background: "#f9f6fc",
        });
      }
    } catch (err) {
      // console.error(err);
    }
  };

  // Reject trainer
  const handleReject = async (id) => {
    const { value: feedback } = await Swal.fire({
      title: "Reject Trainer",
      input: "textarea",
      inputLabel: "Provide rejection feedback",
      inputPlaceholder: "Type your reason here...",
      inputAttributes: {
        "aria-label": "Feedback reason",
      },
      showCancelButton: true,
      confirmButtonText: "Submit",
      background: "#f9f6fc",
      confirmButtonColor: '#432365'
    });

    if (feedback) {
      try {
        const res = await axiosSecure.patch(`/trainers/reject/${id}`, {
          feedback,
        });
        if (res.data.modifiedCount > 0) {
          refetch();
           Swal.fire({
          icon: "success",
          title: "Trainer has been rejected.",
          iconColor: "#432365",
          confirmButtonColor: "#432365",
          background: "#f9f6fc",
        });
        }
      } catch (err) {
        // console.error(err);
        Swal.fire("Error", "Something went wrong.", "error");
      }
    }
  };

  return (
    <div className="py-10 lg:px-4">
      <h2 className="text-3xl lg:text-5xl font-title font-bold text-center mb-6 text-primary">
        Pending Trainer Applications
      </h2>

      {trainers.length === 0 ? (
        <p className="text-center text-gray-500">No pending trainer applications.</p>
      ) : (
        <div className="overflow-x-auto shadow-md rounded">
          <table className="min-w-full text-sm text-left bg-white border-primary border-2">
            <thead className="bg-primary/40 text-black font-semibold">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Skills</th>
                <th className="px-4 py-3">Applied</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {trainers.map((trainer, index) => (
                <tr key={trainer._id} className="border-t">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{trainer.name}</td>
                  <td className="px-4 py-2">{trainer.email}</td>
                  <td className="px-4 py-2">{trainer.skills?.join(", ")}</td>
                  <td className="px-4 py-2">
                    {new Date(trainer.createdAt).toLocaleDateString("en-BD", {
                      dateStyle: "medium",
                    })}
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      onClick={() => handleApprove(trainer?._id , trainer?.email)}
                      className="bg-primary hover:bg-minor font-title duration-300 cursor-pointer text-white px-3 py-1 rounded-md text-sm"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => {
                        setSelectedTrainer(trainer);
                        setShowDetailsModal(true);
                      }}
                      className="bg-[#918a9b] hover:bg-[#544a63] font-title duration-300 cursor-pointer  text-white px-3 py-1 rounded-md text-sm"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => handleReject(trainer?._id)}
                      className="bg-red-500 hover:bg-red-600 font-title duration-300 cursor-pointer text-white px-3 py-1 rounded-md text-sm"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showDetailsModal && selectedTrainer && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-xl">
            <h3 className="text-xl font-bold mb-3 text-primary">Trainer Details</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li><strong>Name:</strong> {selectedTrainer.name}</li>
              <li><strong>Email:</strong> {selectedTrainer.email}</li>
              <li><strong>Age:</strong> {selectedTrainer.age}</li>
              <li><strong>Experience:</strong> {selectedTrainer.experience} years</li>
              <li><strong>Skills:</strong> {selectedTrainer.skills?.join(", ")}</li>
              <li><strong>Available Days:</strong> {selectedTrainer.availableDays?.join(", ")}</li>
              <li><strong>Available Time:</strong> {selectedTrainer.availableTime?.join(", ")}</li>
              <li><strong>Other Info:</strong> {selectedTrainer.otherInfo}</li>
              <li><strong>Applied On:</strong> {new Date(selectedTrainer.createdAt).toLocaleString()}</li>
            </ul>
            <div className="text-right mt-5">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="px-4 py-1 text-sm rounded bg-primary text-white hover:bg-primary/90"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppliedTrainer;
