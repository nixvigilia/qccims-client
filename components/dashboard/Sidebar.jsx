"use client";
import {
  BaggageClaim,
  BarChart4,
  Cable,
  ChevronLeft,
  Files,
  Home,
  PlusCircle,
  ShoppingBag,
  ShoppingBasket,
  ShoppingCart,
  X,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import {usePathname} from "next/navigation";

import CollapsibleLink from "./CollapsibleLink";
import SidebarDropdownLink from "./SidebarDropdownLink";

export default function Sidebar({showSidebar, setShowSidebar}) {
  const pathname = usePathname();

  // const inventoryLinks = [
  //   {
  //     title: "Raw Materials",
  //     href: "/raw-materials",
  //   },
  // ];

  return (
    <div
      className={`${
        showSidebar
          ? "w-60 min-h-screen bg-slate-800 text-slate-50 fixed lg:block z-50"
          : "w-60 min-h-screen bg-slate-800 text-slate-50 fixed hidden lg:block z-50"
      }`}
    >
      {/* Top Part */}

      <div className="flex flex-col">
        {/* Logo */}
        <div className="flex justify-between">
          <Link
            href="/dashboard/home/overview"
            className="flex space-x-2 items-center p-6 w-full"
          >
            <div className="flex flex-col">
              {" "}
              {/* Wrap both h1 and span in a flex column */}
              <h1 className="text-4xl font-bold text-gray-100">QCCIMS</h1>
              <span className="text-md font-semibold text-gray-400 p-1">
                Production
              </span>
            </div>
          </Link>
          <button
            className="bg-slate-950 py-3 px-4 lg:hidden"
            onClick={() => setShowSidebar(false)}
          >
            <X className="h-6 w-6 text-white" />
          </button>
        </div>

        {/* Links */}

        <nav className="flex flex-col gap-3 px-3 py-6">
          <Link
            href="/dashboard"
            className={`flex items-center space-x-2 text-slate-50 px-4 py-3 rounded-md  ${
              pathname === "/dashboard" ? "bg-gray-700" : ""
            } `}
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
          <Link
            href="/raw-materials"
            className={`flex items-center space-x-2 text-slate-50 px-4 py-3 rounded-md  ${
              pathname === "/raw-materials" ? "bg-gray-700" : ""
            } `}
          >
            <Home className="w-4 h-4" />
            <span>Raw Materials</span>
          </Link>
          {/* <SidebarDropdownLink
            items={inventoryLinks}
            title="Inventory"
            icon={BaggageClaim}
            setShowSidebar={setShowSidebar}
          />

          <Link href="#" className="p-2  flex items-center space-x-2">
            <BarChart4 className="w-4 h-4" />
            <span>Reports</span>
          </Link>
          <Link href="#" className="flex items-center space-x-2 p-2 ">
            <Files className="w-4 h-4" />
            <span>Documents</span>
          </Link> */}
        </nav>
      </div>

      {/* Bottom */}
      {/* <div className="flex flex-col ">
        <button className="bg-slate-950 flex space-x-2 items-center justify-center py-3 px-2">
          <ChevronLeft />
        </button>
      </div> */}
      {/* Subscrption Card */}
      {/* Footer Icon */}
    </div>
  );
}
