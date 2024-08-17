import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './css/index.css';

const api_base = "https://employee-dashboard-crud-mern.vercel.app";

function Update() {
    const { id } = useParams();
    const navigate = useNavigate(); 
    const [updatedEmployeeName, setUpdatedEmployeeName] = useState('');
    const [updatedEmployeeID, setUpdatedEmployeeID] = useState('');
    const [updatedEmployeeEmail, setUpdateEmployeeEmail] = useState('');
    const [updatedEmployeePhone, setUpdateEmployeePhone] = useState('');

    useEffect(() => {
        fetch(api_base + `/details/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setUpdatedEmployeeName(data[0].Employeename);
                setUpdatedEmployeeID(data[0].EmployeeID);
                setUpdateEmployeeEmail(data[0].Email);
                setUpdateEmployeePhone(data[0].Phone);
            });
    }, [id]);

    async function Submit() {
        await fetch(api_base + `/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Employeename: updatedEmployeeName,
                EmployeeID: updatedEmployeeID,
                Email: updatedEmployeeEmail,
                Phone: updatedEmployeePhone,
            }),
        }).then(() => {
            alert("Employee Updated Successfully");
            navigate('/'); 
        });
    }

    return (
        <div className='container'>
            <div className='employee'>
                <div className="employee-form">
                    <div className="employee-align">
                        <div className='text'>
                            <h3><b>Update Employee Details</b></h3>
                        </div>
                        <div className='employee-name'>
                            <input
                                type='text'
                                onChange={(e) => setUpdatedEmployeeName(e.target.value)}
                                value={updatedEmployeeName}
                            />
                        </div>
                        <div className='employee-id'>
                            <input
                                type='text'
                                onChange={(e) => setUpdatedEmployeeID(e.target.value)}
                                value={updatedEmployeeID}
                            />
                        </div>
                        <div className='employee-email'>
                            <input
                                type='text'
                                onChange={(e) => setUpdateEmployeeEmail(e.target.value)}
                                required={true}
                                value={updatedEmployeeEmail}
                            />
                        </div>
                        <div className='employee-phone'>
                            <input
                                type='tel'
                                onChange={(e) => setUpdateEmployeePhone(e.target.value)}
                                required={true}
                                value={updatedEmployeePhone}
                            />
                        </div>
                        <div className='button'>
                            <button id='btn'><Link className="link" to="/">Back</Link></button>
                            <button
                                className='btn-submit'
                                id='btn'
                                onClick={Submit}
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Update;
