import React from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

//import Header from './layouts/Header';
//import Footer from './layouts/Footer';

import Home from './pages/Home';
import Error from './pages/Error';
import Employees from './pages/Employees'
import { useDispatch } from 'react-redux';
import { getEmployee } from './actions/employee.action';


function App() {

    const dispatch = useDispatch();

    dispatch(getEmployee());

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </Router>
    )
}

export default App;
