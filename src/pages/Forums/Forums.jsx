import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import AllForumCard from "./AllForumCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ForumCardSkeleton from "./LaodingCard/ForumCardSkeleton";

const Forums = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const limit = 6;

  const { data, isLoading } = useQuery({
    queryKey: ["forums", page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/forum?page=${page}&limit=${limit}`);
      return res.data;
    },
    keepPreviousData: true,
  });

 

  // Handle safely even if data is not ready
  const forums = data?.forums || [];
  const totalPages = Math.ceil((data?.total || 0) / limit);

  if (isLoading) {
    return (
      <>
       <h1 className="text-center lg:text-5xl mt-10 text-3xl font-title font-bold text-primary">
        All Forum Posts
      </h1>
      
      <div className="flex flex-wrap 2xl:w-9/12 lg:w-11/12 mx-auto my-10 justify-center gap-6">
      {[...Array(6)].map((_, index) => (
        <ForumCardSkeleton key={index} />
      ))}
    </div>
      </>
    );
  }

  return (
    <div className="lg:w-10/12 mx-auto min-h-screen w-11/12 py-10">
      <h1 className="text-center lg:text-5xl text-3xl font-title font-bold text-primary">
        All Forum Posts
      </h1>

      <div className="grid lg:grid-cols-3 my-8 2xl:w-10/12 mx-auto md:grid-cols-2 grid-cols-1 gap-6">
        {forums.map((forum) => (
          <AllForumCard forum={forum} key={forum._id} />
        ))}
      </div>

      {/* Pagination Buttons */}
      <div className="flex justify-center gap-2 mt-10">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-4 py-2 border font-title font-bold cursor-pointer rounded ${
              page === i + 1
                ? "bg-primary text-white"
                : "bg-white hover:bg-primary/50 duration-200 border-primary text-primary"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Forums;
