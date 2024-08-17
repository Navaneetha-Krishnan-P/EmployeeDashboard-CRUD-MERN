import React from 'react';
import Read from './components/read';
import Create from './components/create';
import Update from './components/update';

import {BrowserRouter as Router, Routes,Route } from 'react-router-dom';

const api_base="https://employee-dashboard-crud-mern.vercel.app";
function App() {
  

  return (
    <div className='App'>
    <Router>
      <Routes>
        <Route path='/' element={<Read/>}/>
        <Route path='/create' element={<Create/>}/>
        <Route path='/update/:id' element={<Update/>}/>
      </Routes> 
    </Router>        
        
    </div>
  );
}

export default App;
