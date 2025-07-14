import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import SwiperNav from "./SwiperNav";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaStar, FaRegStar } from "react-icons/fa";

const ReviewSection = () => {
  const axiosSecure = useAxiosSecure();
  const [activeIndex, setActiveIndex] = useState(0);

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["newsletters"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reviews");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="text-center text-primary min-h-screen text-xl py-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="py-16 w-11/12 relative mx-auto lg:w-full mb-16">
      <Swiper
        centeredSlides={true}
        loop={true}
        pagination={{ el: ".swiper-pagination", clickable: true }}
        navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 3, spaceBetween: 20 },
          1024: { slidesPerView: 4.3, spaceBetween: 30 },
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper  "
      >
        {reviews.map((review, idx) => {
          const total = reviews.length;
          const left2 = (activeIndex - 2 + total) % total;
          const left1 = (activeIndex - 1 + total) % total;
          const right1 = (activeIndex + 1) % total;
          const right2 = (activeIndex + 2) % total;

          let y = 70;
          let opacity = 0.3;

          if (idx === activeIndex) {
            y = 0;
            opacity = 1;
          } else if (idx === left1 || idx === right1) {
            y = 50;
            opacity = 0.3;
          } else if (idx === left2 || idx === right2) {
            y = 80;
            opacity = 0.2;
          }

          return (
            <SwiperSlide key={idx} className="flex justify-center">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity, y }}
                transition={{ duration: 0.6 }}
                className={`bg-secondary/50 cursor-grab rounded-2xl p-6 mb-16 shadow-md flex flex-col justify-between text-center w-full h-full`}
              >
                <div>
                  <div className="text-4xl text-secondary font-bold mb-4">
                    “
                  </div>
                  <p className="text-gray-700 overflow-x-hidden mb-6 text-sm md:text-base px-4">
                    {review.reviewText}
                  </p>
                  <hr className="border-dashed border-gray-300 mb-6 w-1/2 mx-auto" />
                  <div className="flex items-center justify-center gap-4">
                    <img
                      className="h-12 w-12 object-cover rounded-full bg-gray-100"
                      src={review.userPhoto}
                      alt={review.userName}
                    />
                    <div className="text-left">
                      <h4 className="text-base font-semibold text-neutral">
                        {review.userName}
                      </h4>

                      {/* Star Rating */}
                      <p className="flex items-center mb-2">
                        {[...Array(5)].map((_, index) =>
                          index < review.rating ? (
                            <FaStar key={index} className="text-primary" />
                          ) : (
                            <FaRegStar key={index} className="text-gray-300" />
                          )
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          );
        })}

        {/* Pagination Below Swiper */}
        <div className="flex justify-center space-x-2  ">
          <div className="swiper-pagination !static " />
        </div>

        {/* Custom Controls */}

        <SwiperNav></SwiperNav>
      </Swiper>
    </div>
  );
};

export default ReviewSection;
