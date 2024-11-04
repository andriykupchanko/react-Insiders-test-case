// src/pages/Users.tsx
"use client";

import React, { useEffect, useState } from "react";
import Filter from "../app/components/Filter"; // Import the Filter component
import AddUserPopup from "../app/components/AddUserPopup"; // Import the Add User Popup
import Button from "../app/components/Button"; // Import your button
import usersData from "../app/data/users.json"; // Ensure this path is correct and accessible
import countries from "../app/data/countries.json"; // Ensure this path is correct and accessible
import departments from "../app/data/departments.json"; // Ensure this path is correct and accessible
import statuses from "../app/data/statuses.json"; // Ensure this path is correct and accessible
import { User, Country, Department, Status } from "../app/types/moduls";

const Users: React.FC = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [userOptions, setUserOptions] = useState<
    { name: string; value: string }[]
  >([]);
  const [countryOptions, setCountryOptions] = useState<
    { name: string; value: string }[]
  >([]);
  const [departmentOptions, setDepartmentOptions] = useState<
    { name: string; value: string }[]
  >([]);
  const [statusOptions, setStatusOptions] = useState<
    { name: string; value: string }[]
  >([]);

  useEffect(() => {
    // Load user options
    const loadedUserOptions = (usersData as User[]).map((user) => ({
      name: user.name,
      value: user.name
    }));
    setUserOptions(loadedUserOptions);

    // Load country options
    const loadedCountryOptions = (countries as Country[]).map((country) => ({
      name: country.name,
      value: country.value
    }));
    setCountryOptions(loadedCountryOptions);

    // Load department options
    const loadedDepartmentOptions = (departments as Department[]).map(
      (department) => ({
        name: department.name,
        value: department.value
      })
    );
    setDepartmentOptions(loadedDepartmentOptions);

    // Load status options
    const loadedStatusOptions = (statuses as Status[]).map((status) => ({
      name: status.name,
      value: status.value
    }));
    setStatusOptions(loadedStatusOptions);
  }, []);

  const handleOpenPopup = () => {
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  const handleFilterChange = (
    department: string,
    country: string,
    status: string
  ) => {
    console.log("Filters applied: ", { department, country, status });
  };

  return (
    <div className="p-8">
      <h2 className="text-center font-semibold text-lg mb-6">USERS</h2>
      <div className="flex">
        <Filter
          departments={departmentOptions}
          countries={countryOptions}
          statuses={statusOptions}
          onFilterChange={handleFilterChange}
        />
        <div className="mb-6 ml-10">
          <Button onClick={handleOpenPopup} label="Add User" />
          {isPopupVisible && <AddUserPopup onClose={handleClosePopup} />}
        </div>
      </div>
    </div>
  );
};

export default Users;
