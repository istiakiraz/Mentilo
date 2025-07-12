import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AvailableSlots = ({ email }) => {
  console.log(email);

  const axiosSecure = useAxiosSecure();

  // Get assigned classes
  const { data: slots = [] } = useQuery({
    queryKey: ["slotsList", email],
    enabled: !!email,
    queryFn: async () => {
      const res = await axiosSecure.get(`slots?email=${email}`);
      return res.data;
    },
  });

  return (
    <div>
      {slots.length < 1 && <p>Trainer has no slot.</p>}
      {slots.map((slot) => (
        <h4
          key={slot._id}
          className="w-50 overflow-x-hidden cursor-pointer  bg-primary text-center mb-2  text-white p-2"
        >
          {slot.slotName}
        </h4>
      ))}
    </div>
  );
};

export default AvailableSlots;
