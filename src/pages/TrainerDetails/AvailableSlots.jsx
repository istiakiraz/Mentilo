import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";

const AvailableSlots = ({ trainer }) => {
//   console.log(email);

  const axiosSecure = useAxiosSecure();

  const navigate = useNavigate()

  


  // Get assigned classes
  const { data: slots = [] } = useQuery({
    queryKey: ["slotsList", trainer?.email],
    enabled: !!trainer?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`slots?email=${trainer?.email}`);
      return res.data;
    },
  });

  const handleBooked = (selectedSlot) =>{

  //  const trainerList = {
  //       trainerEmail: trainer.email
  //   };


    navigate('/booked-trainer' , {
        state: {
            trainer,
            selectedSlot
        }
    })

  }


  return (
    <div>
      {slots.length < 1 && <p>Trainer has no slot.</p>}
      {slots?.map((slot) => (
        <h3  onClick={() => handleBooked(slot)}
          key={slot._id}
          className="w-50 overflow-x-hidden cursor-pointer  bg-primary text-center mb-2  text-white p-2"
        >
          {slot.slotName}
        </h3>
      ))}
    </div>
  );
};

export default AvailableSlots;
