"use client";
import {useState, useEffect, useRef} from "react";

export default function SelectInputWithSearch({
  label,
  name,
  register,
  className = "sm:col-span-2",
  options = [],
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleItemClick = (item) => {
    // Do something with the selected item, like setting state or calling a function

    setIsOpen(false);
    setSelectedCustomer(item);
    setSearchTerm("");
  };

  const filteredItems = options.filter((item) =>
    item.toLowerCase().includes(searchTerm)
  );

  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>

      <div className="relative group mt-2" ref={dropdownRef}>
        <button
          type="button"
          id="dropdown-button"
          className="inline-flex justify-between items-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
          onClick={toggleDropdown}
        >
          {selectedCustomer ? (
            <span className="font-normal">{selectedCustomer}</span>
          ) : (
            <span className="text-gray-400 font-normal">Select {label}</span>
          )}

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {isOpen && (
          <div className="absolute w-full mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1 z-10">
            <input
              id="search-input"
              className="block w-full px-4 py-2 text-gray-800 border rounded-md border-gray-300 focus:outline-none"
              type="text"
              placeholder="Search items"
              autoComplete="off"
              onChange={handleSearchChange}
            />
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <div
                  key={index}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md"
                  onClick={() => handleItemClick(item)} // Handle item click
                >
                  {item}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-center text-gray-700">
                No items found.
                <button
                  type="button"
                  className="ml-2 px-2 py-1 text-gray-700 border border-gray-700 rounded hover:bg-gray-100"
                  onClick={() => alert("Function to create a new item")}
                >
                  Create New
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
