import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/employeeData';

function EmployeeList({ onEmployeeSelect, refreshList }) {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchEmployees = async () => {
        setLoading(true);
        try {
            const response = await axios.get(API_URL);
            const employeesWithSalutation = response.data.map(employee => ({
                ...employee,
                salutation: employee.gender === 'Male' ? 'Mr.' :
                            employee.gender === 'Unspecified' ? 'Unknown' :
                          employee.gender === 'Female' ? 'Ms.' : 'Mx.',
                          
            }));
            setEmployees(employeesWithSalutation);
            setError(null);
        } catch (error) {
            console.error('Error fetching employees:', error);
            setError('Failed to load employees.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, [refreshList]);

    const handleRowClick = (employee) => {
        onEmployeeSelect(employee);
    };

    if (loading && employees.length === 0) {
        return <p>Loading employees...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    return (
        <div>
            <h2>Employee List</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                    <tr style={{ background: '#ddd' }}>
                        <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>Employee #</th>
                        <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>First Name</th>
                        <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>Last Name</th>
                        <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>Salutation</th>
                        <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>Profile Colour</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                        <tr
                            key={employee.employeeID}
                            style={{
                                background: employees.indexOf(employee) % 2 === 0 ? '#f9f9f9' : 'white',
                                backgroundColor: employee.profileColour.toLowerCase(),
                                cursor: 'pointer'
                            }}
                            onClick={() => handleRowClick(employee)}
                        >
                            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{employee.employeeID}</td>
                            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{employee.firstName}</td>
                            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{employee.lastName}</td>
                            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{employee.salutation}</td>
                            <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                                <div style={{
                                    padding: '5px',
                                    borderRadius: '3px',
                                    textAlign: 'center'
                                }}>
                                    {employee.profileColour}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeList;