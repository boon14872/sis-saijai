
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./employee.module.css";

type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  position: string;
  hireDate: string;
  salary: number;
};

export default function EmployeeDashboard() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newEmployee, setNewEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    position: "",
    hireDate: "",
    salary: 0,
  });
  const [phoneError, setPhoneError] = useState<string | null>(null);

  // Fetch employees from the API
  useEffect(() => {
    axios
      .get("/api/employees")
      .then((response) => {
        setEmployees(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching employees:", err);
        setError("Failed to load employees.");
        setLoading(false);
      });
  }, []);

  // Handle changes in the form
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "phoneNumber") {
      if (value.length > 10) return; // Prevent entering more than 10 digits
      setNewEmployee({ ...newEmployee, phoneNumber: value });

      if (value.length !== 10) {
        setPhoneError("Phone number must be exactly 10 digits");
      } else {
        setPhoneError(null);
      }
    } else {
      setNewEmployee({ ...newEmployee, [name]: value });
    }
  };

// Add logs inside the handleAddEmployee function
const handleAddEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
  
    console.log("Submitting form with data:", newEmployee); // Log the form data before submission
  
    if (newEmployee.phoneNumber.length !== 10) {
      alert("Phone number must be exactly 10 digits");
      return;
    }
  
    try {
      const response = await fetch("/api/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEmployee),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error from API:", errorData);
        throw new Error(errorData.error || "Failed to add employee");
      }
  
      const employee = await response.json();
      console.log("Employee added successfully:", employee); // Log successful addition
  
      setEmployees([...employees, employee]);
      setNewEmployee({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        position: "",
        hireDate: "",
        salary: 0,
      });
      setShowForm(false);
    } catch (error) {
      console.error("Error adding employee:", error); // Log the error if adding fails
      setError("Failed to add employee.");
    }
  };

  // Edit employee
  const handleEdit = (employee: Employee) => {
    setEditingId(employee.id);
    setNewEmployee({
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      phoneNumber: employee.phoneNumber,
      position: employee.position,
      hireDate: employee.hireDate.split("T")[0],
      salary: employee.salary,
    });
    setShowForm(true);
  };

  // Save the updated employee
  const handleUpdateEmployee = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newEmployee.phoneNumber.length !== 10) {
      alert("Phone number must be exactly 10 digits");
      return;
    }

    try {
      const response = await fetch(`/api/employees/${editingId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEmployee),
      });

      if (!response.ok) {
        throw new Error("Failed to update employee");
      }

      const updatedEmployee = await response.json();
      setEmployees(
        employees.map((emp) =>
          emp.id === editingId ? { ...emp, ...updatedEmployee } : emp
        )
      );
      setEditingId(null);
      setNewEmployee({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        position: "",
        hireDate: "",
        salary: 0,
      });
      setShowForm(false);
    } catch (error) {
      console.error("Error updating employee:", error);
      setError("Failed to update employee.");
    }
  };

  // Delete employee
  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/employees/${id}`, { method: "DELETE" });
      setEmployees(employees.filter((employee) => employee.id !== id));
    } catch (error) {
      console.error("Error deleting employee:", error);
      setError("Failed to delete employee.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h1 className={styles.headerTitle}>Employee Dashboard</h1>
        <button className={styles.addBtn} onClick={() => setShowForm(true)}>
          Add Employee
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Position</th>
                <th>Hire Date</th>
                <th>Salary</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.email}</td>
                  <td>{employee.phoneNumber}</td>
                  <td>{employee.position}</td>
                  <td>{new Date(employee.hireDate).toLocaleDateString()}</td>
                  <td>{employee.salary}</td>
                  <td>
                    <button onClick={() => handleEdit(employee)}>Edit</button>
                    <button onClick={() => handleDelete(employee.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {showForm && (
        <div className={styles.formContainer}>
          <form
            onSubmit={editingId ? handleUpdateEmployee : handleAddEmployee}
          >
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={newEmployee.firstName}
              onChange={handleChange}
              required
            />
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={newEmployee.lastName}
              onChange={handleChange}
              required
            />
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={newEmployee.email}
              onChange={handleChange}
              required
            />
            <label>Phone</label>
            <input
              type="text"
              name="phoneNumber"
              value={newEmployee.phoneNumber}
              onChange={handleChange}
              required
            />
            {phoneError && <p className={styles.error}>{phoneError}</p>}
            <label>Position</label>
            <select
              name="position"
              value={newEmployee.position}
              onChange={handleChange}
              required
            >
              <option value="Barista">Barista</option>
              <option value="Cashier">Cashier</option>
              <option value="Admin">Admin</option>
              <option value="Owner">Owner</option>
            </select>
            <label>Hire Date</label>
            <input
              type="date"
              name="hireDate"
              value={newEmployee.hireDate}
              onChange={handleChange}
              required
            />
            <label>Salary</label>
            <input
              type="number"
              name="salary"
              value={newEmployee.salary}
              onChange={handleChange}
              required
            />
            <button type="submit" className={styles.submitBtn}>
              {editingId ? "Update Employee" : "Add Employee"}
            </button>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
