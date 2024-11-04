"use client";

import React, { useState, useEffect } from "react";
import Dropdown from "../app/components/Dropdown";
import Input from "../app/components/InputTemplate";
import Button from "../app/components/Button";
import usersData from "../app/data/users.json";
import countries from "../app/data/countries.json";
import departments from "../app/data/departments.json";
import statuses from "../app/data/statuses.json";
import { User, Country, Department, Status } from "../app/types/moduls";

const userOptions = (usersData as User[]).map((user) => ({
  name: user.name,
  value: user.name
}));

const countryOptions = (countries as Country[]).map((country) => ({
  name: country.name,
  value: country.value
}));

const departmentOptions = (departments as Department[]).map((department) => ({
  name: department.name,
  value: department.value
}));

const statusOptions = (statuses as Status[]).map((status) => ({
  name: status.name,
  value: status.value
}));

const EditUserPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>(usersData as User[]);
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [initialData, setInitialData] = useState<User | null>(null);
  const [isModified, setIsModified] = useState<boolean>(false);

  useEffect(() => {
    const user = users.find((user) => user.name === selectedUser);
    if (user) {
      setInitialData(user);
      setFullName(user.name);
      setSelectedCountry(user.country.value);
      setSelectedDepartment(user.department.value);
      setSelectedStatus(user.status.value);
    }
  }, [selectedUser]);

  useEffect(() => {
    if (initialData) {
      setIsModified(
        fullName !== initialData.name ||
          selectedCountry !== initialData.country.value ||
          selectedDepartment !== initialData.department.value ||
          selectedStatus !== initialData.status.value
      );
    }
  }, [
    fullName,
    selectedCountry,
    selectedDepartment,
    selectedStatus,
    initialData
  ]);

  const handleUndo = () => {
    if (initialData) {
      setFullName(initialData.name);
      setSelectedCountry(initialData.country.value);
      setSelectedDepartment(initialData.department.value);
      setSelectedStatus(initialData.status.value);
      setIsModified(false);
    }
  };

  const onSave = async () => {
    const updatedUsers = users.map((user) =>
      user.name === selectedUser
        ? {
            ...user,
            name: fullName,
            country: { ...user.country, value: selectedCountry },
            department: { ...user.department, value: selectedDepartment },
            status: { ...user.status, value: selectedStatus }
          }
        : user
    );

    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedUsers)
    });

    if (response.ok) {
      alert("User information updated successfully.");
      setUsers(updatedUsers);
      setIsModified(false);
    } else {
      alert("Failed to update user information.");
    }
  };

  return (
    <div className="p-8 m-5 border border-black">
      <h2 className="text-center font-semibold text-lg mb-6">EDIT USER</h2>

      <div className="mb-4">
        <label className="block font-medium mb-2">User</label>
        <Dropdown
          options={userOptions}
          width="50%"
          onSelect={(value: string) => setSelectedUser(value)}
          selectedValue={selectedUser}
        />
      </div>

      <h3 className="font-medium text-base mb-4">User Information</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="mb-4">
          <label className="block font-medium mb-2">Full Name</label>
          <Input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter full name"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-2">Country</label>
          <Dropdown
            options={countryOptions}
            width="100%"
            onSelect={(value: string) => setSelectedCountry(value)}
            selectedValue={selectedCountry}
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-2">Department</label>
          <Dropdown
            options={departmentOptions}
            width="100%"
            onSelect={(value: string) => setSelectedDepartment(value)}
            selectedValue={selectedDepartment}
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-2">Status</label>
          <Dropdown
            options={statusOptions}
            width="100%"
            onSelect={(value: string) => setSelectedStatus(value)}
            selectedValue={selectedStatus}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4 mt-6">
        {isModified && <Button onClick={handleUndo} label="Undo" />}
        <Button onClick={onSave} label="Save" width="120px" />
      </div>
    </div>
  );
};

export default EditUserPage;
