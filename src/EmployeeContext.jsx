import { createContext, useReducer, useContext } from "react";
import employeesData from './data/mockEmployees';


const initialState = {
  employees: employeesData,
};


const ACTIONS = {
  ADD: "ADD_EMPLOYEE",
  UPDATE: "UPDATE_EMPLOYEE",
  DELETE: "DELETE_EMPLOYEE",
};

function employeeReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD:
      return { ...state, employees: [...state.employees, action.payload] };

    case ACTIONS.UPDATE:
      return {
        ...state,
        employees: state.employees.map(emp =>
          emp.id === action.payload.id ? action.payload : emp
        ),
      };

    case ACTIONS.DELETE:
      return {
        ...state,
        employees: state.employees.filter(emp => emp.id !== action.payload),
      };

    default:
      return state;
  }
}

const EmployeeContext = createContext();


export function EmployeeProvider({ children }) {
  const [state, dispatch] = useReducer(employeeReducer, initialState);

  const addEmployee = employee => dispatch({ type: ACTIONS.ADD, payload: employee });
  const updateEmployee = employee => dispatch({ type: ACTIONS.UPDATE, payload: employee });
  const deleteEmployee = employeeId => dispatch({ type: ACTIONS.DELETE, payload: employeeId });

  return (
    <EmployeeContext.Provider
      value={{
        employees: state.employees,
        addEmployee,
        updateEmployee,
        deleteEmployee,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
}


export function useEmployees() {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error("useEmployees must be used within an EmployeeProvider");
  }
  return context;
}