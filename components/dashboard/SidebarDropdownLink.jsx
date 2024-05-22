"use client";
import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {BaggageClaim, ChevronRight} from "lucide-react";
import CollapsibleLink from "./CollapsibleLink";
export default function SidebarDropdownLink({
  title,
  items,
  icon: Icon,
  setShowSidebar,
}) {
  // const Icon = icon;
  return (
    <Collapsible>
      <CollapsibleTrigger className="flex justify-between items-center w-full">
        <div className="flex items-center space-x-2 px-4 py-3">
          <Icon className="w-4 h-4" />
          <span className="text-sm">{title}</span>
        </div>
        <ChevronRight className="w-5 h-5" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        {items?.map((item, i) => {
          return (
            <CollapsibleLink
              setShowSidebar={setShowSidebar}
              key={i}
              href={item.href}
              title={item.title}
            />
          );
        })}
      </CollapsibleContent>
    </Collapsible>
  );
}
