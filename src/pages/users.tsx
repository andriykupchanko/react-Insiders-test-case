// src/pages/Users.tsx
"use client";

import React, { useEffect, useState } from "react";
import Filter from "../app/components/Filter";
import AddUserPopup from "../app/components/AddUserPopup";
import Button from "../app/components/Button";
import ButtonIcon from "../app/components/ButtonIcon";
import usersData from "../app/data/users.json";
import countries from "../app/data/countries.json";
import departments from "../app/data/departments.json";
import statuses from "../app/data/statuses.json";
import { User, Country, Department, Status } from "../app/types/moduls";

const Users: React.FC = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [filteredData, setFilteredData] = useState<User[]>(usersData as User[]);
  const [departmentsOptions, setDepartmentsOptions] = useState<Department[]>(
    []
  );
  const [countriesOptions, setCountriesOptions] = useState<Country[]>([]);
  const [statusesOptions, setStatusesOptions] = useState<Status[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  useEffect(() => {
    setDepartmentsOptions(
      departments.map((dep: Department) => ({
        name: dep.name,
        value: dep.value
      }))
    );

    setCountriesOptions(
      countries.map((country: Country) => ({
        name: country.name,
        value: country.value
      }))
    );

    setStatusesOptions(
      statuses.map((status: Status) => ({
        name: status.name,
        value: status.value
      }))
    );
  }, []);

  useEffect(() => {
    const filteredUsers = usersData.filter((user) => {
      const matchesDepartment = selectedDepartment
        ? user.department.value === selectedDepartment
        : true;
      const matchesCountry = selectedCountry
        ? user.country.value === selectedCountry
        : true;
      const matchesStatus = selectedStatus
        ? user.status.value === selectedStatus
        : true;

      return matchesDepartment && matchesCountry && matchesStatus;
    });

    setFilteredData(filteredUsers);
  }, [selectedDepartment, selectedCountry, selectedStatus]);

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
    setSelectedDepartment(department);
    setSelectedCountry(country);
    setSelectedStatus(status);
  };

  const handleDeleteUser = (userName: string) => {
    const updatedData = filteredData.filter((user) => user.name !== userName);
    setFilteredData(updatedData);
  };

  return (
    <div className="p-8 m-5 border border-black">
      <h2 className="text-center font-semibold text-lg mb-6">USERS</h2>
      <div className="flex mb-6 justify-center">
        <Filter
          departments={departmentsOptions}
          countries={countriesOptions}
          statuses={statusesOptions}
          onFilterChange={handleFilterChange}
        />
        <div className="ml-4 mt-8">
          <Button onClick={handleOpenPopup} label="Add User" />
          {isPopupVisible && <AddUserPopup onClose={handleClosePopup} />}
        </div>
      </div>
      <div className="overflow-y-auto" style={{ maxHeight: "300px" }}>
        <div className="min-w-full border-collapse">
          <table className="min-w-full">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                <th className="border border-gray-500 px-4 py-2">Full Name</th>
                <th className="border border-gray-500 px-4 py-2">Department</th>
                <th className="border border-gray-500 px-4 py-2">Country</th>
                <th className="border border-gray-500 px-4 py-2">Status</th>
                <th className="border border-gray-500 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((user) => (
                <tr
                  key={user.name}
                  className="hover:bg-gray-50 border border-y-gray-500"
                >
                  <td className="border border-white px-4 py-2">{user.name}</td>
                  <td className="border border-white px-4 py-2">
                    {user.department.name}
                  </td>
                  <td className="border border-white px-4 py-2">
                    {user.country.name}
                  </td>
                  <td className="border border-white px-4 py-2">
                    {user.status.name}
                  </td>
                  <td className="border border-white px-4 py-2">
                    <div className="flex justify-center">
                      <ButtonIcon
                        iconSrc="https://img.icons8.com/?size=100&id=68064&format=png&color=000000"
                        onClick={() => handleDeleteUser(user.name)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
