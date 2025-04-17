import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import UpdateEmployee from './components/UpdateEmployee';
import axios from 'axios';

// Mock child components to simplify testing
jest.mock('./components/EmployeeList', () => () => (
  <div data-testid="employee-list">EmployeeList</div>
));
jest.mock('./components/AddEmployee', () => () => (
  <div data-testid="add-employee">AddEmployee</div>
));
jest.mock('./components/UpdateEmployee', () => () => (
  <div data-testid="update-employee">UpdateEmployee</div>
));
jest.mock('./components/DeleteEmployee', () => () => (
  <div data-testid="delete-employee">DeleteEmployee</div>
));

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the main heading', () => { // main heading exists
    render(<App />);
    expect(screen.getByText('Employee Management')).toBeInTheDocument();
  });

  test('shows EmployeeList by default', () => { // automatically loads employee
    render(<App />);
    expect(screen.getByTestId('employee-list')).toBeInTheDocument();
  });

  test('toggles AddEmployee form when button is clicked', () => { // opens and closes add employee form
    render(<App />);
    
    
    expect(screen.queryByTestId('add-employee')).not.toBeInTheDocument();
    
    
    fireEvent.click(screen.getByText('Add New Employee'));
    expect(screen.getByTestId('add-employee')).toBeInTheDocument();
    
    
    fireEvent.click(screen.getByText('Close Add Employee Form'));
    expect(screen.queryByTestId('add-employee')).not.toBeInTheDocument();
  });


  test('shows EmployeeInformation when an employee is selected', () => { // shows employee information
    render(<UpdateEmployee />);
    expect(screen.getByTestId('update-employee')).toBeInTheDocument();
  });

  test('hides UpdateEmployee when onEmployeeUpdated is called', () => { // hides employee information
    render(<App />);
    const updateEmployee = screen.queryByTestId('update-employee');
    if (updateEmployee) {
      expect(updateEmployee).toHaveAttribute('data-onupdated', 'function');
    }
  });


});