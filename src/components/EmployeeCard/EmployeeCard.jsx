import React from "react";
import styles from './EmployeeCard.module.css';



const EmployeeCard=({employee, onEditClick, onDeleteClick, readOnly = false })=>{
    return(
        <div className={styles.card}>
            <img src={employee.profilePicture} width="80" alt="Profile"/>
            <h3> {employee.firstName} {employee.lastName}</h3>
            <p>{employee.position} - {employee.department}</p>
            <p>Email: {employee.email} </p>
            <p>Phone: {employee.phone}</p>
            <p>Salary: {employee.salary}</p>
            <p>HireDate: {employee.hireDate}</p>
            <p>Status: {employee.status}</p>
            <p>PerformanceRating: {employee.performanceRating}</p>
            <p>ManagerId: {employee.managerId}</p>
            {!readOnly && (
        <>
          <button className={styles.editButton} onClick={onEditClick}>Edit</button>
          <button className={styles.deleteButton} onClick={onDeleteClick}>Delete</button>
        </>
      )}

            
        </div>
    );
};

export default EmployeeCard