// src/app/components/AddUserPopup.tsx
"use client";

import React, { useState } from "react";
import Button from "./Button";
import Input from "./InputTemplate";
import Dropdown from "./Dropdown";
import countries from "../data/countries.json";
import departments from "../data/departments.json";
import statuses from "../data/statuses.json";

type AddUserPopupProps = {
  onClose: () => void;
};

const AddUserPopup: React.FC<AddUserPopupProps> = ({ onClose }) => {
  const [fullName, setFullName] = useState<string>("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const handleAddUser = () => {
    // Тут може бути логіка для додавання користувача
    alert(`User ${fullName} added!`);
    onClose(); // Закриваємо попап після додавання
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
        <h2 className="text-lg font-semibold mb-4 mt-5 text-center">
          ADD USER
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10 mb-10">
          <div className="mb-4">
            <label className="block font-medium mb-2">Full name</label>
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter full name"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-2">Departament</label>
            <Dropdown
              options={departments.map((dep) => ({
                name: dep.name,
                value: dep.value
              }))}
              width="100%"
              onSelect={(value: string) => setSelectedDepartment(value)}
              selectedValue={selectedDepartment}
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">Country</label>
            <Dropdown
              options={countries.map((country) => ({
                name: country.name,
                value: country.value
              }))}
              width="100%"
              onSelect={(value: string) => setSelectedCountry(value)}
              selectedValue={selectedCountry}
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">Status</label>
            <Dropdown
              options={statuses.map((status) => ({
                name: status.name,
                value: status.value
              }))}
              width="100%"
              onSelect={(value: string) => setSelectedStatus(value)}
              selectedValue={selectedStatus}
            />
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <div className="mr-4">
            <Button onClick={onClose} label="Cancel" />
          </div>
          <Button onClick={handleAddUser} label="Add Users" width="120px" />
        </div>
      </div>
    </div>
  );
};

export default AddUserPopup;
