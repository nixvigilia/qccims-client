import React from "react";
import {UsersRound, Weight, CircleDashed, CircleCheck} from "lucide-react";

const metricsData = [
  {
    icon: <UsersRound className="w-5" />,
    title: "Customers",
    value: "1375",
    upward: true,
    percent: "5.2%",
  },
  {
    icon: <Weight className="w-5" />,
    title: "Total Net Weight",
    value: "41,428.785 kg",
    upward: true,
    percent: "1.8%",
  },
  {
    icon: <CircleDashed className="w-5" />,
    title: "Pending",
    value: "7524",
    upward: false,
    percent: "2.5%",
  },
  {
    icon: <CircleCheck className="w-5" />,
    title: "Confirmed",
    value: "258",
    upward: true,
    percent: "2.2%",
  },
];

export default function ChartMetrics() {
  return (
    <>
      <div className="flex bg-gray-100 dark:bg-gray-900">
        <div className="w-full px-5 mx-auto mt-8">
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {metricsData.map((metrics, index) => (
              <div className="p-5 bg-white rounded shadow-sm" key={index}>
                <div className="flex text-base text-gray-400 ">
                  {metrics.icon} <span className="pl-2">{metrics.title}</span>
                </div>
                <div className="flex items-center pt-1">
                  <div className="text-2xl font-bold text-gray-900 ">
                    {metrics.value}
                  </div>
                  {/* <span
                    className={`flex items-center px-2 py-0.5 mx-2 text-sm rounded-full ${
                      metrics.upward
                        ? "text-green-600 bg-green-100"
                        : "text-red-600 bg-red-100"
                    }`}
                  >
                    {metrics.upward && (
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18 15L12 9L6 15"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}

                    {!metrics.upward && (
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 9L12 15L18 9"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}

                    <span>{metrics.percent}</span>
                  </span> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
