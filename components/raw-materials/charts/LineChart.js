"use client";
import React, {useEffect} from "react";
import ApexCharts from "apexcharts";
import {TrendingUp} from "lucide-react";

const LineChart = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const chartConfig = {
        series: [
          {
            name: "Sales",
            data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
          },
        ],
        chart: {
          type: "line",
          height: 240,
          toolbar: {
            show: false,
          },
        },
        colors: ["#020617"],
        stroke: {
          lineCap: "round",
          curve: "smooth",
        },
        markers: {
          size: 0,
        },
        xaxis: {
          categories: [
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          axisTicks: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
          labels: {
            style: {
              colors: "#616161",
              fontSize: "12px",
              fontFamily: "inherit",
              fontWeight: 400,
            },
          },
        },
        yaxis: {
          labels: {
            style: {
              colors: "#616161",
              fontSize: "12px",
              fontFamily: "inherit",
              fontWeight: 400,
            },
          },
        },
        grid: {
          show: true,
          borderColor: "#dddddd",
          strokeDashArray: 5,
          xaxis: {
            lines: {
              show: true,
            },
          },
          padding: {
            top: 5,
            right: 20,
          },
        },
        fill: {
          opacity: 0.8,
        },
        tooltip: {
          theme: "dark",
        },
      };

      const chart = new ApexCharts(
        document.querySelector("#line-chart"),
        chartConfig
      );
      chart.render();

      // Cleanup function to destroy chart when component unmounts
      return () => {
        chart.destroy();
      };
    }
  }, []);

  return (
    <div className="relative flex flex-col rounded bg-white bg-clip-border text-gray-900 shadow-sm p-4">
      <div className="relative mx-4 mt-4 flex flex-col gap-4 overflow-hidden rounded-none bg-transparent bg-clip-border text-gray-700 shadow-none md:flex-row md:items-center">
        <div className="rounded-lg bg-blue-700 w-10 h-10 text-white flex items-center justify-center">
          <TrendingUp className="w-10" />
        </div>
        <div>
          <h6 className="block font-sans text-xl font-bold leading-relaxed tracking-normal text-blue-gray-900 antialiased">
            Production Trends and Seasonal Demand
          </h6>
          <p className="block max-w-sm font-sans text-sm font-normal leading-normal text-gray-700 antialiased">
            The line chart shows a peak in production during August, indicating
            seasonal demand. This insight is crucial for planning efficient
            production schedules and inventory management to meet customer needs
            effectively.
          </p>
        </div>
      </div>
      <div className="pt-6 px-2 pb-0">
        <div id="line-chart"></div>
      </div>
    </div>
  );
};

export default LineChart;
