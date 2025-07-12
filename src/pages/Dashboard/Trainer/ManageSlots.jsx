import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageSlots = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Load trainer's slots from database
  const { data: slots = [], refetch } = useQuery({
    queryKey: ["trainerSlots", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`slots?email=${user?.email}`);
      return res.data;
    },
  });

  // Delete handler
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This slot will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      background: "#f9f6fc",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/slots/${id}`);
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire("Deleted!", "Slot has been deleted.", "success");
          }
        } catch (error) {
          console.error("Delete error:", error);
          Swal.fire("Error", "Something went wrong", "error");
        }
      }
    });
  };

  return (
    <div className=" mx-auto py-10">
      <h2 className="text-3xl font-title font-bold text-center text-primary mb-6">
        Manage Your Slots
      </h2>

      {slots.length === 0 ? (
        <p className="text-center text-gray-500">No slots found.</p>
      ) : (
        <div className="overflow-x-auto shadow-md rounded">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-primary/20 text-primary">
              <tr>
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">Slot Name</th>
                <th className="px-4 py-3 text-left">Available Days</th>
                <th className="px-4 py-3 text-left">Booked By</th>
                <th className="px-4 py-3 text-left">Package Name</th>
                <th className="px-4 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {slots.map((slot, index) => (
                <tr key={slot._id} className="border-t">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{slot.slotName}</td>
                  <td className="px-4 py-2">{slot.availableDays?.join(", ")}</td>
                  <td className="px-4 py-2">
                    {slot.BookedBy !== "N/A" ? (
                      <span className="text-green-600 font-medium">{slot.BookedBy}</span>
                    ) : (
                      <span className="text-gray-500">Not Booked</span>
                    )}
                  </td>
                  <td className="px-4 py-2">{slot.packageName}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDelete(slot._id)}
                      className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageSlots;
