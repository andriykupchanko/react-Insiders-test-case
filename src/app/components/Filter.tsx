// src/app/components/Filter.tsx
"use client";

import React, { useState } from "react";
import Dropdown from "./Dropdown";
import ButtonIcon from "./ButtonIcon";

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
    handleFilterChange(); // Notify parent to reset filters immediately
  };

  return (
    <div className="flex items-center space-x-4 mb-6">
      <div>
        <label className="block font-medium mb-2">Department</label>
        <Dropdown
          options={departments}
          width="200px"
          onSelect={(value: string) => {
            setSelectedDepartment(value);
            handleFilterChange(); // Update filters immediately
          }}
          selectedValue={selectedDepartment}
        />
      </div>

      <div>
        <label className="block font-medium mb-2">Country</label>
        <Dropdown
          options={countries}
          width="200px"
          onSelect={(value: string) => {
            setSelectedCountry(value);
            handleFilterChange(); // Update filters immediately
          }}
          selectedValue={selectedCountry}
        />
      </div>

      <div>
        <label className="block font-medium mb-2">All Status</label>
        <Dropdown
          options={statuses}
          width="200px"
          onSelect={(value: string) => {
            setSelectedStatus(value);
            handleFilterChange();
          }}
          selectedValue={selectedStatus}
        />
      </div>
      <div className="mt-8">
        <ButtonIcon
          iconSrc="https://img.icons8.com/?size=100&id=68064&format=png&color=000000"
          onClick={clearFilters}
        />
      </div>
    </div>
  );
};

export default Filter;
