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
      {slots.length < 1 && <p className="text-red-500">No slots are currently available for this trainer.</p>}
      {slots?.map((slot) => (
        <div  key={slot._id}>
          {
            slot.BookedBy === 'N/A' ? <h3  onClick={() => handleBooked(slot)}        
          className="w-50 overflow-x-hidden cursor-pointer  bg-primary text-center mb-2  text-white p-2"
        >
          {slot.slotName}
        </h3> : <h3          
          className="w-50 overflow-x-hidden cursor-not-allowed text-sm bg-red-500 text-center mb-2  text-white p-2"
        > {slot.slotName} <br />
          <span className="text-[12px]">Slot Already Booked</span>
        </h3>
          }

        </div>
      ))}
    </div>
  );
};

export default AvailableSlots;
