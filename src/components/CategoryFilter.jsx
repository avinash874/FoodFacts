import React from "react";
const CategoryFilter = ({ onSelect }) => {
  const categories = 
  [
  'beverages',
  'dairy',
  'snacks',
  'cereals',
  'meats',
  'fruits',
  'vegetables',
  'breads',
  'frozen-foods',
  'sauces',
];

  return (
    <select
      onChange={(e) => onSelect(e.target.value)}
      className="border p-2 rounded"
    >
      <option value="">All Categories</option>
      {categories.map((cat) => (
        <option key={cat} value={cat}>{cat}</option>
      ))}
    </select>
  );
};

export default CategoryFilter;
