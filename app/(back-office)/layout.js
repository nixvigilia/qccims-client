"use client";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import React, {useState} from "react";
import Login from "../login/page";
import {StoreProvider} from "@/utils/context/store";

export default function DashboardLayout({children}) {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="flex">
      <StoreProvider>
        <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        <main className="lg:ml-60 ml-0 w-full bg-slate-100 min-h-screen">
          <Header setShowSidebar={setShowSidebar} />
          {children}
        </main>
      </StoreProvider>
    </div>
  );
}
