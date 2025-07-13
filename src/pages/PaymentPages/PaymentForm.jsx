import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PaymentForm = ({ paymentInfo, trainerInfo, slotInfo, userInfo }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();

  const [error, setError] = useState("");

  const amount = paymentInfo?.price;
  const amountInCents = amount * 100;
   const bookingDate = new Date().toLocaleDateString();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    //step -1 : card ok ??

    if (!card) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      setError("");

      console.log("payment", paymentMethod);
      // step-02: create payment intent
      const res = await axiosSecure.post("/create-payment-intent", {
        amountInCents,
      });

      const clientSecret = res.data.clientSecret;

      // STEP-03 : confirm payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: userInfo.name,
            email: userInfo.email,
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        setError("");
        if (result.paymentIntent.status === "succeeded") {
          alert("payment ok");
          console.log(result);

          // step-4 : add a new collection in database

          const bookingData = {
            BookedBy : userInfo.name,
            bookingEmail : userInfo.email,
            price: amount,
            packageName : paymentInfo.value,
            bookingDate,
            trainerName : trainerInfo.name,
            trainerEmail : trainerInfo.email,
            slotName : slotInfo.slotName,
            days: slotInfo.availableDays,
            classes : trainerInfo.skills,
            transactionId: result.paymentIntent.id,
               paymentMethod: result.paymentIntent,
               slotId: slotInfo._id
          };

          const bookingRes = await axiosSecure.post('/booking' , bookingData)

          console.log(bookingRes);

          console.log( 'bookingData', bookingData);
        }

        console.log("res from intent", res);
      }
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 mt-6 bg-white p-6 rounded-xl shadow-md w-10/12 lg:w-6/12 mx-auto "
      >
        <CardElement className="p-2 border rounded"></CardElement>

        <button
          className="bg-primary w-full cursor-pointer hover:bg-primary/80 duration-200 text-white px-4 py-1 rounded"
          type="submit"
          disabled={!stripe}
        >
          Pay ${amount}
        </button>

        {error && <p className="text-red-500 text-center">{error}</p>}
      </form>
      <h1>{trainerInfo.name}</h1>
    </div>
  );
};

export default PaymentForm;
