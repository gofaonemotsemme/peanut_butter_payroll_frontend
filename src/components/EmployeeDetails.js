import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/employeeData'; 

function EmployeeDetails() {
    const [employeeId, setEmployeeId] = useState('');
    const [employee, setEmployee] = useState(null);
    const [error, setError] = useState(null);

    const fetchEmployee = () => {
        if (!employeeId) {
            setError('Please enter an Employee ID.');
            setEmployee(null);
            return;
        }
        setError(null);
        axios.get(`${API_URL}/${employeeID}`)
            .then(response => {
                setEmployee(response.data);
            })
            .catch(error => {
                console.error('Error fetching employee:', error);
                if (error.response && error.response.status === 404) {
                    setError('Employee not found.');
                } else {
                    setError('Failed to load employee details.');
                }
                setEmployee(null);
            });
    };

    return (
        <div>
            <h2>Employee Details</h2>
            <input
                type="text"
                placeholder="Enter Employee ID"
                value={employeeId}
                onChange={e => setEmployeeId(e.target.value)}
            />
            <button onClick={fetchEmployee}>Get Details</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {employee && (
                <div>
                    <p><strong>Employee ID:</strong> {employee.employeeId}</p>
                    <p><strong>First Name:</strong> {employee.firstName}</p>
                    <p><strong>Last Name:</strong> {employee.lastName}</p>
                    <p><strong>Full Name:</strong> {`${employee.firstName} ${employee.lastName}`.trim()}</p>
                    <p><strong>Salutation:</strong> {employee.salutation}</p>
                    <p><strong>Gender:</strong> {employee.gender}</p>
                    <p><strong>Gross Salary:</strong> {employee.grossSalary}</p>
                    <p><strong>Profile Colour:</strong> {employee.profileColour}</p>
                </div>
            )}
        </div>
    );
}

export default EmployeeDetails;