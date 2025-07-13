// import React, { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import AllForumCard from "./AllForumCard";
// import useAxiosSecure from "../../hooks/useAxiosSecure";

// const Forums = () => {
//   const axiosSecure = useAxiosSecure();
//   const [page, setPage] = useState(1);
//   const limit = 6;

//   const { data :forums = {} , isLoading } = useQuery({
//     queryKey: ["forums", page],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/forum?page=${page}&limit=${limit}`);
//       return res.data;
//     },
//     keepPreviousData: true,
//   });

//   console.log(forums);

//   if (isLoading) {
//     return <div className="text-center min-h-screen text-primary py-10 text-xl">Loading...</div>;
//   }

//   const totalPages = Math.ceil(forums.total / limit);

//   return (
//     <div className="lg:w-10/12 mx-auto min-h-screen w-11/12 py-10">
//       <h1 className="text-center lg:text-5xl text-3xl font-title font-bold text-primary">All Classes</h1>

//       <div className="grid lg:grid-cols-3 my-8 lg:w-10/12 mx-auto md:grid-cols-2 grid-cols-1 gap-6">
//         {forums?.map((forum) => (
//           <AllForumCard forum={forum} key={forum._id} />
//         ))}
//       </div>

//       {/* Pagination Buttons */}
//       <div className="flex justify-center  gap-2 mt-10">
//         {Array.from({ length: totalPages }, (_, i) => (
//           <button
//             key={i}
//             onClick={() => setPage(i + 1)}
//             className={`px-4 py-2 border font-title font-bold cursor-pointer rounded ${
//               page === i + 1 ? "bg-primary text-white" : "bg-white hover:bg-primary/50 duration-200 border-primary text-primary"
//             }`}
//           >
//             {i + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Forums;

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import AllForumCard from "./AllForumCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";

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

  // Optional: Check what's coming from backend
  // console.log(data);

  // Handle safely even if data is not ready
  const forums = data?.forums || [];
  const totalPages = Math.ceil((data?.total || 0) / limit);

  if (isLoading) {
    return (
      <div className="text-center min-h-screen text-primary py-10 text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="lg:w-10/12 mx-auto min-h-screen w-11/12 py-10">
      <h1 className="text-center lg:text-5xl text-3xl font-title font-bold text-primary">
        All Forum Posts
      </h1>

      <div className="grid lg:grid-cols-3 my-8 lg:w-10/12 mx-auto md:grid-cols-2 grid-cols-1 gap-6">
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
