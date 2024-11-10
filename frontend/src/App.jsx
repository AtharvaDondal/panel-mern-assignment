import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import Dashboard from "./pages/Dashboard";
import { useAuth } from "./Auth/AuthContext";
import CreateEmployee from "./components/createEmployee/createEmployee";
import EmployeeList from "./components/EmployeeList/EmployeeList";

function App() {
  const { isAuthenticated } = useAuth();
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              !isAuthenticated ? <Register /> : <Navigate to={"/login"} />
            }
          />
          <Route
            path="/login"
            element={
              !isAuthenticated ? <Login /> : <Navigate to={"/dashboard"} />
            }
          />
          <Route path="/create-employee" element={<CreateEmployee />} />
          <Route path="/employee-list" element={<EmployeeList />} />

          <Route
            path="/dashboard"
            element={
              isAuthenticated ? <Dashboard /> : <Navigate to={"/login"} />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
