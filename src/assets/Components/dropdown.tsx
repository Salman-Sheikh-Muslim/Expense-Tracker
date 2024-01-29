import React, { useState } from "react";

interface DropdownProps {
  categories: string[];
  onCategorySelect: (category: string) => void;
}

const Dropdown = ({ categories, onCategorySelect }: DropdownProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue);
    onCategorySelect(selectedValue);
  };

  return (
    <div className="mb-3">
      <label htmlFor="itemCategory" className="form-label">
        Category
      </label>
      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
        id="itemCategory"
        className="form-control"
      >
        <option value="">All</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
