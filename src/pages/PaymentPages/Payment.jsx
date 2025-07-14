import React from "react";
import useUserInfo from "../../hooks/useUserInfo";
import { Link, useLocation } from "react-router";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import emptyImg from '../../assets/svg/Empty-cuate.svg'
import { GoArrowLeft } from "react-icons/go";

const stripePromise = loadStripe(import.meta.env.VITE_payment_Key)

const Payment = () => {
  const { userInfo } = useUserInfo();
  const location = useLocation();
  const { trainer, selectedSlot, selectedPackage, bookingDate } =
    location.state || {};

      if (!trainer || !selectedSlot || !selectedPackage || !bookingDate) {
  return <div className="text-center h-screen flex flex-col items-center justify-center " >
    <img className="w-96" src={emptyImg} alt="empty Img" />
    <h2 className="text-2xl lg:text-3xl text-primary font-title" >Invalid access! Please select a package first.</h2>
     <Link to="/">
            <a className="relative  mt-5 inline-block text-lg group">
              <span className="relative z-10 block md:px-5 px-3 py-2 md:py-2 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-primary rounded-lg group-hover:text-secondary">
                <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-primary group-hover:-rotate-180 ease"></span>
                <span className="relative text-sm font-title  md:text-[16px] flex items-center gap-2 ">
                  {" "}
                  <GoArrowLeft size={20} /> Back To Home
                </span>
              </span>
              <span className="absolute bottom-0 right-0 w-full h-10 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-primary rounded-lg group-hover:mb-0 group-hover:mr-0" />
            </a>
          </Link>
  </div>
}

  return (
    <div className="lg:w-10/12 mx-auto min-h-screen w-11/12 py-10">
      <h1 className="text-center lg:text-5xl text-3xl font-title font-bold text-primary">
        Payment Details
      </h1>
      <div className="lg:w-9/12  mx-auto my-10 bg-secondary border-2 border-primary rounded-xl lg:my-16">
        <table className="w-full text-left table-auto border-collapse">
          <tbody>
            <tr className="border-b border-primary/30">
              <td className="font-bold py-3 px-4 text-primary">
                Trainer Name:
              </td>
              <td className="py-3 px-4">{trainer.name}</td>
            </tr>
            <tr className="border-b border-primary/30">
              <td className="font-bold py-3 px-4 text-primary">Slot Name:</td>
              <td className="py-3 px-4">{selectedSlot?.slotName}</td>
            </tr>
            <tr className="border-b border-primary/30">
              <td className="font-bold py-3 px-4 text-primary">
                Package Name:
              </td>
              <td className="py-3 px-4">{selectedPackage?.name}</td>
            </tr>
            <tr className="border-b border-primary/30">
              <td className="font-bold py-3 px-4 text-primary">
                Package Price:
              </td>
              <td className="py-3 px-4">{selectedPackage?.price}$</td>
            </tr>
            <tr className="border-b border-primary/30">
              <td className="font-bold py-3 px-4 text-primary">Your Name:</td>
              <td className="py-3 px-4">{userInfo?.name}</td>
            </tr>
            <tr className="border-b border-primary/30">
              <td className="font-bold py-3 px-4 text-primary">Your Email:</td>
              <td className="py-3 px-4">{userInfo?.email}</td>
            </tr>
            <tr>
              <td className="font-bold py-3 px-4 text-primary">Order Date:</td>
              <td className="py-3 px-4">{bookingDate}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* payment card */}

      <div>
        <Elements stripe={stripePromise} >
            <PaymentForm paymentInfo={selectedPackage} trainerInfo={trainer} userInfo={userInfo} slotInfo={selectedSlot}  ></PaymentForm>
        </Elements>
        

      </div>
    </div>
  );
};

export default Payment;
