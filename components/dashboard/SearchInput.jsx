import {Search} from "lucide-react";
import React from "react";

export default function SearchInput({placeholder, searchWidth}) {
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className={`peer block rounded-lg border border-gray-200 py-[9px] pl-10 text-md outline-2 placeholder:text-gray-500 ${searchWidth}`}
        placeholder={placeholder}

        // onChange={handleSearch}
        // defaultValue={searchParams.get("query")?.toString()}
      />
      <Search className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
