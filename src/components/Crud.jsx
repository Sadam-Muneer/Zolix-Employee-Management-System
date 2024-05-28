import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Sidebar from "./Sidebar";

const EmployeeCrud = () => {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    position: "",
    department: "",
    daysPresent: "",
    salary: "",
    lateDays: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editEmployeeId, setEditEmployeeId] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddEmployee = () => {
    if (
      !formData.name ||
      !formData.position ||
      !formData.department ||
      formData.daysPresent <= 0 ||
      formData.daysPresent > 30 ||
      formData.salary <= 0 ||
      formData.lateDays < 0
    ) {
      toast.error(
        "Please fill in all fields and ensure days present are between 1 and 30, salary is greater than zero, and late days are non-negative."
      );
      return;
    }

    if (editMode) {
      const updatedEmployees = employees.map((emp) =>
        emp.id === editEmployeeId ? formData : emp
      );
      setEmployees(updatedEmployees);
      setEditMode(false);
      setEditEmployeeId(null);
      toast.success("Employee updated successfully!");
    } else {
      setEmployees([...employees, { ...formData, id: Date.now() }]);
      toast.success("Employee added successfully!");
    }
    setFormData({
      id: "",
      name: "",
      position: "",
      department: "",
      daysPresent: "",
      salary: "",
      lateDays: "",
    });
  };

  const handleEditEmployee = (id) => {
    const employeeToEdit = employees.find((emp) => emp.id === id);
    setFormData({ ...employeeToEdit });
    setEditMode(true);
    setEditEmployeeId(id);
  };

  const handleDeleteEmployee = (id) => {
    const updatedEmployees = employees.filter((emp) => emp.id !== id);
    setEmployees(updatedEmployees);
    toast.success("Employee deleted successfully!");
  };

  const calculateSalaryDeduction = (daysPresent, salary, lateDays) => {
    const baseSalary = parseFloat(salary);
    const days = parseInt(daysPresent);
    const late = parseInt(lateDays);

    if (isNaN(baseSalary) || isNaN(days) || isNaN(late)) {
      return "Invalid";
    }

    const dailySalary = baseSalary / 30;
    const totalDeduction = dailySalary * (30 - days) + (dailySalary / 2) * late;
    const finalSalary = baseSalary - totalDeduction;

    return finalSalary.toFixed(2);
  };

  const generatePDF = () => {
    if (employees.length === 0) {
      toast.error("No data available to generate a report.");
      return;
    }

    const doc = new jsPDF();

    const tableRows = employees.map((emp) => [
      emp.name,
      emp.position,
      emp.department,
      emp.daysPresent,
      emp.salary,
      calculateSalaryDeduction(emp.daysPresent, emp.salary, emp.lateDays),
    ]);

    doc.autoTable({
      head: [
        [
          "Name",
          "Position",
          "Department",
          "Days Present",
          "Complete Salary",
          "Salary After Deduction",
        ],
      ],
      body: tableRows,
      theme: "grid",
      styles: {
        cellPadding: 3,
        fontSize: 10,
        halign: "center",
        valign: "middle",
      },
      headStyles: {
        fillColor: [0, 0, 0],
        textColor: [255, 255, 255],
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240],
      },
    });

    doc.save("zolix-employees.pdf");
  };

  return (
    <>
      <Sidebar />
      <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Manage Employees Data</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 rounded-md w-full"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Position"
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 rounded-md w-full"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Department"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 rounded-md w-full"
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Days Present"
              name="daysPresent"
              value={formData.daysPresent}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 rounded-md w-full"
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Salary"
              name="salary"
              value={formData.salary}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 rounded-md w-full"
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Late Days"
              name="lateDays"
              value={formData.lateDays}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 rounded-md w-full"
            />
          </div>
        </div>
        <button
          onClick={handleAddEmployee}
          className={`${
            editMode
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-black hover:bg-green-600"
          } text-white px-4 py-2 rounded-md mt-4 `}
        >
          {editMode ? "Update Employee" : "Submit"}
        </button>
        <button
          onClick={generatePDF}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md mt-4 ml-2"
        >
          Generate PDF Report
        </button>
      </div>
      <div id="pdf-content" style={{ display: "none" }}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Department</th>
              <th>Days Present</th>
              <th>Complete Salary</th>
              <th>Salary After Deduction</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.name}</td>
                <td>{emp.position}</td>
                <td>{emp.department}</td>
                <td>{emp.daysPresent}</td>
                <td>{emp.salary}</td>
                <td>
                  {calculateSalaryDeduction(
                    emp.daysPresent,
                    emp.salary,
                    emp.lateDays
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-full max-container mt-8">
        <h3 className="text-lg font-semibold mb-2">Employees:</h3>
        <table className="min-w-full divide-y divide-gray-200 border border-collapse">
          <thead className="bg-black text-white">
            <tr>
              <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider border border-gray-300">
                Name
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider border border-gray-300">
                Position
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider border border-gray-300">
                Department
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider border border-gray-300">
                Days Present
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider border border-gray-300">
                Complete Salary
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider border border-gray-300">
                Salary After Deduction
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider border border-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {employees.map((emp) => (
              <tr key={emp.id} className="border border-gray-300">
                <td className="px-6 py-4 whitespace-nowrap border border-gray-300">
                  {emp.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border border-gray-300">
                  {emp.position}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border border-gray-300">
                  {emp.department}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border border-gray-300">
                  {emp.daysPresent}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border border-gray-300">
                  {emp.salary}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border border-gray-300">
                  {emp.salary &&
                    calculateSalaryDeduction(
                      emp.daysPresent,
                      emp.salary,
                      emp.lateDays
                    )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border border-gray-300">
                  <button
                    onClick={() => handleEditEmployee(emp.id)}
                    className="bg-black text-white py-1 px-3 hover:bg-green-600 rounded-md mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this employee?"
                        )
                      ) {
                        handleDeleteEmployee(emp.id);
                      }
                    }}
                    className="bg-black text-white py-1 px-3 hover:bg-green-600 rounded-md mr-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </>
  );
};

export default EmployeeCrud;
