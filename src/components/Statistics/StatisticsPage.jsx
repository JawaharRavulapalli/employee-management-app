import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeCard from '../EmployeeCard/EmployeeCard';
import styles from './StatisticsPage.module.css';

function StatisticsPage({ employees }) {
  const navigate = useNavigate();

  const [selectedIds, setSelectedIds] = useState([]);

  const handleCheckboxChange = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedIds(employees.map(emp => emp.id));
  };

  const handleClearAll = () => {
    setSelectedIds([]);
  };

  const selectedEmployees = useMemo(
    () => employees.filter(emp => selectedIds.includes(emp.id)),
    [employees, selectedIds]
  );

  const stats = useMemo(() => {
    if (selectedEmployees.length === 0) return null;

    const salaries = selectedEmployees
      .map(emp => Number(emp.salary))
      .filter(salary => !isNaN(salary) && salary > 0);

    const avg = salaries.length
      ? (salaries.reduce((a, b) => a + b, 0) / salaries.length).toFixed(2)
      : 0;

    return {
      total: selectedEmployees.length,
      avgSalary: avg,
      minSalary: salaries.length ? Math.min(...salaries) : 0,
      maxSalary: salaries.length ? Math.max(...salaries) : 0,
    };
  }, [selectedEmployees]);

  const departmentBreakdown = useMemo(() => {
    const deptMap = {};
    selectedEmployees.forEach(emp => {
      deptMap[emp.department] = (deptMap[emp.department] || 0) + 1;
    });
    return deptMap;
  }, [selectedEmployees]);

  const newestOldest = useMemo(() => {
    if (selectedEmployees.length === 0) return { newest: null, oldest: null };

    const sorted = [...selectedEmployees].sort(
      (a, b) => new Date(a.hireDate) - new Date(b.hireDate)
    );
    return {
      oldest: sorted[0],
      newest: sorted[sorted.length - 1],
    };
  }, [selectedEmployees]);

  const salaryRanges = useMemo(() => {
    const ranges = {
      '<50k': 0,
      '50k–100k': 0,
      '100k–150k': 0,
      '150k+': 0,
    };
    selectedEmployees.forEach(emp => {
      const sal = Number(emp.salary);
      if (sal < 50000) ranges['<50k']++;
      else if (sal <= 100000) ranges['50k–100k']++;
      else if (sal <= 150000) ranges['100k–150k']++;
      else ranges['150k+']++;
    });
    return ranges;
  }, [selectedEmployees]);

  return (
    <div className={styles.container}>

      <div className={styles.buttons}>
        <button className={styles.home} onClick={() => navigate('/')}>Home</button>
        <button className={styles.selectAll} onClick={handleSelectAll}>Select All</button>
        <button className={styles.clearAll} onClick={handleClearAll}>Clear All</button>
      </div>

      {stats ? (
        <>
        <h2>Employee Statistics</h2>

          <div className={styles.statsBox}>
            <p>Total Employees: {stats.total}</p>
            <p>Average Salary: ${stats.avgSalary}</p>
            <p>Minimum Salary: ${stats.minSalary}</p>
            <p>Maximum Salary: ${stats.maxSalary}</p>
            <p>Oldest Employee: {newestOldest.oldest?.firstName} {newestOldest.oldest?.lastName} ({newestOldest.oldest?.hireDate})</p>
            <p>Newest Employee: {newestOldest.newest?.firstName} {newestOldest.newest?.lastName} ({newestOldest.newest?.hireDate})</p>
          </div>

          <div className={styles.insights}>
            <div>
              <h3>Department Distribution</h3>
              <ul>
                {Object.entries(departmentBreakdown).map(([dept, count]) => (
                  <p key={dept}>{dept}: {count}</p>
                ))}
              </ul>
            </div>
            <div>
              <h3>Salary Range Breakdown</h3>
              <ul>
                {Object.entries(salaryRanges).map(([range, count]) => (
                  <p key={range}>{range}: {count}</p>
                ))}
              </ul>
            </div>
          </div>
        </>
      ) : (
        <p>Please select at least one employee to view statistics.</p>
      )}

      <div className={styles.employeeList}>
        {employees.map(emp => (
          <div key={emp.id} className={styles.employeeCardWrapper}>
            <input
              type="checkbox"
              className={styles.checkbox}
              checked={selectedIds.includes(emp.id)}
              onChange={() => handleCheckboxChange(emp.id)}
            />
            <EmployeeCard employee={emp} readOnly={true} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default StatisticsPage;