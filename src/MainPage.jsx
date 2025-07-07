import React, { useState, useEffect, useMemo } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import DepartmentFilter from './components/DepartmentFilter/DepartmentFilter';
import EmployeeList from './components/EmployeeList/EmployeeList';
import { useEmployees } from './EmployeeContext';
import './App.css';

function getDepartmentsWithCounts(employees) {
  return Array.from(
    employees.reduce((map, emp) => {
      map.set(emp.department, (map.get(emp.department) || 0) + 1);
      return map;
    }, new Map())
  ).map(([name, count]) => ({ name, count }));
}

function MainPage({ onEditClick, onAddClick, onStatsClick }) {
  const { employees, deleteEmployee } = useEmployees();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 10;

  const [sortKey, setSortKey] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');

  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      const search = searchTerm.toLowerCase();
      const matchesSearch =
        emp.firstName.toLowerCase().includes(search) ||
        emp.lastName.toLowerCase().includes(search) ||
        emp.email.toLowerCase().includes(search);

      const matchesDepartment =
        selectedDepartments.length === 0 || selectedDepartments.includes(emp.department);

      return matchesSearch && matchesDepartment;
    });
  }, [employees, searchTerm, selectedDepartments]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedDepartments]);

  const sortedEmployees = useMemo(() => {
    const sorted = [...filteredEmployees].sort((a, b) => {
      if (!sortKey) return 0;

      const aVal = a[sortKey];
      const bVal = b[sortKey];

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        const result = aVal.localeCompare(bVal);
        return sortOrder === 'asc' ? result : -result;
      }

      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [filteredEmployees, sortKey, sortOrder]);

  const totalPages = Math.ceil(sortedEmployees.length / employeesPerPage);
  const startIndex = (currentPage - 1) * employeesPerPage;
  const paginatedEmployees = sortedEmployees.slice(startIndex, startIndex + employeesPerPage);

  const goToPage = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const handleDeleteClick = (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this employee?');
    if (confirmed) {
      deleteEmployee(id);
    }
  };

  return (
    <div>
      <h1>Employee Data Management</h1>
      <SearchBar value={searchTerm} onChange={setSearchTerm} />
      <DepartmentFilter
        departments={getDepartmentsWithCounts(filteredEmployees)}
        selected={selectedDepartments}
        onChange={setSelectedDepartments}
      />

      <button className="addButton" onClick={onAddClick}>Add Employee</button>
      <button className="statisticsButton" onClick={onStatsClick}>Employee Statistics</button>

      <EmployeeList
        employees={paginatedEmployees}
        onEditClick={onEditClick}
        onDeleteClick={handleDeleteClick}
        onSort={handleSort}
        sortKey={sortKey}
        sortOrder={sortOrder}
      />

      <div className="paginationButton">
        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
          &lt; Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
          Next &gt;
        </button>
      </div>
    </div>
  );
}

export default MainPage;