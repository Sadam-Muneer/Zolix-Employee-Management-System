import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const mockEmployees = [
      {
        id: 1,
        name: "Abdullah Malik",
        position: "Wordpress Developer",
        department: "Development",
        email: "abdullah@gmail.com",
        address: "Multan",
      },
      {
        id: 2,
        name: "Muhammad Sadam Muneer",
        position: "MERN Stack developer",
        department: "Development",
        email: "sadam@gmail.com",
        address: "Multan",
      },
      {
        id: 3,
        name: "Mudassir Nasir",
        position: "Graphic Designer",
        department: "Design",
        email: "mudassir@gmail.com",
        address: "Multan",
      },
      {
        id: 4,
        name: "Bilal Rafique",
        position: "MERN Stack developer",
        department: "Development",
        email: "bilal@gmail.com",
        address: "Multan",
      },
      {
        id: 5,
        name: "Hamza Zahoor",
        position: "Social Media Manager",
        department: "Social Media",
        email: "hamza@gmail.com",
        address: "Multan",
      },
      {
        id: 6,
        name: "Mishaal Sheikh",
        position: "Graphic Designer",
        department: "Design",
        email: "mishaal@gmail.com",
        address: "Multan",
      },
    ];

    setEmployees(mockEmployees);
  }, []);

  return (
    <>
      <Sidebar />
      <div className="max-w-4xl mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">Employee List</h2>
        <p className="mb-4">Total Employees: {employees.length}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {employees.map((employee) => (
            <div
              key={employee.id}
              className="bg-white rounded-lg shadow-md p-4 border border-black transition-transform hover:shadow-lg hover:scale-105"
            >
              <h3 className="text-xl font-semibold mb-2">{employee.name}</h3>
              <p className="text-gray-600 mb-1">
                Position: {employee.position}
              </p>
              <p className="text-gray-600 mb-1">
                Department: {employee.department}
              </p>
              <p className="text-gray-600 mb-1">Email: {employee.email}</p>
              <p className="text-gray-600 mb-1">Address: {employee.address}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default EmployeeList;
