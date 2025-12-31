import React from "react";

const SearchBar = ({ value, setValue, onSearch }) => {
  return (
    <div className="flex gap-2">
      <input
        className="border p-2 w-full rounded"
        placeholder="Search by name or barcode"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        onClick={onSearch}
        className="bg-green-600 text-white px-4 rounded cursor-pointer"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
