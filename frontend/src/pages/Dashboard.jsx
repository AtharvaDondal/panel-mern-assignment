import React, { useState } from "react";
import "./Dashboard.css";
import { useAuth } from "../Auth/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { userData, logout, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false); // Toggle between view/edit mode
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: userData?.name || "",
    email: userData?.email || "",
  });

  const handleNavigateToCreateEmployee = () => {
    navigate("/create-employee");
  };

  // Toggle editing mode
  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  // Handle form changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Update user data when the form is submitted
  const handleSave = () => {
    const updatedUser = { ...userData, ...formData };
    updateUser(updatedUser); // Call updateUser to save changes
    setIsEditing(false); // Exit edit mode
  };

  if (!userData) {
    return <div>Loading...</div>; // Show a loading indicator while data is loading
  }

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">User Dashboard</h1>

      <button onClick={handleNavigateToCreateEmployee}>Create Employee</button>

      <div className="user-info">
        <p>
          <strong>Name:</strong>{" "}
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          ) : (
            userData.name
          )}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          ) : (
            userData.email
          )}
        </p>
      </div>

      <div className="dashboard-actions">
        {isEditing ? (
          <>
            <button className="save-button" onClick={handleSave}>
              Save
            </button>

            <button className="cancel-button" onClick={toggleEdit}>
              Cancel
            </button>
          </>
        ) : (
          <button className="edit-button" onClick={toggleEdit}>
            Edit Info
          </button>
        )}
        <button className="logout-button" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;

// import React, { useState, useEffect } from "react";
// import "./Dashboard.css";
// import { useAuth } from "../Auth/AuthContext";

// const Dashboard = () => {
//   const { userData, logout, updateUser } = useAuth();
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");

//   // Ensure name and email are set once userData is available
//   useEffect(() => {
//     if (userData) {
//       setName(userData.name || "");
//       setEmail(userData.email || "");
//     }
//   }, [userData]);

//   const handleEdit = async () => {
//     const updatedUser = { name, email };

//     try {
//       const response = await fetch("http://localhost:3000/api/users/update", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${userData.token}`,
//         },
//         body: JSON.stringify(updatedUser),
//       });

//       // Check if the response is JSON
//       const contentType = response.headers.get("content-type");
//       if (contentType && contentType.indexOf("application/json") !== -1) {
//         const data = await response.json();
//         if (!response.ok) {
//           throw new Error(data.message || "Failed to update user");
//         }
//         updateUser(data.user); // Assuming the response has 'user' data
//         alert("User updated successfully");
//       } else {
//         // Handle non-JSON response (like an error page)
//         throw new Error("Unexpected response format");
//       }
//     } catch (error) {
//       console.error("Error updating user:", error);
//       alert(error.message);
//     }
//   };

//   if (!userData) {
//     return <div>Loading...</div>; // Or any loading indicator
//   }

//   return (
//     <div className="dashboard-container">
//       <h1 className="dashboard-title">User Dashboard</h1>
//       <div className="user-info">
//         <div>
//           <label>
//             <strong>Name:</strong>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//           </label>
//         </div>
//         <div>
//           <label>
//             <strong>Email:</strong>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </label>
//         </div>
//       </div>
//       <div className="dashboard-actions">
//         <button className="edit-button" onClick={handleEdit}>
//           Update Info
//         </button>
//         <button className="logout-button" onClick={logout}>
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
