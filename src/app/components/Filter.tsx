// src/app/components/Filter.tsx
"use client";

import React, { useState } from "react";
import Dropdown from "./Dropdown";
import ButtonIcon from "./ButtonIcon"; // Assuming this is your clear filters button

type FilterProps = {
  departments: { name: string; value: string }[];
  countries: { name: string; value: string }[];
  statuses: { name: string; value: string }[];
  onFilterChange: (department: string, country: string, status: string) => void;
};

const Filter: React.FC<FilterProps> = ({
  departments,
  countries,
  statuses,
  onFilterChange
}) => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const handleFilterChange = () => {
    onFilterChange(selectedDepartment, selectedCountry, selectedStatus);
  };

  const clearFilters = () => {
    setSelectedDepartment("");
    setSelectedCountry("");
    setSelectedStatus("");
    handleFilterChange(); // Notify parent to reset filters
  };

  return (
    <div className="flex items-center space-x-4 mb-6">
      <Dropdown
        options={departments}
        width="200px"
        onSelect={(value: string) => {
          setSelectedDepartment(value);
          handleFilterChange();
        }}
        selectedValue={selectedDepartment}
      />
      <Dropdown
        options={countries}
        width="200px"
        onSelect={(value: string) => {
          setSelectedCountry(value);
          handleFilterChange();
        }}
        selectedValue={selectedCountry}
      />
      <Dropdown
        options={statuses}
        width="200px"
        onSelect={(value: string) => {
          setSelectedStatus(value);
          handleFilterChange();
        }}
        selectedValue={selectedStatus}
      />
      <ButtonIcon
        iconSrc="https://img.icons8.com/?size=100&id=68064&format=png&color=000000"
        onClick={clearFilters}
      />
    </div>
  );
};

export default Filter;
