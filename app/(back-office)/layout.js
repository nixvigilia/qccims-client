"use client";
import Header from "@/components/Dashboard/Header";
import Sidebar from "@/components/Dashboard/Sidebar";
import React, {useState} from "react";
import {StoreProvider} from "@/utils/context/store";
import {usePathname} from "next/navigation";

export default function DashboardLayout({children}) {
  const [showSidebar, setShowSidebar] = useState(false);
  const pathname = usePathname();

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
