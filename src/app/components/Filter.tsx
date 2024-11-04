"use client";

import React, { useState } from "react";
import Dropdown from "./Dropdown"; // For selecting status and countries
import ButtonIcon from "./ButtonIcon"; // Icon button for clearing filters
import DropdownSelected from "./DropdownSelected"; // For selecting multiple departments

type FilterProps = {
  departments: { name: string; value: string }[];
  countries: { name: string; value: string }[];
  statuses: { name: string; value: string }[];
  onFilterChange: (
    departments: string[],
    countries: string[],
    status: string
  ) => void; // Function to handle filter changes
};

const Filter: React.FC<FilterProps> = ({
  departments,
  countries,
  statuses,
  onFilterChange
}) => {
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const handleFilterChange = () => {
    onFilterChange(selectedDepartments, selectedCountries, selectedStatus);
  };

  const clearFilters = () => {
    setSelectedDepartments([]);
    setSelectedCountries([]);
    setSelectedStatus("");
    handleFilterChange(); // Reset filters
  };

  return (
    <div className="flex items-center space-x-4 mb-6">
      <div>
        <label className="block font-medium mb-2">Departments</label>
        <DropdownSelected
          options={departments}
          width="200px"
          selectedValues={selectedDepartments}
          onSelect={(values: string[]) => {
            setSelectedDepartments(values);
            handleFilterChange(); // Update filters immediately
          }}
        />
      </div>

      <div>
        <label className="block font-medium mb-2">Countries</label>
        <Dropdown
          options={countries}
          width="200px"
          selectedValue={selectedCountries[0] || ""}
          onSelect={(value: string) => {
            setSelectedCountries([value]); // Store the selected value
            handleFilterChange(); // Update filters immediately
          }}
        />
      </div>

      <div>
        <label className="block font-medium mb-2">Status</label>
        <Dropdown
          options={statuses}
          width="200px"
          selectedValue={selectedStatus}
          onSelect={(value: string) => {
            setSelectedStatus(value);
            handleFilterChange(); // Update filters immediately
          }}
        />
      </div>

      <div className="mt-8">
        <ButtonIcon
          iconSrc="https://img.icons8.com/?size=100&id=68064&format=png&color=000000"
          onClick={clearFilters} // Clear filters
        />
      </div>
    </div>
  );
};

export default Filter;
