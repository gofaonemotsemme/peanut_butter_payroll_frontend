import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/employeeData';

function AddEmployee({ onEmployeeAdded }) {
    const [newEmployee, setNewEmployee] = useState({
        employeeID: '',
        firstName: '',
        lastName: '',
        fullName:'',
        salutation: 'Mr.',
        gender: 'Male',
        grossSalary: '',
        profileColour: 'Default',
    });
    const [status, setStatus] = useState(null);

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        setNewEmployee(prevData => ({
            ...prevData,
            [name]: type === 'radio' ? value : value,
        }));
    };

    const handleProfileColorChange = (e) => {
        setNewEmployee(prevData => ({
            ...prevData,
            profileColour: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus(null);

        if (!newEmployee.employeeID.trim()) {
            setStatus({ type: 'error', message: 'Employee # is required.' });
            return;
        }

        try {
            const payload = {
                employeeID: newEmployee.employeeID,
                firstName: newEmployee.firstName,
                lastName: newEmployee.lastName,
                salutation: newEmployee.salutation, 
                gender: newEmployee.gender,
                grossSalary: parseFloat(newEmployee.grossSalary),
                profileColour: newEmployee.profileColour,
                fullName: `${newEmployee.firstName} ${newEmployee.lastName}`.trim()
            };

            const response = await axios.post(API_URL, payload);

            setStatus({ type: 'success', message: `Employee successfully added!!` });
            setNewEmployee({
                employeeID: '',
                firstName: '',
                lastName: '',
                fullName: '',
                salutation: 'Mr.',
                gender: 'Male',
                grossSalary: '',
                profileColour: 'Default',
            });

            if (onEmployeeAdded) {
                onEmployeeAdded();
            }
        } catch (error) {
            console.error('Create error:', error);
            setStatus({
                type: 'error',
                message: error.response?.data?.error || 'Failed to create employee.'
            });
        }
    };

    const fullName = `${newEmployee.firstName} ${newEmployee.lastName}`.trim();

    return (
        <div>
            <h2>Add New Employee</h2>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'auto auto', gap: '10px', maxWidth: '600px' }}>
                {/* Left Column */}
                <div>
                    <label htmlFor="firstName">First Name(s) *</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={newEmployee.firstName}
                        onChange={handleInputChange}
                        required
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name *</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={newEmployee.lastName}
                        onChange={handleInputChange}
                        required
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                </div>
                <div>
                    <label htmlFor="salutation">Salutation *</label>
                    <select
                        id="salutation"
                        name="salutation"
                        value={newEmployee.salutation}
                        onChange={handleInputChange}
                        required
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    >
                        <option value="Mr.">Mr.</option>
                        <option value="Ms.">Ms.</option>
                        <option value="Mrs.">Mrs.</option>
                        <option value="Mx.">Mx.</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="gender">Gender *</label>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <input
                            type="radio"
                            id="male"
                            name="gender"
                            value="Male"
                            checked={newEmployee.gender === 'Male'}
                            onChange={handleInputChange}
                            required
                        />
                        <label htmlFor="male" style={{ marginRight: '10px' }}>Male</label>
                        <input
                            type="radio"
                            id="female"
                            name="gender"
                            value="Female"
                            checked={newEmployee.gender === 'Female'}
                            onChange={handleInputChange}
                            required
                        />
                        <label htmlFor="female" style={{ marginRight: '10px' }}>Female</label>
                        <input
                            type="radio"
                            id="unspecified"
                            name="gender"
                            value="Unspecified"
                            checked={newEmployee.gender === 'Unspecified'}
                            onChange={handleInputChange}
                            required
                        />
                        <label htmlFor="unspecified">Unspecified</label>
                    </div>
                </div>
                <div>
                    <label htmlFor="employeeID">Employee # *</label>
                    <input
                        type="text"
                        id="employeeID"
                        name="employeeID"
                        value={newEmployee.employeeID}
                        onChange={handleInputChange}
                        required
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                    <small>Numeric Only</small>
                </div>

                {/* Right Column */}
                <div>
                    <label>Full Name</label>
                    <input
                        type="text"
                        value={fullName}
                        readOnly
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box', backgroundColor: '#eee', color: '#555' }}
                    />
                </div>
                <div>
                    <label htmlFor="grossSalary">Gross Salary $PY</label>
                    <input
                        type="number"
                        id="grossSalary"
                        name="grossSalary"
                        value={newEmployee.grossSalary}
                        onChange={handleInputChange}
                        step="0.01"
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                </div>
                <div>
                    <label>Employee Profile Colour</label>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <input
                            type="radio"
                            id="green"
                            name="profileColour"
                            value="Green"
                            checked={newEmployee.profileColour === 'Green'}
                            onChange={handleProfileColorChange}
                        />
                        <label htmlFor="green" style={{ marginRight: '10px' }}>Green</label>
                        <input
                            type="radio"
                            id="blue"
                            name="profileColour"
                            value="Blue"
                            checked={newEmployee.profileColour === 'Blue'}
                            onChange={handleProfileColorChange}
                        />
                        <label htmlFor="blue" style={{ marginRight: '10px' }}>Blue</label>
                        <input
                            type="radio"
                            id="red"
                            name="profileColour"
                            value="Red"
                            checked={newEmployee.profileColour === 'Red'}
                            onChange={handleProfileColorChange}
                        />
                        <label htmlFor="red" style={{ marginRight: '10px' }}>Red</label>
                        <input
                            type="radio"
                            id="default"
                            name="profileColour"
                            value="Default"
                            checked={newEmployee.profileColour === 'Default'}
                            onChange={handleProfileColorChange}
                        />
                        <label htmlFor="default">Default</label>
                    </div>
                    <small>Default is always selected at start of new record</small>
                </div>

                {/* Buttons */}
                <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                    <button
                        type="submit"
                        style={{
                            padding: '10px 15px',
                            backgroundColor: newEmployee.profileColour === 'Green' ? 'green' :
                                         newEmployee.profileColour === 'Blue' ? 'blue' :
                                         newEmployee.profileColour === 'Red' ? 'red' : '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        Add Employee
                    </button>
                </div>
                {status && (
                    <div style={{
                        gridColumn: '1 / -1',
                        marginTop: '10px',
                        color: status.type === 'success' ? 'green' : 'red',
                        padding: '10px',
                        border: status.type === 'success' ? '1px solid green' : '1px solid red',
                        borderRadius: '5px'
                    }}>
                        {status.message}
                    </div>
                )}
            </form>
        </div>
    );
}

export default AddEmployee;