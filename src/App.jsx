import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';
import employeesData  from './data/mockEmployees'
import EmployeeForm from './components/EmployeeForm/EmployeeForm'
import StatisticsPage from './components/Statistics/StatisticsPage';
import './App.css';
import { useEmployees } from './EmployeeContext'; 

import MainPage from './MainPage';

function App() {
  const navigate = useNavigate();

  const { employees, addEmployee, updateEmployee, deleteEmployee } = useEmployees();

  const [editingEmployee, setEditingEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartments, setSelectedDepartments] = useState([]);

  const handleAddEmployee = (newEmployee) => {
    const id = employees.length > 0 ? Math.max(...employees.map(emp => emp.id)) + 1 : 1;
    addEmployee({ ...newEmployee, id });
    navigate('/');
  };

  const handleEditClick = (employee) => {
    setEditingEmployee(employee);
    navigate(`/edit/${employee.id}`);
  };

  const handleUpdateEmployee = (updatedEmployee) => {
    updateEmployee(updatedEmployee);
    setEditingEmployee(null);
    navigate('/');
  };

  const handleDeleteEmployee = (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this employee?');
    if (confirmed) {
      deleteEmployee(id);
    }
  };

  const handleCancel = () => {
    setEditingEmployee(null);
    navigate('/');
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainPage
            employees={employees}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteEmployee}
            onAddClick={() => navigate('/add')}
            onStatsClick={() => navigate('/statistics')}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedDepartments={selectedDepartments}
            setSelectedDepartments={setSelectedDepartments}
          />
        }
      />
      <Route
        path="/add"
        element={
          <EmployeeForm
            mode="create"
            onSubmit={handleAddEmployee}
            onCancel={handleCancel}
          />
        }
      />
      <Route
        path="/edit/:id"
        element={
          <EmployeeForm
            mode="edit"
            employee={editingEmployee}
            onSubmit={handleUpdateEmployee}
            onCancel={handleCancel}
          />
        }
      />
      <Route
        path="/statistics"
        element={<StatisticsPage employees={employees} />}
      />
    </Routes>
  );
}

export default App;