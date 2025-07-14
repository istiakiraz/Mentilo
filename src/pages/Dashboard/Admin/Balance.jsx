import React from "react";
import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Balance = () => {
  const axiosSecure = useAxiosSecure();

  //  booking data
  const { data: bookings = [], isLoading: bookingsLoading } = useQuery({
    queryKey: ["allBookings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/booking");
      return res.data;
    },
  });

  //  newsletter data
  const { data: newsletters = [], isLoading: newslettersLoading } = useQuery({
    queryKey: ["newsletter"],
    queryFn: async () => {
      const res = await axiosSecure.get("/newsletter"); 
      return res.data;
    },
  });

  if (bookingsLoading || newslettersLoading) {
    return (
      <div className="text-center min-h-screen text-primary py-10 text-xl">
        Loading...
      </div>
    );
  }

  //  total Balance Calculation
  const totalBalance = bookings.reduce((sum, booking) => sum + booking.price, 0);

//   array.reduce((previousValue, currentItem) => {
//   return previousValue + currentItem.something;
// }, initialValue);

  //  last 6 Transactions
  const lastSix = [...bookings]
    .sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate))
    .slice(0, 6);

  //  pie Chart Data
  const chartData = [
    { name: "Bookings", value: bookings.length },
    { name: "Newsletters", value: newsletters.length },
  ];

  const COLORS = ["#432365", "#9F7AEA"];

  return (
    <div className="lg:w-11/12  mx-auto py-10 min-h-screen">
      {/* total Balance */}
      <div className="bg-secondary border-2 border-primary rounded-xl p-6 text-center mb-10">
        <h1 className="text-3xl font-bold text-primary font-title mb-2">Total Balance</h1>
        <p className="text-4xl font-bold text-gray-800">${totalBalance.toFixed(2)}</p>
      </div>

      {/*  recent Transactions */}
      <div className="bg-white border border-primary rounded-xl p-6 mb-10 overflow-x-auto">
        <h2 className="text-2xl font-title font-bold text-primary mb-4">Recent Transactions</h2>
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="bg-primary text-white">
              <th className="py-2 px-4">User</th>
              <th className="py-2 px-4">Package</th>
              <th className="py-2 px-4">Price</th>
              <th className="py-2 px-4">Trainer</th>
              <th className="py-2 px-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {lastSix.map((item, i) => (
              <tr key={i} className="border-b border-gray-200">
                <td className="py-2 px-4">{item.BookedBy}</td>
                <td className="py-2 px-4">{item.packageName}</td>
                <td className="py-2 px-4">${item.price}</td>
                <td className="py-2 px-4">{item.trainerName}</td>
                <td className="py-2 px-4">
                  {new Date(item.bookingDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/*  pie Chart */}
      <div className="bg-white border border-primary rounded-xl p-6 mb-10">
        <h2 className="text-2xl font-title font-bold text-primary mb-4 text-center">
          Bookings vs Newsletter Subscriptions
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name} (${(percent * 100).toFixed(0)}%)`
              }
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Balance;
