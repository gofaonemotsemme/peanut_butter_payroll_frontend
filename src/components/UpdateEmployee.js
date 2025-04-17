import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/employeeData';

function UpdateEmployee({ employee, onEmployeeUpdated }) {
    const [updateData, setUpdateData] = useState({
        employeeID: '',
        firstName: '',
        lastName: '',
        fullName: '',
        salutation: 'Mr.',
        gender: '',
        grossSalary: '',
        profileColour: 'Default',
    });
    const [status, setStatus] = useState(null);

    useEffect(() => {
        if (employee) {
            setUpdateData({
                employeeID: employee.employeeID,
                firstName: employee.firstName,
                lastName: employee.lastName,
                fullName: `${employee.firstName} ${employee.lastName}`.trim(),
                salutation: employee.title || 'Mr.', 
                gender: employee.gender,
                grossSalary: employee.grossSalary,
                profileColour: employee.profileColour || 'Default'
            });
        }
    }, [employee]);

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        setUpdateData(prevData => ({
            ...prevData,
            [name]: type === 'radio' ? value : value,
        }));
    };

    const handleProfileColorChange = (e) => {
        setUpdateData(prevData => ({
            ...prevData,
            profileColour: e.target.value,
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setStatus(null);

        if (!updateData.employeeID) {
            setStatus({ type: 'error', message: 'Employee # is required for update.' });
            return;
        }

        try {
            const payload = {
                employeeID: updateData.employeeID,
                firstName: updateData.firstName,
                lastName: updateData.lastName,
                salutation: updateData.salutation, 
                gender: updateData.gender,
                grossSalary: parseFloat(updateData.grossSalary),
                profileColour: updateData.profileColour,
                fullName: `${updateData.firstName} ${updateData.lastName}`.trim()
            };

            const response = await axios.put(`${API_URL}/${updateData.employeeID}`, payload);

            setStatus({ type: 'success', message: 'Employee updated successfully.' });
            if (onEmployeeUpdated) {
                onEmployeeUpdated();
            }
        } catch (error) {
            console.error('Update error:', error);
            setStatus({
                type: 'error',
                message: error.response?.data?.error || 'Failed to update employee.'
            });
        }
    };

    const handleCancel = () => {
        if (onEmployeeUpdated) {
            onEmployeeUpdated();
        }
    };

    const fullName = `${updateData.firstName} ${updateData.lastName}`.trim();

    return (
        <div>
            <h2>Employee Information</h2>
            {employee ? (
                <form onSubmit={handleUpdate} style={{ display: 'grid', gridTemplateColumns: 'auto auto', gap: '10px', maxWidth: '600px' }}>
                    {/* Left Column */}
                    <div>
                        <label htmlFor="firstName">First Name(s)*</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={updateData.firstName}
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
                            value={updateData.lastName}
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
                            value={updateData.salutation}
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
                                checked={updateData.gender === 'Male'}
                                onChange={handleInputChange}
                                required
                            />
                            <label htmlFor="male" style={{ marginRight: '10px' }}>Male</label>
                            <input
                                type="radio"
                                id="female"
                                name="gender"
                                value="Female"
                                checked={updateData.gender === 'Female'}
                                onChange={handleInputChange}
                                required
                            />
                            <label htmlFor="female" style={{ marginRight: '10px' }}>Female</label>
                            <input
                                type="radio"
                                id="unspecified"
                                name="gender"
                                value="Unspecified"
                                checked={updateData.gender === 'Unspecified'}
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
                            value={updateData.employeeID}
                            readOnly
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
                            value={updateData.grossSalary}
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
                                checked={updateData.profileColour === 'Green'}
                                onChange={handleProfileColorChange}
                            />
                            <label htmlFor="green" style={{ marginRight: '10px' }}>Green</label>
                            <input
                                type="radio"
                                id="blue"
                                name="profileColour"
                                value="Blue"
                                checked={updateData.profileColour === 'Blue'}
                                onChange={handleProfileColorChange}
                            />
                            <label htmlFor="blue" style={{ marginRight: '10px' }}>Blue</label>
                            <input
                                type="radio"
                                id="red"
                                name="profileColour"
                                value="Red"
                                checked={updateData.profileColour === 'Red'}
                                onChange={handleProfileColorChange}
                            />
                            <label htmlFor="red" style={{ marginRight: '10px' }}>Red</label>
                            <input
                                type="radio"
                                id="default"
                                name="profileColour"
                                value="Default"
                                checked={updateData.profileColour === 'Default'}
                                onChange={handleProfileColorChange}
                            />
                            <label htmlFor="default">Default</label>
                        </div>
                        <small>Default is always selected at start of new record</small>
                    </div>

                    {/* Buttons */}
                    <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                        <button type="button" onClick={handleCancel} style={{ padding: '10px 15px', marginRight: '10px' }}>
                            Cancel
                        </button>
                        <button
                            type="submit"
                            style={{
                                padding: '10px 15px',
                                backgroundColor: updateData.profileColour === 'Green' ? 'green' :
                                             updateData.profileColour === 'Blue' ? 'blue' :
                                             updateData.profileColour === 'Red' ? 'red' : '#007bff',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                            }}
                        >
                            Save
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
            ) : (
                <p>Select an employee to edit.</p>
            )}
        </div>
    );
}

export default UpdateEmployee;