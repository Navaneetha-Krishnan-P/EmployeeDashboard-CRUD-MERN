import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './css/index.css';
import logo from './assets/logo.png';

const api_base = "https://employee-dashboard-crud-mern.vercel.app";

function Create() {
  const [employeeName, setEmployeename] = useState('');
  const [employeeID, setEmployeeID] = useState('');
  const [employeeEmail, setEmployeeEmail] = useState('');
  const [employeePhone, setEmployeePhone] = useState('');
  const [errors, setErrors] = useState({});

  const validateInputs = () => {
    const error = {};
    if (employeeName.trim() === '') {
      alert("Enter Employee Name");
      error.employeeName = 'Enter Employee Name';
    }
    if (employeeID.length > 6) {
      alert("Id Should not be greater than 6");
      setEmployeeID('');
      error.employeeID = 'Id error';
    }
    if (employeeEmail.trim() === '') {
      alert("Missing Email Field");
      error.employeeEmail = 'Missing Email Field';
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(employeeEmail)) {
      alert("Wrong Email ID");
      setEmployeeEmail('');
      error.employeeEmail = 'Invalid email address';
    }
    if (employeePhone.length !== 10) {
      alert("Phone Number Should be exactly 10 Numbers");
      setEmployeePhone('');
      error.employeePhone = 'Invalid Phone Number';
    }
    setErrors(error);
    return Object.keys(error).length === 0;
  }

  async function Submit() {
    try {
      if (validateInputs()) {
        await axios.post(api_base + '/employee', {
          EmployeeName: employeeName,
          EmployeeID: employeeID,
          EmployeeEmail: employeeEmail,
          EmployeePhone: employeePhone,
          Error: errors
        }).then((res) => {
          if (res.status === 201) {
            alert("Employee Data Saved Successfully");
            setEmployeename('');
            setEmployeeID('');
            setEmployeeEmail('');
            setEmployeePhone('');
          }
        });
      } else {
        setErrors({});
      }
    } catch (error) {
      alert("Employee Data Is Invalid");
    }
  }

  return (
    <div class="container">
    <div className='employee'>

      <div className='employee-form'>
        <div className='textnew'>
          <h2>Add New Employee</h2>
        </div>
        <div className="employee-align">
          <input
            type='text'
            onChange={(e) => setEmployeename(e.target.value)}
            placeholder='Employee Name'
            required
            value={employeeName}
          />
          <input
            type='text'
            onChange={(e) => setEmployeeID(e.target.value)}
            placeholder='Employee ID'
            required
            value={employeeID}
          />
          <input
            type='text'
            onChange={(e) => setEmployeeEmail(e.target.value)}
            placeholder='Employee Email'
            required
            value={employeeEmail}
          />
          <input
            type='tel'
            onChange={(e) => setEmployeePhone(e.target.value)}
            placeholder='Employee Phone'
            required
            value={employeePhone}
          />
        </div>

        <div className='button'>
          <button id='btn'>
            <Link className="link" to="/">Back</Link>
          </button>
          <button className='btn-submit' id='btn' onClick={Submit}>Submit</button>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Create;

