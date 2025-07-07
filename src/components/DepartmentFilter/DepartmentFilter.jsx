import React from 'react';
import styles from './DepartmentFilter.module.css';


const DepartmentFilter = ({ departments, selected, onChange }) => {
  const handleCheckboxChange = (dept) => {
    if (selected.includes(dept)) {
      onChange(selected.filter(d => d !== dept));
    } else {
      onChange([...selected, dept]);
    }
  };

  const handleSelectAll = () => {
    onChange(departments.map(d => d.name));
  };

  const handleClearAll = () => {
    onChange([]);
  };

    return (
    <div className={styles.filterContainer}>
        <div className={styles.header}>
        <span>Filter by Department:</span>
        <button onClick={handleSelectAll}>Select All</button>
        <button onClick={handleClearAll}>Clear All</button>
        </div>
        <div className={styles.departmentList}>
        {departments.map((dept, index) => (
            <label
            key={dept.name}
            className={`${styles.departmentItem} ${styles[`color${index % 7}`]}`}
            >
            <input
                type="checkbox"
                checked={selected.includes(dept.name)}
                onChange={() => handleCheckboxChange(dept.name)}
            />
            {dept.name} ({dept.count})
            </label>
        ))}
        </div>
    </div>
    );
}

export default DepartmentFilter;
