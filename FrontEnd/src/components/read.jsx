import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import './css/index.css';


const api_base="https://employee-dashboard-crud-mern.vercel.app";
function Read() {
    const[employees,setEmployees]=useState([]);
    
    useEffect(()=>{
        GetEmployee();
    },[]);

    const GetEmployee=()=>{
        fetch(api_base+'/details')
            .then((res)=>res.json())
            .then((data)=>setEmployees(data))
            .catch((error)=>alert(error))
    }
   
  
    const employeeDelete= async id => {
    

      alert("This Process Can't Be Undone ");
     
        const data = await fetch(api_base + '/deleteemployee/' + id, { method: "DELETE" }).then(res => res.json());
  
        setEmployees(employees=> employees.filter(employees => employees._id !== data.result._id));
      }
    
   
   
  const filteredKeys = Object.keys(employees[0] || {}).filter((key) => key !== '_id' && key !== '__v');
  return (
    <div >
        <header className='employee-dashboard'>
                <div className='h1-text'>
                    
                    <h1 id='dashboard-text'>Employee Dashboard</h1>
                    
                </div>
            </header>
        <div className='employee-read'>      
            <div className='employee-db'>
                <h2>Employees List</h2>
                  <div>
                    <button id='btn3'><Link className='link'to='/create'>Add Employee</Link></button>
                  </div>
            </div>
        <div className='employee-display'>
         
          <div  className='employee-table'>
           <br/>
            <table id="customers">
              <thead className='tablehead'>
                <tr>
                  <th>S.No</th>
                  <th>Employee Name</th>
                  <th>Employee ID</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {employees && employees.length > 0 &&
                  employees.map((item,index) => (
                  <tr key={item._id}>
                        <td>{index+1}</td>
                        <td>{item.Employeename}</td>
                        <td>{item.EmployeeID}</td>
                        <td>{item.Email}</td>
                        <td>{item.Phone}</td>
                        <td><button id='btn'><Link className="link" to={`/update/${item._id}`}>Update</Link></button></td>
                        <td><button id='btn2' onClick={() => employeeDelete(item._id)}>Delete</button></td>
                  </tr>
                  ))
                }
              </tbody>
            </table>
            <br/>
            
          </div>
          </div>
        </div>
      </div>
  );
}

export default Read;
