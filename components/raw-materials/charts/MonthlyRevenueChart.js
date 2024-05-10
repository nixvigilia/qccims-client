import React from "react";

const MonthlyRevenueChart = () => {
  // Simulated data for demonstration
  const months = [
    {month: "Jan", existing: 8, upgrades: 6, new: 16},
    {month: "Feb", existing: 10, upgrades: 6, new: 20},
    {month: "Mar", existing: 10, upgrades: 8, new: 20},
    {month: "Apr", existing: 10, upgrades: 6, new: 24},
    {month: "May", existing: 10, upgrades: 8, new: 20},
    {month: "Jun", existing: 12, upgrades: 8, new: 24},
    {month: "Jul", existing: 12, upgrades: 16, new: 20},
    {month: "Aug", existing: 12, upgrades: 10, new: 24},
    {month: "Sep", existing: 12, upgrades: 10, new: 32},
    {month: "Oct", existing: 12, upgrades: 12, new: 28},
    {month: "Nov", existing: 8, upgrades: 8, new: 40},
    {month: "Dec", existing: 12, upgrades: 8, new: 40},
  ];

  return (
    <div className="flex flex-col items-center justify-center ml-10 text-gray-700 bg-gray-100">
      <div className="flex flex-col items-center w-full max-w-screen-md p-6 pb-6 bg-white rounded-sm shadow-sm sm:p-8">
        <h2 className="text-xl font-bold">Monthly Production Output</h2>
        <span className="text-sm font-semibold text-gray-500">2023</span>
        <div className="flex items-end flex-grow w-full mt-2 space-x-2 sm:space-x-3">
          {months.map(({month, existing, upgrades, new: newProduction}) => (
            <div
              key={month}
              className="relative flex flex-col items-center flex-grow pb-5 group"
            >
              <div
                className="w-full bg-blue-800"
                style={{height: `${existing * 5}px`}}
              ></div>
              <div
                className="w-full bg-blue-400"
                style={{height: `${upgrades * 5}px`}}
              ></div>
              <div
                className="w-full bg-blue-300"
                style={{height: `${newProduction * 5}px`}}
              ></div>
              <span className="absolute bottom-0 text-xs font-bold">
                {month}
              </span>
            </div>
          ))}
        </div>
        <div className="flex w-full mt-3">
          <div className="flex items-center ml-auto">
            <span className="block w-4 h-4 bg-blue-800"></span>
            <span className="ml-1 text-xs font-medium">Existing</span>
          </div>
          <div className="flex items-center ml-4">
            <span className="block w-4 h-4 bg-blue-400"></span>
            <span className="ml-1 text-xs font-medium">Upgrades</span>
          </div>
          <div className="flex items-center ml-4">
            <span className="block w-4 h-4 bg-blue-300"></span>
            <span className="ml-1 text-xs font-medium">New</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyRevenueChart;
