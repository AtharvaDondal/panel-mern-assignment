import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import "../createEmployee/createEmployee.css";

const CreateEmployee = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    courses: [],
    image: null,
    createDate: new Date().toLocaleDateString(),
  });
  const [error, setError] = useState({});
  const location = useLocation();

  const { employeeToEdit } = location.state || {}; // Get the passed employee data

  const validateForm = () => {
    const newErrors = {};
    if (!employee.name) newErrors.name = "Name is required";
    if (!employee.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(employee.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!employee.mobile || isNaN(employee.mobile))
      newErrors.mobile = "Valid mobile number is required";
    if (!employee.designation)
      newErrors.designation = "Designation is required";
    if (!employee.gender) newErrors.gender = "Gender is required";
    if (!employee.courses.length)
      newErrors.courses = "At least one course must be selected";
    if (!employee.image) newErrors.image = "Image upload is required";

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (employeeToEdit) {
      setEmployee({ ...employeeToEdit });
    }
  }, [employeeToEdit]);

  //   const handleChange = (e) => {
  //     const { name, value, type, checked } = e.target;
  //     if (type === "checkbox") {
  //       setEmployee((prev) => ({
  //         ...prev,
  //         courses: checked
  //           ? [...prev.courses, value]
  //           : prev.courses.filter((course) => course !== value),
  //       }));
  //     } else if (type === "file") {
  //       setEmployee({ ...employee, image: e.target.files[0] });
  //     } else {
  //       setEmployee({ ...employee, [name]: value });
  //     }
  //   };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setEmployee((prev) => ({
        ...prev,
        courses: checked
          ? [...prev.courses, value]
          : prev.courses.filter((course) => course !== value),
      }));
    } else if (type === "file") {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setEmployee({ ...employee, image: reader.result }); // Store base64
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    } else {
      setEmployee({ ...employee, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const employees = JSON.parse(localStorage.getItem("employees")) || [];
      employees.push(employee);
      localStorage.setItem("employees", JSON.stringify(employees));
      alert("Employee created successfully");
      navigate("/employee-list");
    }
  };

  return (
    <div>
      {/* <h2>Create Employee</h2> */}
      <h2>{employeeToEdit ? "Edit Employee" : "Create Employee"}</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Name:{" "}
          <input
            type="text"
            name="name"
            value={employee.name}
            onChange={handleChange}
          />
        </label>
        {error.name && <p style={{ color: "red" }}>{error.name}</p>}

        <label>
          Email:{" "}
          <input
            type="email"
            name="email"
            value={employee.email}
            onChange={handleChange}
          />
        </label>
        {error.email && <p style={{ color: "red" }}>{error.email}</p>}

        <label>
          Mobile No:{" "}
          <input
            type="text"
            name="mobile"
            value={employee.mobile}
            onChange={handleChange}
          />
        </label>
        {error.mobile && <p style={{ color: "red" }}>{error.mobile}</p>}

        <label>
          Designation:
          <select
            name="designation"
            value={employee.designation}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </label>
        {error.designation && (
          <p style={{ color: "red" }}>{error.designation}</p>
        )}

        {/* <label>
          Gender:
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              onChange={handleChange}
            />{" "}
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              onChange={handleChange}
            />{" "}
            Female
          </label>
        </label> */}
        <label>
          Gender:
          <label>
            Male
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={employee.gender === "Male"} // Ensure this matches the state
              onChange={handleChange}
            />{" "}
          </label>
          <label>
            Female
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={employee.gender === "Female"} // Ensure this matches the state
              onChange={handleChange}
            />{" "}
          </label>
        </label>
        {error.gender && <p style={{ color: "red" }}>{error.gender}</p>}

        {/* <label>
          Courses:
          <label>
            <input
              type="checkbox"
              name="courses"
              value="MCA"
              onChange={handleChange}
            />{" "}
            MCA
          </label>
          <label>
            <input
              type="checkbox"
              name="courses"
              value="BCA"
              onChange={handleChange}
            />{" "}
            BCA
          </label>
          <label>
            <input
              type="checkbox"
              name="courses"
              value="BSC"
              onChange={handleChange}
            />{" "}
            BSC
          </label>
        </label> */}

        <label>
          Courses:
          <label>
            MCA
            <input
              type="checkbox"
              name="courses"
              value="MCA"
              checked={employee.courses.includes("MCA")} // Check if 'MCA' is in the array
              onChange={handleChange}
            />{" "}
          </label>
          <label>
            BCA
            <input
              type="checkbox"
              name="courses"
              value="BCA"
              checked={employee.courses.includes("BCA")} // Check if 'BCA' is in the array
              onChange={handleChange}
            />{" "}
          </label>
          <label>
            BSC
            <input
              type="checkbox"
              name="courses"
              value="BSC"
              checked={employee.courses.includes("BSC")} // Check if 'BSC' is in the array
              onChange={handleChange}
            />{" "}
          </label>
        </label>

        {error.courses && <p style={{ color: "red" }}>{error.courses}</p>}

        <label>
          Image Upload:{" "}
          <input
            type="file"
            name="image"
            accept=".jpg,.png"
            onChange={handleChange}
          />
        </label>
        {error.image && <p style={{ color: "red" }}>{error.image}</p>}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateEmployee;
