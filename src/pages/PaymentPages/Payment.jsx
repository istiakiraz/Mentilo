import React from 'react';
import useUserInfo from '../../hooks/useUserInfo';
import { useLocation } from 'react-router';

const Payment = () => {

    const {userInfo} = useUserInfo()
    const location = useLocation()
    const { trainer, selectedSlot ,selectedPackage,
        bookingDate } = location.state || {};

    return (
        <div className="lg:w-10/12 mx-auto min-h-screen w-11/12 py-10">
         
           <h1 className="text-center lg:text-5xl text-3xl font-title font-bold text-primary">
      Payment Details
      </h1>
     <div className="lg:w-9/12  mx-auto my-10 bg-secondary border-2 border-primary rounded-xl lg:my-16">
  <table className="w-full text-left table-auto border-collapse">
    <tbody>
      <tr className="border-b border-primary/30">
        <td className="font-bold py-3 px-4 text-primary">Trainer Name:</td>
        <td className="py-3 px-4">{trainer.name}</td>
      </tr>
      <tr className="border-b border-primary/30">
        <td className="font-bold py-3 px-4 text-primary">Slot Name:</td>
        <td className="py-3 px-4">{selectedSlot?.slotName}</td>
      </tr>
      <tr className="border-b border-primary/30">
        <td className="font-bold py-3 px-4 text-primary">Package Name:</td>
        <td className="py-3 px-4">{selectedPackage?.name}</td>
      </tr>
      <tr className="border-b border-primary/30">
        <td className="font-bold py-3 px-4 text-primary">Package Price:</td>
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

        </div>
    );
};

export default Payment;