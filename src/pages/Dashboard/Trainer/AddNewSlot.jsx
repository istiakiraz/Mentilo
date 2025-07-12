import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const AddNewSlot = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // 1. Get trainer info by email
  const { data: trainer = {}, isLoading } = useQuery({
    queryKey: ["trainerByEmail", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/trainers?email=${user?.email}`);
      return res.data[0]; // assuming it returns an array
    },
  });

  const { data: myClasses = [], refetch } = useQuery({
  queryKey: ["trainerClasses", user?.email],
  enabled: !!user?.email,
  queryFn: async () => {
    const res = await axiosSecure.get(`/classes/trainer?email=${user?.email}`);
    return res.data;
  },
});

console.log(myClasses);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    
  } = useForm();

  const onSubmit = async (data) => {
    const slotData = {
      trainerEmail: user?.email,
      slotName: data.slotName,
      BookedBy : 'N/A',
      packageName : 'N/A',
      availableDays: data.availableDays, // array
    };

    console.log(slotData);

    try {
      const res = await axiosSecure.post("/slots", slotData);
      if (res.data.insertedId) {
        Swal.fire("Success", "Slot added successfully!", "success");
        // reset();
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  if (isLoading) return <p className="text-center py-10">Loading trainer info...</p>;

  // Handle delete (remove trainer from class)
  const handleRemove = async (classId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You’ll be removed from this class!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, remove me",
      background: "#f9f6fc",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(
            `/classes/remove-trainer-from-class/${classId}`,
            { email: user?.email }
          );
          if (res.data.modifiedCount > 0) {
            Swal.fire("Removed!", "You have been removed from this class.", "success");
            refetch();
          } else {
            Swal.fire("Error", "No changes were made.", "error");
          }
        } catch (error) {
          console.error("Error removing trainer:", error);
          Swal.fire("Error", "Something went wrong.", "error");
        }
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      {/* 1st Part: Trainer Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <div className="border border-primary rounded-xl p-4 shadow">
          <img
            src={trainer.photo}
            alt={trainer.name}
            className="w-40 h-40 object-cover rounded-full mx-auto mb-4 border-4 border-primary"
          />
          <h2 className="text-2xl font-bold text-primary text-center mb-2">{trainer.name}</h2>
          <p className="text-center text-gray-600 mb-1">Age: {trainer.age}</p>
          <p className="text-center text-gray-600 mb-1">Experience: {trainer.experience} years</p>
          <p className="text-center text-gray-600 mb-2">Email: {trainer.email}</p>
          <p className="text-center text-gray-600 text-sm">{trainer.otherInfo}</p>
          <div className="mt-4 text-center">
            <p className="text-sm"><strong>Skills:</strong> {trainer.skills?.join(", ")}</p>
            <p className="text-sm"><strong>Available Days:</strong> {trainer.availableDays?.join(", ")}</p>
            <p className="text-sm"><strong>Available Time:</strong> {trainer.availableTime?.join(", ")}</p>
            <div className="flex justify-center gap-4 mt-3">
              <a href={trainer.facebook} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                Facebook
              </a>
              <a href={trainer.instagram} target="_blank" rel="noreferrer" className="text-pink-600 underline">
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* 2nd Part: Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border border-primary rounded-xl p-6 shadow bg-white"
        >
          <h3 className="text-xl font-bold text-primary mb-4 text-center">Add New Slot</h3>

          {/* Slot Name */}
          <div className="mb-4">
            <label className="block font-semibold mb-1">Slot Name</label>
            <input
              {...register("slotName", { required: true })}
              className="w-full border px-4 py-2 rounded focus:outline-primary"
              placeholder="e.g. Morning (7 AM - 9 AM)"
            />
            {errors.slotName && <p className="text-red-500 text-sm">Slot name is required</p>}
          </div>

          {/* Available Days */}
          <div className="mb-4">
            <label className="block font-semibold mb-1">Available Days</label>
            <div className="grid grid-cols-2 gap-2">
              {trainer.availableDays?.map((day) => (
                <label key={day} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={day}
                    {...register("availableDays", { required: true })}
                  />
                  {day}
                </label>
              ))}
            </div>
            {errors.availableDays && <p className="text-red-500 text-sm">Select at least one day</p>}
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90"
            >
              Add Slot
            </button>
          </div>
        </form>

            {/* 3rd part */}

               <div className="py-10 lg:col-span-2">
      <h2 className="text-3xl font-title font-bold text-primary mb-6 text-center">
        My Assigned Classes
      </h2>
      {myClasses.length === 0 ? (
        <p className="text-center text-gray-500">No classes assigned yet.</p>
      ) : (
        <div className="overflow-x-auto rounded shadow border">
          <table className="min-w-full bg-white text-sm border border-gray-200">
            <thead className="bg-primary/30 text-black font-semibold">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Difficulty</th>
                <th className="px-4 py-2">Exercise Types</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {myClasses.map((cls, index) => (
                <tr key={cls._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{cls.title}</td>
                  <td className="px-4 py-2">{cls.difficulty}</td>
                  <td className="px-4 py-2">{cls.exerciseTypes?.join(", ")}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleRemove(cls._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                    >
                      Remove Me
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
      </div>
    </div>
  );
};

export default AddNewSlot;
