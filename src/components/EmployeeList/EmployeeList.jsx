import React from "react";
import EmployeeCard from "../EmployeeCard/EmployeeCard";
import styles from './EmployeeList.module.css';


const EmployeeList = ({ employees, onEditClick, onDeleteClick, onSort, sortKey, sortOrder }) => {
  const handleSortClick = (key) => {
    onSort(key);
  };

  const renderSortIndicator = (key) => {
    if (sortKey !== key) return '';
    return sortOrder === 'asc' ? ' asc' : ' dsc';
  };
  return (
    <>
    <div className={styles.sortControls}>
        <span>Sort by: </span>
        <button onClick={() => handleSortClick("id")}>
          ID{renderSortIndicator("id")}
        </button>
        <button onClick={() => handleSortClick("firstName")}>
          First Name{renderSortIndicator("firstName")}
        </button>
        <button onClick={() => handleSortClick("lastName")}>
          Last Name{renderSortIndicator("lastName")}
        </button>
        <button onClick={() => handleSortClick("email")}>
          Email{renderSortIndicator("email")}
        </button>
        <button onClick={() => handleSortClick("department")}>
          Dept{renderSortIndicator("department")}
        </button>
      </div>

    <div className={styles.listContainer}>
      {employees && employees.length > 0 ? (
        employees.map((emp) => (
            <EmployeeCard
              key={emp.id}
              employee={emp}
              onEditClick={() => onEditClick(emp)}
              onDeleteClick={() => onDeleteClick(emp.id)}/>
          ))
      ) : (
        <p>No employees to display.</p>
      )}
    </div>
    </>
  );
};



export default EmployeeList;