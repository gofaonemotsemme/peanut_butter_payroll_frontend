import React, { useState } from 'react';
import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/AddEmployee';
import UpdateEmployee from './components/UpdateEmployee';
import DeleteEmployee from './components/DeleteEmployee';
import './App.css';

function App() {
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleEmployeeSelect = (employee) => {
        setSelectedEmployee(employee);
    };

    const handleAddEmployee = () => {
        setShowAddForm(false);
        setRefreshTrigger(prev => prev + 1); // this triggers EmployeeList to refresh
    };

    
    // callback refreshes employee list after deletion
    const handleEmployeeDeleted = () => {
        setRefreshTrigger(prev => prev + 1);
    };


    return (
        <div className="App">
            <h1>Employee Management</h1>

            <button onClick={() => setShowAddForm(!showAddForm)}>
                {showAddForm ? 'Close Add Employee Form' : 'Add New Employee'}
            </button>

            <EmployeeList
                onEmployeeSelect={handleEmployeeSelect}
                refreshList={refreshTrigger}
            />

            {selectedEmployee && ( // wrapped to show employee information when selected
                <UpdateEmployee
                    employee={selectedEmployee}
                    onEmployeeUpdated={() => {
                        setSelectedEmployee(null);
                        setRefreshTrigger(prev => prev + 1);
                    }}
                />
            )}

            {showAddForm && <AddEmployee onEmployeeAdded={handleAddEmployee} />}

            <DeleteEmployee onEmployeeDeleted={handleEmployeeDeleted} />
        </div>
    );
}

export default App;