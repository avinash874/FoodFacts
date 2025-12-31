import React from "react";
const SortFilter = ({ onSort }) => {
  return (
    <select onChange={(e) => onSort(e.target.value)} className="border p-2">
      <option value="">Sort</option>
      <option value="az">Name A-Z</option>
      <option value="za">Name Z-A</option>
      <option value="nutri">Nutrition Grade</option>
    </select>
  );
};

export default SortFilter;
