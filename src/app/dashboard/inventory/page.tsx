import React from 'react'
import Styles from './inventory.module.css'
export default function InventoryDashboard() {

  
  return (
    <div className={Styles.container}>
      <div className={Styles.top}>
        <h1 className={Styles.headerTitle}>Employee Dashboard</h1>
        <button className={Styles.addBtn}>
          Add Employee
        </button>
        <table className={Styles.table}>
        <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
        </table>
      </div>
    </div>
  )
}
