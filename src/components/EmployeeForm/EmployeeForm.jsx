import { useState, useEffect } from "react";
import styles from "./EmployeeForm.module.css";

function validate(form) {
  const errors = {};
  if (!form.firstName.trim()) errors.firstName = "First name is required.";
  if (!form.lastName.trim()) errors.lastName = "Last name is required.";
  if (!/\S+@\S+\.\S+/.test(form.email)) errors.email = "Invalid email.";
  if (!form.department.trim()) errors.department = "Department is required.";
  return errors;
}

function EmployeeForm({ mode = "create", employee, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    position: "",
    salary: "",
    hireDate: "",
    status: "Active",
    performanceRating: "3",
    profilePicture: "",
    managerId: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (mode === "edit" && employee) {
      setFormData(employee);
    }
  }, [mode, employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      onSubmit(formData);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>{mode === "edit" ? "Edit Employee" : "Add New Employee"}</h2>

      <input
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="First Name"
      />
      {errors.firstName && <span className={styles.error}>{errors.firstName}</span>}

      <input
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="Last Name"
      />
      {errors.lastName && <span className={styles.error}>{errors.lastName}</span>}

      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      {errors.email && <span className={styles.error}>{errors.email}</span>}

      <input
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone"
      />

      <input
        name="department"
        value={formData.department}
        onChange={handleChange}
        placeholder="Department"
      />
      {errors.department && <span className={styles.error}>{errors.department}</span>}

      <input
        name="position"
        value={formData.position}
        onChange={handleChange}
        placeholder="Position"
      />

      <input
        name="salary"
        type="number"
        value={formData.salary}
        onChange={handleChange}
        placeholder="Salary"
      />

      <input
        name="hireDate"
        type="date"
        value={formData.hireDate}
        onChange={handleChange}
      />

      <input
        name="profilePicture"
        value={formData.profilePicture}
        onChange={handleChange}
        placeholder="Profile Picture URL"
      />

      <div>
        <button className={styles.addButton} type="submit">
          {mode === "edit" ? "Update" : "Add"} Employee
        </button>
        <button className={styles.cancelButton} type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default EmployeeForm;