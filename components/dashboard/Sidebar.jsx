"use client";
import {Home, BaggageClaim} from "lucide-react";
import Link from "next/link";
import React from "react";
import {usePathname} from "next/navigation";
import SidebarDropdownLink from "./SidebarDropdownLink";

export default function Sidebar({showSidebar, setShowSidebar}) {
  const pathname = usePathname();

  const inventoryLinks = [
    {
      title: "Customer Profile",
      href: "/delivery/customer-profile",
    },
    {
      title: "Deliver Receipt",
      href: "/delivery/deliver-receipt",
    },
    {
      title: "Job Order",
      href: "/delivery/job-order",
    },
  ];

  return (
    <div
      className={`${
        showSidebar
          ? "w-60 min-h-screen bg-white text-slate-950 fixed lg:block z-50"
          : "w-60 min-h-screen bg-white text-slate-950 fixed hidden lg:block z-50"
      }`}
    >
      <div className="flex flex-col m-2">
        <div className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40">
          <Link
            href="/dashboard"
            className="flex space-x-2 items-center w-full"
          >
            <div className="flex flex-col bg-blue-600">
              <h1 className="text-4xl font-bold text-white">QCCIMS</h1>
              <span className="text-md font-semibold text-white p-1">
                Production
              </span>
            </div>
          </Link>
          {/* <button
                className="bg-slate-950 py-3 px-4 lg:hidden"
                onClick={() => setShowSidebar(false)}
              >
                <X className="h-6 w-6 text-blue-800" />
              </button> */}
        </div>

        <nav className="flex flex-col gap-3 px-3">
          <Link
            href="/dashboard"
            className={`flex items-center space-x-2 px-4 py-3 rounded-md text-sm ${
              pathname === "/dashboard"
                ? "bg-blue-100 text-blue-600 font-medium"
                : "text-gray-900"
            }`}
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </Link>

          <SidebarDropdownLink
            items={inventoryLinks}
            title="Delivery"
            icon={BaggageClaim}
            setShowSidebar={setShowSidebar}
          />

          {/* <Link
                href="/raw-materials"
                className={`flex items-center space-x-2 px-4 py-3 rounded-md text-sm ${
                  pathname === "/raw-materials"
                    ? "bg-blue-100 text-blue-600 font-medium"
                    : "text-gray-900"
                }`}
              >
                <Anvil className="w-5 h-5" />
                <span>Delivery</span>
              </Link>
              <Link
                href="/raw-materials"
                className={`flex items-center space-x-2 px-4 py-3 rounded-md text-sm ${
                  pathname === "/raw-materials"
                    ? "bg-blue-100 text-blue-600 font-medium"
                    : "text-gray-900"
                }`}
              >
                <Anvil className="w-5 h-5" />
                <span>Raw Materials</span>
              </Link> */}
        </nav>
      </div>
    </div>
  );
}
