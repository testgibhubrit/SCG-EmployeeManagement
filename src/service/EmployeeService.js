import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8082/api/employees";

// Fetch list of all employees
export const listEmployees = () => axios.get(`${REST_API_BASE_URL}/getall`);

// Create a new employee
export const createEmployee = (employee) => axios.post(`${REST_API_BASE_URL}/add`, employee);

// Fetch an employee by ID
export const getEmployee = (employeeId) => axios.get(`${REST_API_BASE_URL}/getbyid/${employeeId}`);

//update employee
export const updateEmployee = (employeeId, employeeData) => 
    axios.put(`${REST_API_BASE_URL}/update/${employeeId}`, employeeData);

//delete employee

export const deleteEmployee = (employeeId) => 
    axios.delete(`${REST_API_BASE_URL}/delete/${employeeId}`);
  