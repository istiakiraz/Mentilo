// import React, { useState } from "react";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { useQuery } from "@tanstack/react-query";
// import AllClassCard from "./AllClassCard";

// const AllClasses = () => {
//   const axiosSecure = useAxiosSecure();
//   const [page, setPage] = useState(1);
//   const limit = 6;

//   const { data, isLoading } = useQuery({
//     queryKey: ["classes", page],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/classes?page=${page}&limit=${limit}`);
//       return res.data;
//     },
//     keepPreviousData: true,
//   });

//   if (isLoading) {
//     return <div className="text-center min-h-screen text-primary py-10 text-xl">Loading...</div>;
//   }

//   const totalPages = Math.ceil(data.total / limit);

//   return (
//     <div className="lg:w-10/12 mx-auto min-h-screen w-11/12 py-10">
//       <h1 className="text-center lg:text-5xl text-3xl font-title font-bold text-primary">All Classes</h1>

//       <div className="grid lg:grid-cols-3 my-8 lg:w-10/12 mx-auto md:grid-cols-2 grid-cols-1 gap-6">
//         {data?.classes?.map((classCard) => (
//           <AllClassCard classCard={classCard} key={classCard._id} />
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

// export default AllClasses;

import React, { useState, useEffect } from "react"; // ✅ 1. Import useEffect
import { useQuery } from "@tanstack/react-query";
import AllClassCard from "./AllClassCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllClasses = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState(""); // ✅ 2. State for the input's current value
  const [search, setSearch] = useState(""); // ✅ 3. State for the debounced search term
  const limit = 6;

  // ✅ 4. Debouncing logic with useEffect
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(inputValue);
      setPage(1); // Reset to page 1 when search term changes
    }, 500); // 500ms delay

    // Cleanup function to cancel the timeout if the user types again
    return () => {
      clearTimeout(handler);
    };
  }, [inputValue]); // This effect runs when inputValue changes

  const { data = {}, isLoading } = useQuery({
    queryKey: ["classes", page, search], // This now uses the debounced search state
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/classes?page=${page}&limit=${limit}&search=${search}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const totalPages = Math.ceil((data.total || 0) / limit);

  if (isLoading && !data.classes) {
    return (
      <div className="text-center min-h-screen text-primary py-10 text-xl">
        Loading... 
      </div>
    );
  }

  return (
    <div className="lg:w-10/12 mx-auto min-h-screen w-11/12 py-10">
     {" "}
      <h1 className="text-center lg:text-5xl text-3xl font-title font-bold text-primary">
       All Classes{" "}
      </h1>
    {/* ✅ 5. Update the input to use the new state */}
      <div className="text-center my-6">
       {" "}
        <input
          type="text"
          placeholder="Search by class title..."
          value={inputValue}
          className="border-2 shadow-[8px_8px_0px_0px_#432365] border-primary px-4 py-2  w-full max-w-sm"
          onChange={(e) => setInputValue(e.target.value)}
        />
        {" "}
      </div>
      
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 my-8 lg:w-10/12 mx-auto">
      
        {data.classes?.map((classCard) => (
          <AllClassCard key={classCard._id} classCard={classCard} />
        ))}
    
      </div>
     {/* Pagination */}
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
            {i + 1}{" "}
          </button>
        ))}
        {" "}
      </div>
     {" "}
    </div>
  );
};

export default AllClasses;
