"use client";
import {
  AlignJustify,
  Bell,
  ChevronDown,
  History,
  LayoutGrid,
  Plus,
  Settings,
  Users,
} from "lucide-react";
import React, {useContext} from "react";
import SearchInput from "./SearchInput";
import Image from "next/image";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Store} from "@/utils/context/store";

export default function Header({setShowSidebar}) {
  const {state} = useContext(Store);
  const {firstName} = state;

  return (
    <div className="bg-gray-100 h-12 flex items-center justify-between p-10 border-b border-slate-200">
      <div className="flex gap-3">
        {/* Recent activities */}

        {/* Search */}
        <SearchInput />
      </div>
      <div className="items-center gap-3 hidden lg:flex">
        {/*Plus Icon  */}
        <div className="pr-2 border-r border-gray-300">
          <Link
            href="/raw-materials/create"
            className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <span className="hidden md:block">Create Order</span>{" "}
            <Plus className="h-5 md:ml-4" />
          </Link>
        </div>
        <div className="flex border-r border-gray-300 space-x-2">
          <button className="p-1 rounded-lg hover:bg-slate-200">
            <Users className="text-slate-900 w-4 h-4" />
          </button>
          <button className="p-1 rounded-lg hover:bg-slate-200">
            <Bell className="text-slate-900 w-4 h-4" />
          </button>
          <button className="p-1 rounded-lg hover:bg-slate-200">
            <Settings className="text-slate-900 w-4 h-4" />
          </button>
        </div>
        {/*  */}
        <div className="flex gap-3">
          {/* <DropdownMenu>
            <DropdownMenuTrigger>
              <button className="flex items-center">
                <span>{firstName}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <button>Logout</button>
              </DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}

          <button>
            {/* {session.user?.image ? (
              <Image
                src={session.user?.image}
                alt="user image"
                width={96}
                height={96}
                className="w-8 h-8 rounded-full border border-slate-800"
              />
            ) : (
              <div className="w-8 h-8 rounded-full border border-slate-800 bg-white">
                {initials}
              </div>
            )} */}
          </button>
          <button>
            {/* <LayoutGrid className="w-6 h-6 text-slate-900" /> */}
          </button>
        </div>
        {/*  */}
      </div>
      <button className="lg:hidden">
        <Image
          src="/user.png"
          alt="user image"
          width={96}
          height={96}
          className="w-8 h-8 rounded-full border border-slate-800"
        />
      </button>
    </div>
  );
}
