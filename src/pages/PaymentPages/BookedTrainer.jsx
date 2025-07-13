import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { FaCheck, FaHandPointRight } from "react-icons/fa";
import { FaArrowDownLong } from "react-icons/fa6";

const BookedTrainer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { trainer, selectedSlot } = location.state || {};

  const [selectedPackage, setSelectedPackage] = useState("");
   const bookingDate = new Date().toLocaleDateString();

  const handleJoinNow = () => {
    if (!selectedPackage) return;

    // console.log(selectedPackage);
    // console.log(bookingDate);

    navigate("/payment", {
      state: {
        trainer,
        selectedSlot,
        selectedPackage,
        bookingDate
      },
    });
  };

  const packages = [
    {
      name: "Basic Membership",
      price: 10,
      value: "Basic",
      features: [
        "Access to gym facilities during regular operating hours.",
        "Use of cardio and strength training equipment.",
        "Access to locker rooms and showers.",
      ],
    },
    {
      name: "Standard Membership",
      price: 50,
      value: "Standard",
      features: [
        "All benefits of the basic membership.",
        "Access to group fitness classes such as yoga, spinning, and Zumba.",
        "Use of additional amenities like a sauna or steam room.",
      ],
    },
    {
      name: "Premium Membership",
      price: 100,
      value: "Premium",
      features: [
        "All benefits of the standard membership.",
        "Access to personal training sessions with certified trainers.",
        "Discounts on additional services such as massage or nutrition counseling.",
      ],
    },
  ];

  return (
    <div className="lg:w-10/12 mx-auto min-h-screen w-11/12 py-10">
      <h1 className="text-center lg:text-5xl text-3xl font-title font-bold text-primary">
        Trainer Booking Details
      </h1>
      <p className="lg:w-9/12 text-center text-gray-500 mx-auto w-11/12 my-4 hyphens-auto">
        View all the important details related to your trainer booking. This
        includes session time, selected package, trainer information, and
        available days — everything you need to stay on track with your training
        plan.
      </p>

      {/* Trainer Info */}
      <div className="lg:w-8/12 mx-auto text-center border-2 border-primary bg-secondary p-6 w-11/12 my-6 rounded-xl">
        <h2 className="text-2xl font-title text-primary font-bold">
          Trainer Name: {trainer?.name}
        </h2>
        <p className="lg:text-xl my-2">
          Selected Slot: {selectedSlot?.slotName}
        </p>
        <p className="lg:text-xl my-2">
          Days: {selectedSlot?.availableDays.join(", ")}
        </p>
        <p className="lg:text-xl bg-primary/40 p-2 my-2">
          <span className="font-black">Classes :</span> {trainer?.skills.join(", ")}
        </p>
      </div>

      {/* Packages Cards */}
      <div className="flex flex-col lg:mt-10 items-center justify-center">
        <h1 className="text-center text-2xl lg:text-4xl text-primary font-bold font-title ">
          Packages
        </h1>
        <h3 className="text-center lg:text-2xl mt-2">Select Your Package</h3>

        <div className="mt-4 ">
          <span>
            <FaArrowDownLong size={30} color="#432365" />
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:w-10/12 mx-auto md:grid-cols-3 gap-6 my-10">
        {packages.map((pack) => (
          <div
            key={pack.value}
            onClick={() => setSelectedPackage(pack)}
            className={`cursor-pointer border-2  shadow-[10px_10px_0px_0px_#432365] rounded-xl p-6 py-10 transition-all duration-300 ${
              selectedPackage?.value === pack.value
                ? "border-primary  ring-2 ring-primary bg-primary/10"
                : "border-gray-200  hover:shadow-md"
            }`}
          >
            <h3 className="text-xl lg:text-2xl font-title text-primary font-bold text-center mb-2">
              {pack.name}
            </h3>
            <p className="text-3xl font-bold font-title text-center text-primary">
              {pack.price}$<span className="text-base font-normal">/mo</span>
            </p>
            <ul className="mt-4 space-y-2 text-sm text-gray-700">
              {pack.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <FaCheck color="#432365" className=" mt-1" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Join Now Button */}
      <div className="text-center mt-6">
        <div
          onClick={handleJoinNow}
          className={`relative inline-block mt-4  text-lg group transition-opacity duration-300 ${
            selectedPackage
              ? "opacity-100 cursor-pointer"
              : "opacity-50  cursor-not-allowed "
          }`}
        >
          <span className="relative z-10 block md:px-5 px-3 py-2 md:py-2 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-primary rounded-lg group-hover:text-secondary">
            <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
            <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-primary group-hover:-rotate-180 ease"></span>
            <span className="relative font-title text-sm md:text-[16px] hover:text-white flex items-center gap-2">
              <FaHandPointRight  /> Join Now
            </span>
          </span>
          <span className="absolute bottom-0 right-0 w-full h-10 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-primary rounded-lg group-hover:mb-0 group-hover:mr-0" />
        </div>
      </div>
    </div>
  );
};

export default BookedTrainer;
