import React, {useState, useEffect, useRef} from "react";
import Chart from "chart.js/auto";

const AnalyticsDashboard = () => {
  const [open, setOpen] = useState(true);
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "12-01-2020",
          "01-01-2021",
          "02-01-2021",
          "03-01-2021",
          "04-01-2021",
          "05-01-2021",
          "06-01-2021",
          "07-01-2021",
          "08-01-2021",
          "09-01-2021",
          "10-01-2021",
          "11-01-2021",
          "12-01-2021",
          "01-01-2022",
          "02-01-2022",
          "03-01-2022",
          "04-01-2022",
          "05-01-2022",
          "06-01-2022",
          "07-01-2022",
          "08-01-2022",
          "09-01-2022",
          "10-01-2022",
          "11-01-2022",
          "12-01-2022",
          "01-01-2023",
        ],
        datasets: [
          // Current and Previous datasets here
        ],
      },
      options: {
        // Configuration options here
      },
    });
  }, []);

  return (
    <section className="flex flex-col justify-center antialiased bg-gray-100 text-gray-600 min-h-screen">
      <div className="max-w-3xl mx-auto p-4 sm:px-6 h-full">
        <div className="flex flex-col col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-gray-200">
          <header className="px-5 py-4 border-b border-gray-100 flex items-center">
            <h2 className="font-semibold text-gray-800">Analytics</h2>
          </header>
          <div className="px-5 py-1">
            {/* Metric display components here */}
          </div>
          <div className="flex-grow">
            <canvas ref={chartRef} width="800" height="300"></canvas>
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed bottom-0 right-0 w-full md:bottom-8 md:right-12 md:w-auto z-60">
          <div className="bg-gray-800 text-gray-50 text-sm p-3 md:rounded shadow-lg flex justify-between">
            <div>
              👉{" "}
              <a
                className="hover:underline ml-1"
                href="https://cruip.com/mosaic/?ref=codepen-cruip-analytics"
                target="_blank"
              >
                More components on Cruip.com
              </a>
            </div>
            <button
              className="text-gray-500 hover:text-gray-400 ml-5"
              onClick={() => setOpen(false)}
            >
              <span className="sr-only">Close</span>
              <svg
                className="w-4 h-4 flex-shrink-0 fill-current"
                viewBox="0 0 16 16"
              >
                <path d="M12.72 3.293a1 1 0 00-1.415 0L8.012 6.586 4.72 3.293a1 1 0 00-1.414 1.414L6.598 8l-3.293 3.293a1 1 0 101.414 1.414l3.293-3.293 3.293 3.293a1 1 0 001.414-1.414L9.426 8l3.293-3.293a1 1 0 000-1.414z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default AnalyticsDashboard;
