"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Styles from "./employee.module.css";

type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  position: string;
  hireDate: string;
  salary: number;
  imagePath?: string;
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
    position: "Barista",
    hireDate: "",
    salary: 0,
  });
  const [phoneError, setPhoneError] = useState<string | null>(null);

  // Fetch employees from the API on component mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("/api/employees");
      setEmployees(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching employees:", err);
      setError("Failed to load employees.");
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "phoneNumber") {
      if (value.length > 10) return; // Limiting phone number input
      setNewEmployee({ ...newEmployee, phoneNumber: value });
      setPhoneError(value.length !== 10 ? "Phone number must be exactly 10 digits" : null);
    } else {
      setNewEmployee({ ...newEmployee, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newEmployee.phoneNumber.length !== 10) {
      setPhoneError("Phone number must be exactly 10 digits");
      return;
    }

    try {
      if (editingId) {
        await handleUpdateEmployee();
      } else {
        await handleAddEmployee();
      }
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Failed to submit form.");
    }
  };

  const handleAddEmployee = async () => {
    const response = await fetch("/api/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEmployee),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to add employee");
    }

    const employee = await response.json();
    setEmployees([...employees, employee]);
  };

  const handleUpdateEmployee = async () => {
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
  };

  const handleEdit = (employee: Employee) => {
    setEditingId(employee.id);
    setNewEmployee({
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      phoneNumber: employee.phoneNumber,
      position: employee.position,
      hireDate: employee.hireDate.split("T")[0], // Format hireDate for input type="date"
      salary: employee.salary,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/employees/${id}`, { method: "DELETE" });
      setEmployees(employees.filter((employee) => employee.id !== id));
    } catch (error) {
      console.error("Error deleting employee:", error);
      setError("Failed to delete employee.");
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setNewEmployee({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      position: "Barista",
      hireDate: "",
      salary: 0,
    });
    setShowForm(false);
    setPhoneError(null);
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.top}>
        <h1 className={Styles.headerTitle}>Employee Dashboard</h1>
        <button className={Styles.addBtn} onClick={() => setShowForm(true)}>
          Add Employee
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <table className={Styles.table}>
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
        <div className={Styles.formContainer}>
          <form onSubmit={handleSubmit}>
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
            {phoneError && <p className={Styles.error}>{phoneError}</p>}
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
            <button type="submit" className={Styles.submitBtn}>
              {editingId ? "Update Employee" : "Add Employee"}
            </button>
            <button
              type="button"
              className={Styles.cancelBtn}
              onClick={resetForm}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
