import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaStar } from "react-icons/fa";
import useUserInfo from "../../../hooks/useUserInfo";

const BookedTrainerPage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const { userInfo } = useUserInfo();

  const { data: bookings = [] } = useQuery({
    queryKey: ["userBookings", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/booking?email=${user.email}`);
      return res.data;
    },
  });

  const openModal = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setReviewText("");
    setRating(0);
  };

 

  const handleSubmitReview = async () => {

     if (!reviewText || rating === 0) {
  return Swal.fire("Error", "Please provide both text and rating!", "warning");
}

    const reviewData = {
      rating,
      reviewText,
      userName: userInfo.name,
      userEmail: userInfo.email,
      userPhoto: userInfo.photo,
      createdAt: new Date(),
    };

    console.log(reviewData);

    try {
      const res = await axiosSecure.post("/reviews", reviewData);
      if (res.data.insertedId) {
        Swal.fire("Success", "Review submitted!", "success");
        closeModal();
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to submit review", "error");
    }
  };

  return (
    <div className="lg:w-11/12  mx-auto py-10">
      <h1 className="text-4xl lg:text-5xl font-title text-center font-bold text-primary mb-6">
        Your Trainer Bookings
      </h1>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white p-6 rounded-xl shadow-[8px_8px_0px_0px_#432365] border grid grid-cols-1 lg:grid-cols-2 gap-3"
            >
              {/* Trainer Info */}
              <div>
                <h3 className="text-lg font-bold text-primary mb-1">
                  👨‍🏫 Trainer Info
                </h3>
                <p>Name: {booking.trainerName}</p>
                <p>Email: {booking.trainerEmail}</p>
              </div>

              {/* Other Info */}
              <div>
                <h3 className="text-lg font-bold text-primary mb-1">
                  📦 Other Info
                </h3>
                <p>Package: {booking.packageName}</p>
                <p>Price: ${booking.price}</p>
                <p>Date: {new Date(booking.bookingDate).toLocaleDateString()}</p>
                <p className="text-sm text-gray-500">
                  Transaction ID: {booking.transactionId}
                </p>
              </div>

              <div className="space-y-4 lg:-mt-14">
                {/* Classes Info */}
                <div>
                  <h3 className="text-lg font-bold text-primary mb-1">
                    🏋️ Classes Info
                  </h3>
                  <p>{booking.classes.join(", ")}</p>
                </div>

                {/* Slot Info */}
                <div>
                  <h3 className="text-lg font-bold text-primary mb-1">
                    ⏰ Slot Info
                  </h3>
                  <p>Slot: {booking.slotName}</p>
                  <p>Days: {booking.days.join(", ")}</p>
                </div>
              </div>

              {/* Review Button */}
              <div className="text-center lg:col-span-2 mt-3">
                <button
                  onClick={() => openModal(booking)}
                  
                >
                  
                  <a className="relative inline-block mt-4 cursor-pointer text-lg group">
              <span className="relative z-10 block md:px-5 px-3 py-2 md:py-2 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-primary rounded-lg group-hover:text-secondary">
                <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-primary group-hover:-rotate-180 ease"></span>
                <span className="relative font-title text-sm md:text-[16px] flex items-center gap-2 ">
                  {" "}
                 ✏️ Leave a Review
                </span>
              </span>
              <span className="absolute bottom-0 right-0 w-full h-10 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-primary rounded-lg group-hover:mb-0 group-hover:mr-0" />
            </a>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[95%] max-w-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-primary">
              ✍️ Submit Your Review
            </h3>
            <textarea
              className="w-full border p-2 rounded mb-3"
              rows={4}
              placeholder="Write your feedback here... (max 220 characters)"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
            <div className="flex gap-2 items-center mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`cursor-pointer text-2xl ${
                    rating >= star ? "text-yellow-400" : "text-gray-300"
                  }`}
                  onClick={() => setRating(star)}
                />
              ))}
              <span className="text-sm font-semibold text-gray-600">
                {rating} Star{rating > 1 && "s"}
              </span>
            </div>
            <div className="text-right">
              <button
                onClick={handleSubmitReview}
                className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
              >
                Submit Review
              </button>
              <button
                onClick={closeModal}
                className="ml-3 text-gray-600 hover:text-primary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookedTrainerPage;
