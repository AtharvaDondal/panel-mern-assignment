import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
    setEmployees(storedEmployees);
  }, []);

  //   const handleEdit = (index) => {
  //     const employeeToEdit = employees[index];
  //     navigate("/create-employee", { state: { employeeToEdit, index } });
  //   };

  const handleEdit = (index) => {
    const employeeToEdit = employees[index];

    // Remove the employee being edited from local storage
    const updatedEmployees = employees.filter((_, i) => i !== index);
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));

    // Navigate to the CreateEmployee page with the employee data and index
    navigate("/create-employee", { state: { employeeToEdit, index } });
  };

  const handleDelete = (index) => {
    const updatedEmployees = employees.filter(
      (_, empIndex) => empIndex !== index
    );
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
    setEmployees(updatedEmployees);
  };

  return (
    <div>
      <h2>Employee List</h2>
      {employees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Unique Id</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile No</th>
              <th>Designation</th>
              <th>Gender</th>
              <th>Course</th>
              <th>Create Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  {emp.image && (
                    <img src={emp.image} alt="Profile" width="50" />
                  )}
                </td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.mobile}</td>
                <td>{emp.designation}</td>
                <td>{emp.gender}</td>
                <td>{emp.courses.join(", ")}</td>
                <td>{emp.createDate}</td>
                <td>
                  <button onClick={() => handleEdit(index)}>Edit</button>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmployeeList;
