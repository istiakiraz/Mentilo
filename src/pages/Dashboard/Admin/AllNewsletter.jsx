import React from "react";

import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllNewsletter = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: newsletters = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["newsletters"],
    queryFn: async () => {
      const res = await axiosSecure.get("/newsletter");
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This email will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#432365",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/newsletter/${id}`);
        Swal.fire("Deleted!", "Email has been removed.", "success");
        refetch();
      } catch (error) {
        Swal.fire("Error", "Something went wrong!", "error");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="text-center text-primary min-h-screen text-xl py-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="  mx-auto py-10 min-h-screen">
      <h1 className="text-center lg:text-5xl text-3xl font-title font-bold text-primary mb-6">
        All Newsletter Subscribers
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-primary rounded-xl overflow-hidden text-left">
          <thead className="bg-primary text-white">
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Delete</th>
            </tr>
          </thead>
          <tbody>
            {newsletters.map((newsletter, index) => (
              <tr key={newsletter._id} className="border-b border-gray-200">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{newsletter.email}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleDelete(newsletter._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {newsletters.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center py-6 text-gray-500">
                  No subscribers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllNewsletter;
