import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/employeeData';

function DeleteEmployee({ onEmployeeDeleted }) {
    const [deleteEmployeeId, setDeleteEmployeeId] = useState('');
    const [status, setStatus] = useState(null);

    const handleDelete = () => { // calls the id from the database to delete the employee
        setStatus(null);
        if (!deleteEmployeeId) {
            setStatus({ type: 'error', message: 'Please enter the Employee ID to delete.' });
            return;
        }
        axios.delete(`${API_URL}/${deleteEmployeeId}`)
            .then(response => {
                setStatus({ type: 'success', message: 'Employee deleted successfully.' });
                setDeleteEmployeeId('');
                if (onEmployeeDeleted) {
                    onEmployeeDeleted();
                }
            })
            .catch(error => {
                console.error('Error deleting employee:', error);
                setStatus({ type: 'error', message: error.response?.data?.error || 'Failed to delete employee.' });
            });
    };

    return (
        <div>
            <h2>Delete Employee</h2>
            <input
                type="text"
                placeholder="Employee ID to Delete"
                value={deleteEmployeeId}
                onChange={e => setDeleteEmployeeId(e.target.value)}
            />
            <button onClick={handleDelete}>Delete Employee</button>
            {status && <p className={status.type === 'success' ? 'success' : 'error'}>{status.message}</p>}
        </div>
    );
}

export default DeleteEmployee;