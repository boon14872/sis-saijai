"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./employee.module.css";
import { MdEdit, MdDelete } from "react-icons/md";

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
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null); // สำหรับเก็บข้อมูลพนักงานที่ต้องการแก้ไข

  useEffect(() => {
    axios
      .get("/api/employees") // เรียก API เพื่อดึงข้อมูลพนักงาน
      .then((response) => {
        setEmployees(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load employees.");
        setLoading(false);
      });
  }, []);

  // ฟังก์ชันสำหรับลบพนักงาน
  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this employee?")) {
      axios
        .delete(`/api/employees/${id}`)
        .then(() => {
          setEmployees(employees.filter((employee) => employee.id !== id));
        })
        .catch((error) => {
          console.error("Error deleting employee:", error);
          setError("Failed to delete employee.");
        });
    }
  };

  // ฟังก์ชันสำหรับแก้ไขพนักงาน
  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee);
    setShowEditForm(true); // แสดงฟอร์มแก้ไข
  };

  // ฟังก์ชันสำหรับบันทึกการแก้ไข
  const handleUpdateEmployee = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedEmployee) {
      axios
        .patch(`/api/employees/${selectedEmployee.id}`, selectedEmployee)
        .then((response) => {
          setEmployees(
            employees.map((emp) => (emp.id === selectedEmployee.id ? response.data : emp))
          );
          setShowEditForm(false); // ปิดฟอร์มหลังจากบันทึกสำเร็จ
          setSelectedEmployee(null); // รีเซ็ตข้อมูลพนักงานที่เลือก
        })
        .catch((error) => {
          console.error("Error updating employee:", error);
          setError("Failed to update employee.");
        });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h1>Employee Dashboard</h1>
        <button className={styles.addBtn}>Add Employee</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
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
                <td>{employee.salary} ฿</td>
                <td>
                  <button className={styles.editBtn} onClick={() => handleEdit(employee)}>
                    <MdEdit /> Edit
                  </button>
                  <button className={styles.deleteBtn} onClick={() => handleDelete(employee.id)}>
                    <MdDelete /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ฟอร์มสำหรับแก้ไขพนักงาน */}
      {showEditForm && selectedEmployee && (
        <form onSubmit={handleUpdateEmployee} className={styles.form}>
          <h2>Edit Employee</h2>
          <input
            type="text"
            placeholder="First Name"
            value={selectedEmployee.firstName}
            onChange={(e) =>
              setSelectedEmployee({ ...selectedEmployee, firstName: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={selectedEmployee.lastName}
            onChange={(e) =>
              setSelectedEmployee({ ...selectedEmployee, lastName: e.target.value })
            }
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={selectedEmployee.email}
            onChange={(e) =>
              setSelectedEmployee({ ...selectedEmployee, email: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={selectedEmployee.phoneNumber}
            onChange={(e) =>
              setSelectedEmployee({ ...selectedEmployee, phoneNumber: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Position"
            value={selectedEmployee.position}
            onChange={(e) =>
              setSelectedEmployee({ ...selectedEmployee, position: e.target.value })
            }
            required
          />
          <input
            type="date"
            placeholder="Hire Date"
            value={selectedEmployee.hireDate}
            onChange={(e) =>
              setSelectedEmployee({ ...selectedEmployee, hireDate: e.target.value })
            }
            required
          />
          <input
            type="number"
            placeholder="Salary"
            value={selectedEmployee.salary}
            onChange={(e) =>
              setSelectedEmployee({ ...selectedEmployee, salary: parseFloat(e.target.value) })
            }
            required
          />
          <button type="submit">Save Changes</button>
        </form>
      )}
    </div>
  );
}
